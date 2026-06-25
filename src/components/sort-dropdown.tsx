"use client";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { ArrowUpDown, ArrowUp, ArrowDown } from "lucide-react";

type SortDropdownProps = {
  sortBy: string;
  sortOrder: "asc" | "desc";
  onSortByChange: (value: string) => void;
  onSortOrderChange: (value: "asc" | "desc") => void;
};

export function SortDropdown({
  sortBy,
  sortOrder,
  onSortByChange,
  onSortOrderChange,
}: SortDropdownProps) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon" className="h-9 w-9 rounded-full hover:bg-gray-100">
          <ArrowUpDown className="w-4 h-4 text-gray-500" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-48 bg-white rounded-lg shadow-lg border border-gray-200 p-2">
        <DropdownMenuLabel className="text-xs font-medium text-gray-400 px-2 py-1">Sort by</DropdownMenuLabel>
        <DropdownMenuRadioGroup value={sortBy} onValueChange={onSortByChange}>
          <DropdownMenuRadioItem value="name">Name</DropdownMenuRadioItem>
          <DropdownMenuRadioItem value="createdAt">Created At</DropdownMenuRadioItem>
          <DropdownMenuRadioItem value="startsAt">Starts At</DropdownMenuRadioItem>
          <DropdownMenuRadioItem value="endsAt">Ends At</DropdownMenuRadioItem>
        </DropdownMenuRadioGroup>
        <DropdownMenuSeparator className="my-2" />
        <DropdownMenuLabel className="text-xs font-medium text-gray-400 px-2 py-1">Order</DropdownMenuLabel>
        <DropdownMenuRadioGroup value={sortOrder} onValueChange={(v) => onSortOrderChange(v as "asc" | "desc")}>
          <DropdownMenuRadioItem value="asc" className={sortOrder === "asc" ? "bg-gray-100" : ""}>
            <ArrowUp className="w-4 h-4 mr-2" /> Ascending
          </DropdownMenuRadioItem>
          <DropdownMenuRadioItem value="desc" className={sortOrder === "desc" ? "bg-gray-100" : ""}>
            <ArrowDown className="w-4 h-4 mr-2" /> Descending
          </DropdownMenuRadioItem>
        </DropdownMenuRadioGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
