"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { format } from "date-fns";
import { toast } from "sonner";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Switch } from "@/components/ui/switch";
import { Pencil, Trash2, ChevronLeft, ChevronRight } from "lucide-react";
import { SortDropdown } from "@/components/sort-dropdown";

type Preorder = {
  id: string;
  name: string;
  products: number;
  preorderWhen: string;
  startsAt: string;
  endsAt: string | null;
  status: boolean;
  createdAt: string;
};

type PaginationInfo = {
  page: number;
  pageSize: number;
  total: number;
  totalPages: number;
  showingFrom: number;
  showingTo: number;
};

async function fetchPreordersFromAPI(
  filter: string,
  sortBy: string,
  sortOrder: string,
  page: number,
) {
  const params = new URLSearchParams({
    filter,
    sortBy,
    sortOrder,
    page: page.toString(),
    pageSize: "10",
  });
  const res = await fetch(`/api/preorders?${params}`);
  if (!res.ok) throw new Error("Failed to fetch");
  return res.json();
}

export default function PreordersPage() {
  const router = useRouter();
  const [preorders, setPreorders] = useState<Preorder[]>([]);
  const [pagination, setPagination] = useState<PaginationInfo | null>(null);
  const [filter, setFilter] = useState<"all" | "active" | "inactive">("all");
  const [sortBy, setSortBy] = useState("createdAt");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("desc");
  const [page, setPage] = useState(1);
  const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set());
  const [loading, setLoading] = useState(true);
  const [initialized, setInitialized] = useState(false);

  // Fetch data on state changes using key pattern
  const [dataKey, setDataKey] = useState(0);

  const refresh = () => setDataKey((k) => k + 1);

  // Use Suspense-compatible data fetching
  if (!initialized) {
    setInitialized(true);
    fetchPreordersFromAPI(filter, sortBy, sortOrder, page)
      .then((data) => {
        setPreorders(data.preorders);
        setPagination(data.pagination);
        setLoading(false);
      })
      .catch(() => {
        toast.error("Failed to load preorders");
        setLoading(false);
      });
  }

  // Re-fetch when params change
  if (initialized && dataKey > 0) {
    setDataKey(0);
    setLoading(true);
    fetchPreordersFromAPI(filter, sortBy, sortOrder, page)
      .then((data) => {
        setPreorders(data.preorders);
        setPagination(data.pagination);
        setLoading(false);
      })
      .catch(() => {
        toast.error("Failed to load preorders");
        setLoading(false);
      });
  }

  const applyFilter = (f: typeof filter) => {
    setFilter(f);
    setPage(1);
    refresh();
  };

  const applySort = (by: string, order: "asc" | "desc") => {
    setSortBy(by);
    setSortOrder(order);
    setPage(1);
    refresh();
  };

  const goToPage = (p: number) => {
    setPage(p);
    refresh();
  };

  const toggleStatus = async (id: string, status: boolean) => {
    const res = await fetch(`/api/preorders/${id}/status`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status }),
    });
    if (res.ok) {
      setPreorders((prev) =>
        prev.map((p) => (p.id === id ? { ...p, status } : p)),
      );
      toast.success(`Preorder ${status ? "activated" : "deactivated"}`);
    } else {
      toast.error("Failed to update status");
    }
  };

  const deletePreorder = async (id: string) => {
    const res = await fetch(`/api/preorders/${id}`, { method: "DELETE" });
    if (res.ok) {
      setPreorders((prev) => prev.filter((p) => p.id !== id));
      toast.success("Preorder deleted");
    } else {
      toast.error("Failed to delete");
    }
  };

  const toggleSelectAll = () => {
    setSelectedIds(
      selectedIds.size === preorders.length
        ? new Set()
        : new Set(preorders.map((p) => p.id)),
    );
  };

  const toggleSelectRow = (id: string) => {
    setSelectedIds((prev) => {
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });
  };

  const fmt = (d: string | null) =>
    d ? format(new Date(d), "MMM dd, yyyy hh:mm a") : "";

  return (
    <div className="min-h-screen bg-[#F4F4F4] p-6 flex justify-center">
      <div className="w-full max-w-[1100px]">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-[22px] font-bold text-gray-900 tracking-tight">
            Preorders
          </h1>
          <Button
            onClick={() => router.push("/preorders/new")}
            className="bg-gray-900 hover:bg-gray-800 text-white rounded-lg px-4 py-2 h-9 text-sm font-medium"
          >
            Create Preorder
          </Button>
        </div>

        <div className="bg-white rounded-lg shadow-sm border border-gray-100">
          <div className="flex items-center justify-between px-6 py-3 border-b border-gray-100">
            <div className="flex items-center gap-1">
              {(["all", "active", "inactive"] as const).map((f) => (
                <button
                  key={f}
                  onClick={() => applyFilter(f)}
                  className={`px-3.5 py-1.5 rounded-md text-sm font-semibold transition-colors ${
                    filter === f
                      ? "bg-gray-100 text-gray-900"
                      : "text-gray-500 hover:text-gray-700"
                  }`}
                >
                  {f === "all" ? "All" : f === "active" ? "Active" : "Inactive"}
                </button>
              ))}
            </div>
            <SortDropdown
              sortBy={sortBy}
              sortOrder={sortOrder}
              onSortByChange={(v) => applySort(v, sortOrder)}
              onSortOrderChange={(v) => applySort(sortBy, v)}
            />
          </div>

          <Table>
            <TableHeader>
              <TableRow className="hover:bg-transparent border-b border-gray-100">
                <TableHead className="w-10 pl-6">
                  <Checkbox
                    checked={
                      preorders.length > 0 &&
                      selectedIds.size === preorders.length
                    }
                    onCheckedChange={toggleSelectAll}
                    className="rounded-sm border-gray-300"
                  />
                </TableHead>
                <TableHead className="text-xs font-bold text-gray-500 uppercase tracking-wider py-3 w-[180px]">
                  Name
                </TableHead>
                <TableHead className="text-xs font-bold text-gray-500 uppercase tracking-wider py-3 w-[80px]">
                  Products
                </TableHead>
                <TableHead className="text-xs font-bold text-gray-500 uppercase tracking-wider py-3 w-[160px]">
                  Preorder when
                </TableHead>
                <TableHead className="text-xs font-bold text-gray-500 uppercase tracking-wider py-3 w-[180px]">
                  Starts at
                </TableHead>
                <TableHead className="text-xs font-bold text-gray-500 uppercase tracking-wider py-3 w-[180px]">
                  Ends at
                </TableHead>
                <TableHead className="text-xs font-bold text-gray-500 uppercase tracking-wider py-3 w-[120px]">
                  Status
                </TableHead>
                <TableHead className="text-xs font-bold text-gray-500 uppercase tracking-wider py-3 pr-6 w-[80px]">
                  Actions
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {loading ? (
                <TableRow>
                  <TableCell
                    colSpan={8}
                    className="text-center py-12 text-gray-400"
                  >
                    Loading...
                  </TableCell>
                </TableRow>
              ) : preorders.length === 0 ? (
                <TableRow>
                  <TableCell
                    colSpan={8}
                    className="text-center py-12 text-gray-400"
                  >
                    No preorders found
                  </TableCell>
                </TableRow>
              ) : (
                preorders.map((p) => (
                  <TableRow
                    key={p.id}
                    className="border-b border-gray-50 hover:bg-gray-50/50"
                  >
                    <TableCell className="pl-6">
                      <Checkbox
                        checked={selectedIds.has(p.id)}
                        onCheckedChange={() => toggleSelectRow(p.id)}
                        className="rounded-sm border-gray-300"
                      />
                    </TableCell>
                    <TableCell className="font-medium text-gray-900 text-sm py-3.5">
                      {p.name}
                    </TableCell>
                    <TableCell className="text-gray-600 text-sm py-3.5">
                      {p.products}
                    </TableCell>
                    <TableCell className="text-gray-600 text-sm py-3.5">
                      {p.preorderWhen}
                    </TableCell>
                    <TableCell className="text-gray-600 text-sm py-3.5">
                      {fmt(p.startsAt)}
                    </TableCell>
                    <TableCell className="text-gray-400 text-sm py-3.5">
                      {fmt(p.endsAt) || "—"}
                    </TableCell>
                    <TableCell className="py-3.5">
                      <Switch
                        checked={p.status}
                        onCheckedChange={(v) => toggleStatus(p.id, v)}
                        className="data-[state=checked]:bg-gray-900 data-[state=unchecked]:bg-gray-200 rounded-full"
                      />
                    </TableCell>
                    <TableCell className="pr-6 py-3.5">
                      <div className="flex items-center gap-1">
                        <button
                          onClick={() => router.push(`/preorders/${p.id}/edit`)}
                          className="p-1.5 rounded-md hover:bg-gray-100 text-gray-400 hover:text-gray-600"
                        >
                          <Pencil className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => deletePreorder(p.id)}
                          className="p-1.5 rounded-md hover:bg-red-50 text-gray-400 hover:text-red-500"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>

          {pagination && (
            <div className="flex items-center justify-center gap-3 px-6 py-3 border-t border-gray-100">
              <button
                disabled={page <= 1}
                onClick={() => goToPage(page - 1)}
                className="p-1.5 rounded-md border border-gray-300 text-gray-500 hover:bg-gray-100 disabled:opacity-30 disabled:cursor-not-allowed"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <span className="text-sm font-semibold text-gray-700">
                Showing {pagination.showingFrom} to {pagination.showingTo} from{" "}
                {pagination.total}
              </span>
              <button
                disabled={page >= pagination.totalPages}
                onClick={() => goToPage(page + 1)}
                className="p-1.5 rounded-md border border-gray-300 text-gray-500 hover:bg-gray-100 disabled:opacity-30 disabled:cursor-not-allowed"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
