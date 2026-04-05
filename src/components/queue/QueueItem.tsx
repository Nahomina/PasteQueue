"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { TransformMenu } from "./TransformMenu";
import {
  Copy,
  Pin,
  PinOff,
  Trash2,
  MoreHorizontal,
  Check,
  ExternalLink,
  FolderPlus,
  Circle,
} from "lucide-react";
import type { ClipboardItem, Collection, TransformType } from "@/lib/types";
import { applyTransform } from "@/lib/transforms";

interface QueueItemProps {
  item: ClipboardItem;
  collections: Collection[];
  onDelete: (id: string) => void;
  onTogglePin: (id: string, pinned: boolean) => void;
  onUpdate: (id: string, updates: Partial<ClipboardItem>) => void;
  onMoveToCollection: (itemId: string, collectionId: string | null) => void;
  onAddTransformed: (
    content: string,
    contentType: ClipboardItem["content_type"]
  ) => void;
}

const typeColors: Record<string, string> = {
  text: "bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-300",
  url: "bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300",
  code: "bg-amber-100 text-amber-700 dark:bg-amber-900 dark:text-amber-300",
  image: "bg-purple-100 text-purple-700 dark:bg-purple-900 dark:text-purple-300",
};

export function QueueItem({
  item,
  collections,
  onDelete,
  onTogglePin,
  onUpdate,
  onMoveToCollection,
  onAddTransformed,
}: QueueItemProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(item.content);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy:", err);
    }
  };

  const handleTransform = (type: TransformType) => {
    const transformed = applyTransform(item.content, type);
    onAddTransformed(transformed, item.content_type);
  };

  const timeAgo = getTimeAgo(item.created_at);
  const preview = item.content.slice(0, 300);
  const isLong = item.content.length > 300;

  return (
    <div
      className={cn(
        "group relative rounded-lg border bg-card p-4 transition-all hover:shadow-sm",
        item.is_pinned && "border-indigo-200 bg-indigo-50/50 dark:border-indigo-800 dark:bg-indigo-950/20"
      )}
    >
      {/* Header row */}
      <div className="flex items-start justify-between gap-3 mb-2">
        <div className="flex items-center gap-2">
          <Badge
            variant="secondary"
            className={cn("text-[10px] px-1.5 py-0", typeColors[item.content_type])}
          >
            {item.content_type}
          </Badge>
          {item.is_pinned && (
            <Pin className="h-3 w-3 text-indigo-500" />
          )}
          <span className="text-xs text-muted-foreground">{timeAgo}</span>
          {item.source_url && (
            <a
              href={item.source_url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs text-muted-foreground hover:text-foreground flex items-center gap-1"
            >
              <ExternalLink className="h-3 w-3" />
              {item.source_title || "source"}
            </a>
          )}
        </div>

        {/* Actions */}
        <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
          <TransformMenu onTransform={handleTransform} />

          <Button
            variant="ghost"
            size="icon"
            className="h-7 w-7"
            onClick={handleCopy}
          >
            {copied ? (
              <Check className="h-3.5 w-3.5 text-green-500" />
            ) : (
              <Copy className="h-3.5 w-3.5" />
            )}
          </Button>

          <DropdownMenu>
            <DropdownMenuTrigger className="inline-flex h-7 w-7 items-center justify-center rounded-md text-sm hover:bg-accent hover:text-accent-foreground">
              <MoreHorizontal className="h-3.5 w-3.5" />
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={() => onTogglePin(item.id, item.is_pinned)}>
                {item.is_pinned ? (
                  <>
                    <PinOff className="mr-2 h-4 w-4" /> Unpin
                  </>
                ) : (
                  <>
                    <Pin className="mr-2 h-4 w-4" /> Pin
                  </>
                )}
              </DropdownMenuItem>

              <DropdownMenuSub>
                <DropdownMenuSubTrigger>
                  <FolderPlus className="mr-2 h-4 w-4" />
                  Move to Collection
                </DropdownMenuSubTrigger>
                <DropdownMenuSubContent>
                  <DropdownMenuItem
                    onClick={() => onMoveToCollection(item.id, null)}
                  >
                    None
                  </DropdownMenuItem>
                  {collections.map((col) => (
                    <DropdownMenuItem
                      key={col.id}
                      onClick={() => onMoveToCollection(item.id, col.id)}
                    >
                      <Circle
                        className="mr-2 h-3 w-3 fill-current"
                        style={{ color: col.color }}
                      />
                      {col.name}
                    </DropdownMenuItem>
                  ))}
                </DropdownMenuSubContent>
              </DropdownMenuSub>

              <DropdownMenuSeparator />

              <DropdownMenuItem
                onClick={() => onDelete(item.id)}
                className="text-destructive"
              >
                <Trash2 className="mr-2 h-4 w-4" />
                Delete
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>

      {/* Content */}
      <div
        className={cn(
          "text-sm whitespace-pre-wrap break-words cursor-pointer",
          item.content_type === "code" && "font-mono text-xs bg-muted p-2 rounded"
        )}
        onClick={handleCopy}
      >
        {preview}
        {isLong && (
          <span className="text-muted-foreground"> ...({item.content.length} chars)</span>
        )}
      </div>
    </div>
  );
}

function getTimeAgo(dateStr: string): string {
  const now = new Date();
  const date = new Date(dateStr);
  const seconds = Math.floor((now.getTime() - date.getTime()) / 1000);

  if (seconds < 60) return "just now";
  if (seconds < 3600) return `${Math.floor(seconds / 60)}m ago`;
  if (seconds < 86400) return `${Math.floor(seconds / 3600)}h ago`;
  if (seconds < 604800) return `${Math.floor(seconds / 86400)}d ago`;
  return date.toLocaleDateString();
}
