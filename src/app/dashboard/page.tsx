"use client";

import { useState } from "react";
import { useQueue } from "@/hooks/useQueue";
import { useCollections } from "@/hooks/useCollections";
import { useKeyboardShortcuts } from "@/hooks/useKeyboardShortcuts";
import { Header } from "@/components/layout/Header";
import { QueueList } from "@/components/queue/QueueList";
import { SearchBar } from "@/components/queue/SearchBar";
import { AddItemDialog } from "@/components/queue/AddItemDialog";
import { Button } from "@/components/ui/button";
import { Plus, Trash2 } from "lucide-react";
import type { ClipboardItem } from "@/lib/types";

export default function DashboardPage() {
  const [addDialogOpen, setAddDialogOpen] = useState(false);
  const {
    items,
    loading,
    searchQuery,
    setSearchQuery,
    typeFilter,
    setTypeFilter,
    addItem,
    deleteItem,
    togglePin,
    updateItem,
    moveToCollection,
    clearUnpinned,
  } = useQueue();
  const { collections } = useCollections();

  useKeyboardShortcuts({
    onSearch: () => {
      const el = document.querySelector<HTMLInputElement>('input[placeholder*="Search"]');
      el?.focus();
    },
    onAddItem: () => setAddDialogOpen(true),
  });

  const handleAddTransformed = (
    content: string,
    contentType: ClipboardItem["content_type"]
  ) => {
    addItem(content, contentType);
  };

  return (
    <>
      <Header
        title="Queue"
        actions={
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={clearUnpinned}
              className="text-muted-foreground"
            >
              <Trash2 className="mr-2 h-3.5 w-3.5" />
              Clear
            </Button>
            <Button size="sm" onClick={() => setAddDialogOpen(true)}>
              <Plus className="mr-2 h-3.5 w-3.5" />
              Add Item
            </Button>
          </div>
        }
      />

      <div className="p-4 lg:p-6 border-b">
        <SearchBar
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
          typeFilter={typeFilter}
          onTypeFilterChange={setTypeFilter}
        />
      </div>

      <QueueList
        items={items}
        collections={collections}
        loading={loading}
        onDelete={deleteItem}
        onTogglePin={togglePin}
        onUpdate={updateItem}
        onMoveToCollection={moveToCollection}
        onAddTransformed={handleAddTransformed}
      />

      <AddItemDialog
        open={addDialogOpen}
        onOpenChange={setAddDialogOpen}
        onAdd={addItem}
      />
    </>
  );
}
