"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Circle,
  MoreHorizontal,
  Pencil,
  Trash2,
  Download,
  FolderOpen,
} from "lucide-react";
import type { Collection } from "@/lib/types";

interface CollectionCardProps {
  collection: Collection;
  onUpdate: (id: string, updates: Partial<Collection>) => void;
  onDelete: (id: string) => void;
  onExport: (id: string) => void;
  onClick: (id: string) => void;
}

export function CollectionCard({
  collection,
  onUpdate,
  onDelete,
  onExport,
  onClick,
}: CollectionCardProps) {
  const [editing, setEditing] = useState(false);
  const [editName, setEditName] = useState(collection.name);

  const handleSave = () => {
    if (editName.trim() && editName !== collection.name) {
      onUpdate(collection.id, { name: editName.trim() });
    }
    setEditing(false);
  };

  return (
    <div
      className="group rounded-lg border bg-card p-4 cursor-pointer hover:shadow-sm transition-all"
      onClick={() => !editing && onClick(collection.id)}
    >
      <div className="flex items-start justify-between">
        <div className="flex items-center gap-3">
          <div
            className="h-10 w-10 rounded-lg flex items-center justify-center"
            style={{ backgroundColor: collection.color + "20" }}
          >
            <FolderOpen className="h-5 w-5" style={{ color: collection.color }} />
          </div>
          <div>
            {editing ? (
              <Input
                value={editName}
                onChange={(e) => setEditName(e.target.value)}
                onBlur={handleSave}
                onKeyDown={(e) => e.key === "Enter" && handleSave()}
                className="h-7 text-sm"
                autoFocus
                onClick={(e) => e.stopPropagation()}
              />
            ) : (
              <h3 className="font-medium">{collection.name}</h3>
            )}
            <p className="text-xs text-muted-foreground mt-0.5">
              {collection.item_count ?? 0} items
            </p>
          </div>
        </div>

        <DropdownMenu>
          <DropdownMenuTrigger
            className="inline-flex h-8 w-8 items-center justify-center rounded-md text-sm opacity-0 group-hover:opacity-100 hover:bg-accent hover:text-accent-foreground"
            onClick={(e) => e.stopPropagation()}
          >
            <MoreHorizontal className="h-4 w-4" />
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem
              onClick={(e) => {
                e.stopPropagation();
                setEditing(true);
              }}
            >
              <Pencil className="mr-2 h-4 w-4" />
              Rename
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={(e) => {
                e.stopPropagation();
                onExport(collection.id);
              }}
            >
              <Download className="mr-2 h-4 w-4" />
              Export as Markdown
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={(e) => {
                e.stopPropagation();
                onDelete(collection.id);
              }}
              className="text-destructive"
            >
              <Trash2 className="mr-2 h-4 w-4" />
              Delete
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  );
}
