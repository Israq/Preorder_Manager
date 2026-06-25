"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ChevronLeft, Minus, Plus } from "lucide-react";

type Preorder = {
  id?: string;
  name: string;
  products: number;
  preorderWhen: string;
  startsAt: string;
  endsAt: string | null;
  status: boolean;
};

type PreorderFormProps = {
  preorder?: Preorder;
  isEditing?: boolean;
};

export function PreorderForm({ preorder, isEditing }: PreorderFormProps) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    name: preorder?.name || "",
    products: preorder?.products || 1,
    preorderWhen: preorder?.preorderWhen || "regardless-of-stock",
    startsAt: preorder?.startsAt
      ? new Date(preorder.startsAt).toISOString().slice(0, 16)
      : "",
    endsAt: preorder?.endsAt
      ? new Date(preorder.endsAt).toISOString().slice(0, 16)
      : "",
    status: preorder?.status ?? true,
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const url = isEditing
        ? `/api/preorders/${preorder?.id}`
        : "/api/preorders";
      const method = isEditing ? "PUT" : "POST";

      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...formData,
          startsAt: new Date(formData.startsAt).toISOString(),
          endsAt: formData.endsAt
            ? new Date(formData.endsAt).toISOString()
            : null,
        }),
      });

      if (res.ok) {
        toast.success(isEditing ? "Preorder updated" : "Preorder created");
        router.push("/preorders");
      } else {
        toast.error("Failed to save preorder");
      }
    } catch (error) {
      console.error("Save error:", error);
      toast.error("Failed to save preorder");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#F4F4F4]">
      {/* Top Action Bar */}
      <div className="flex items-center justify-between px-4 sm:px-6 py-4 max-w-[960px] mx-auto">
        <Button
          variant="outline"
          onClick={() => router.push("/preorders")}
          className="bg-white border-gray-200 text-gray-700 hover:bg-gray-50 rounded-lg h-9 px-3 text-sm font-medium"
        >
          <ChevronLeft className="w-4 h-4 mr-1" />
          Back
        </Button>
        <div className="flex items-center gap-2 sm:gap-3">
          <Button
            variant="outline"
            onClick={() => router.push("/preorders")}
            className="bg-white border-gray-200 text-gray-700 hover:bg-gray-50 rounded-lg h-9 px-3 sm:px-4 text-sm font-medium"
          >
            Cancel
          </Button>
          <Button
            onClick={handleSubmit}
            disabled={loading}
            className="bg-gray-900 hover:bg-gray-800 text-white rounded-lg h-9 px-3 sm:px-4 text-sm font-medium"
          >
            {loading ? "Saving..." : "Save changes"}
          </Button>
        </div>
      </div>

      {/* Main Form Card */}
      <div className="mx-4 sm:mx-6 max-w-[960px] sm:mx-auto bg-white rounded-lg shadow-sm border border-gray-100 overflow-x-auto">
        {/* Form Header */}
        <div className="px-6 sm:px-10 py-5 sm:py-6 border-b border-gray-100">
          <h2 className="text-lg font-bold text-gray-900">Preorder details</h2>
          <p className="text-sm text-gray-400 mt-1">
            These values appear in the preorders list.
          </p>
        </div>

        {/* Form Fields */}
        <form onSubmit={handleSubmit} className="min-w-[640px]">
          {/* Name */}
          <div className="flex items-start gap-8 sm:gap-12 px-6 sm:px-10 py-5 border-b border-gray-50">
            <div className="w-[240px] flex-shrink-0">
              <Label className="text-sm font-semibold text-gray-900">
                Name <span className="text-red-500 font-normal">*</span>
              </Label>
              <p className="text-xs text-gray-400 mt-0.5">
                A label to recognize this preorder by.
              </p>
            </div>
            <div className="w-[260px]">
              <Input
                value={formData.name}
                onChange={(e) =>
                  setFormData({ ...formData, name: e.target.value })
                }
                required
                className="border-gray-200 rounded-md h-9 text-sm"
                placeholder="Enter name"
              />
            </div>
          </div>

          {/* Products */}
          <div className="flex items-center gap-8 sm:gap-12 px-6 sm:px-10 py-5 border-b border-gray-50">
            <div className="w-[240px] flex-shrink-0">
              <Label className="text-sm font-semibold text-gray-900">
                Products
              </Label>
              <p className="text-xs text-gray-400 mt-0.5">
                Number of products covered by this preorder.
              </p>
            </div>
            <div className="flex items-center gap-2">
              <div className="flex items-center border border-gray-200 rounded-md">
                <button
                  type="button"
                  onClick={() =>
                    setFormData({
                      ...formData,
                      products: Math.max(0, formData.products - 1),
                    })
                  }
                  className="px-2.5 py-1.5 text-gray-500 hover:bg-gray-50 border-r border-gray-200"
                >
                  <Minus className="w-3.5 h-3.5" />
                </button>
                <input
                  type="number"
                  value={formData.products}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      products: parseInt(e.target.value) || 0,
                    })
                  }
                  className="w-14 text-center border-none outline-none py-1.5 text-sm text-gray-900 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                />
                <button
                  type="button"
                  onClick={() =>
                    setFormData({
                      ...formData,
                      products: formData.products + 1,
                    })
                  }
                  className="px-2.5 py-1.5 text-gray-500 hover:bg-gray-50 border-l border-gray-200"
                >
                  <Plus className="w-3.5 h-3.5" />
                </button>
              </div>
              <span className="text-sm text-gray-500">product(s)</span>
            </div>
          </div>

          {/* Preorder when */}
          <div className="flex items-center gap-8 sm:gap-12 px-6 sm:px-10 py-5 border-b border-gray-50">
            <div className="w-[240px] flex-shrink-0">
              <Label className="text-sm font-semibold text-gray-900">
                Preorder when
              </Label>
              <p className="text-xs text-gray-400 mt-0.5">
                When customers are allowed to preorder.
              </p>
            </div>
            <div className="w-[260px]">
              <Select
                value={formData.preorderWhen}
                onValueChange={(value) =>
                  setFormData({ ...formData, preorderWhen: value })
                }
              >
                <SelectTrigger className="border-gray-200 rounded-md h-9 text-sm">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="regardless-of-stock">
                    regardless-of-stock
                  </SelectItem>
                  <SelectItem value="out-of-stock">out-of-stock</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Starts at */}
          <div className="flex items-center gap-8 sm:gap-12 px-6 sm:px-10 py-5 border-b border-gray-50">
            <div className="w-[240px] flex-shrink-0">
              <Label className="text-sm font-semibold text-gray-900">
                Starts at
              </Label>
              <p className="text-xs text-gray-400 mt-0.5">
                When the preorder window opens.
              </p>
            </div>
            <div className="w-[260px]">
              <Input
                type="datetime-local"
                value={formData.startsAt}
                onChange={(e) =>
                  setFormData({ ...formData, startsAt: e.target.value })
                }
                required
                className="border-gray-200 rounded-md h-9 text-sm [&::-webkit-calendar-picker-indicator]:opacity-100 [&::-webkit-calendar-picker-indicator]:cursor-pointer"
              />
            </div>
          </div>

          {/* Ends at */}
          <div className="flex items-center gap-8 sm:gap-12 px-6 sm:px-10 py-5 border-b border-gray-50">
            <div className="w-[240px] flex-shrink-0">
              <Label className="text-sm font-semibold text-gray-900">
                Ends at
              </Label>
              <p className="text-xs text-gray-400 mt-0.5">
                Leave empty for no end date.
              </p>
            </div>
            <div className="w-[260px]">
              <Input
                type="datetime-local"
                value={formData.endsAt}
                onChange={(e) =>
                  setFormData({ ...formData, endsAt: e.target.value })
                }
                className="border-gray-200 rounded-md h-9 text-sm text-gray-400 [&::-webkit-calendar-picker-indicator]:opacity-100 [&::-webkit-calendar-picker-indicator]:cursor-pointer"
                placeholder="mm / dd / yyyy , -- : -- --"
              />
            </div>
          </div>

          {/* Status */}
          <div className="flex items-center gap-8 sm:gap-12 px-6 sm:px-10 py-5 border-b border-gray-50">
            <div className="w-[240px] flex-shrink-0">
              <Label className="text-sm font-semibold text-gray-900">
                Status
              </Label>
              <p className="text-xs text-gray-400 mt-0.5">
                Active preorders are visible to customers.
              </p>
            </div>
            <div className="flex items-center gap-2">
              <Switch
                checked={formData.status}
                onCheckedChange={(checked) =>
                  setFormData({ ...formData, status: checked })
                }
                className="data-[state=checked]:bg-gray-900 data-[state=unchecked]:bg-gray-200 rounded-full"
              />
              <span className="text-sm text-gray-700 font-medium">Active</span>
            </div>
          </div>

          {/* Card Footer Buttons */}
          <div className="flex items-center justify-end gap-2 sm:gap-3 px-6 sm:px-10 py-4">
            <Button
              type="button"
              variant="outline"
              onClick={() => router.push("/preorders")}
              className="bg-white border-gray-200 text-gray-700 hover:bg-gray-50 rounded-lg h-9 px-3 sm:px-4 text-sm font-medium"
            >
              Cancel
            </Button>
            <Button
              type="submit"
              disabled={loading}
              className="bg-gray-900 hover:bg-gray-800 text-white rounded-lg h-9 px-3 sm:px-4 text-sm font-medium"
            >
              {loading ? "Saving..." : "Save changes"}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
