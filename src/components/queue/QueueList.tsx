"use client";

import { QueueItem } from "./QueueItem";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Clipboard } from "lucide-react";
import type { ClipboardItem, Collection } from "@/lib/types";

interface QueueListProps {
  items: ClipboardItem[];
  collections: Collection[];
  loading: boolean;
  onDelete: (id: string) => void;
  onTogglePin: (id: string, pinned: boolean) => void;
  onUpdate: (id: string, updates: Partial<ClipboardItem>) => void;
  onMoveToCollection: (itemId: string, collectionId: string | null) => void;
  onAddTransformed: (
    content: string,
    contentType: ClipboardItem["content_type"]
  ) => void;
}

export function QueueList({
  items,
  collections,
  loading,
  onDelete,
  onTogglePin,
  onUpdate,
  onMoveToCollection,
  onAddTransformed,
}: QueueListProps) {
  if (loading) {
    return (
      <div className="flex-1 flex items-center justify-center">
        <div className="animate-pulse text-muted-foreground">
          Loading your queue...
        </div>
      </div>
    );
  }

  if (items.length === 0) {
    return (
      <div className="flex-1 flex flex-col items-center justify-center text-center p-8">
        <Clipboard className="h-12 w-12 text-muted-foreground/50 mb-4" />
        <h3 className="text-lg font-medium">Your queue is empty</h3>
        <p className="text-sm text-muted-foreground mt-1 max-w-sm">
          Copy something or click &quot;Add Item&quot; to start building your clipboard
          history. Install the browser extension to capture copies automatically.
        </p>
      </div>
    );
  }

  return (
    <ScrollArea className="flex-1">
      <div className="space-y-3 p-4 lg:p-6">
        {items.map((item) => (
          <QueueItem
            key={item.id}
            item={item}
            collections={collections}
            onDelete={onDelete}
            onTogglePin={onTogglePin}
            onUpdate={onUpdate}
            onMoveToCollection={onMoveToCollection}
            onAddTransformed={onAddTransformed}
          />
        ))}
      </div>
    </ScrollArea>
  );
}
