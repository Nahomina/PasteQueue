"use client";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Search, X } from "lucide-react";
import type { ContentTypeFilter } from "@/lib/types";

const typeFilters: { value: ContentTypeFilter; label: string }[] = [
  { value: "all", label: "All" },
  { value: "text", label: "Text" },
  { value: "url", label: "URL" },
  { value: "code", label: "Code" },
  { value: "image", label: "Image" },
];

interface SearchBarProps {
  searchQuery: string;
  onSearchChange: (query: string) => void;
  typeFilter: ContentTypeFilter;
  onTypeFilterChange: (filter: ContentTypeFilter) => void;
}

export function SearchBar({
  searchQuery,
  onSearchChange,
  typeFilter,
  onTypeFilterChange,
}: SearchBarProps) {
  return (
    <div className="space-y-3">
      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input
          placeholder="Search your clipboard history..."
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
          className="pl-9 pr-9"
        />
        {searchQuery && (
          <button
            onClick={() => onSearchChange("")}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
          >
            <X className="h-4 w-4" />
          </button>
        )}
      </div>
      <div className="flex gap-2">
        {typeFilters.map((filter) => (
          <Button
            key={filter.value}
            variant={typeFilter === filter.value ? "default" : "outline"}
            size="sm"
            onClick={() => onTypeFilterChange(filter.value)}
            className="h-7 text-xs"
          >
            {filter.label}
          </Button>
        ))}
        {searchQuery && (
          <Badge variant="secondary" className="ml-auto">
            Searching: &quot;{searchQuery}&quot;
          </Badge>
        )}
      </div>
    </div>
  );
}
