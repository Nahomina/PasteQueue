"use client";

import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import type { ClipboardItem } from "@/lib/types";

interface AddItemDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onAdd: (
    content: string,
    contentType: ClipboardItem["content_type"],
    sourceUrl?: string
  ) => void;
}

const contentTypes: { value: ClipboardItem["content_type"]; label: string }[] = [
  { value: "text", label: "Text" },
  { value: "url", label: "URL" },
  { value: "code", label: "Code" },
];

export function AddItemDialog({ open, onOpenChange, onAdd }: AddItemDialogProps) {
  const [content, setContent] = useState("");
  const [contentType, setContentType] =
    useState<ClipboardItem["content_type"]>("text");
  const [sourceUrl, setSourceUrl] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!content.trim()) return;
    onAdd(content, contentType, sourceUrl || undefined);
    setContent("");
    setSourceUrl("");
    setContentType("text");
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Add to Queue</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <Textarea
            placeholder="Paste or type content here..."
            value={content}
            onChange={(e) => setContent(e.target.value)}
            rows={5}
            className="font-mono text-sm"
            autoFocus
          />
          <div className="flex gap-2">
            {contentTypes.map((type) => (
              <Button
                key={type.value}
                type="button"
                variant={contentType === type.value ? "default" : "outline"}
                size="sm"
                onClick={() => setContentType(type.value)}
              >
                {type.label}
              </Button>
            ))}
          </div>
          <Input
            placeholder="Source URL (optional)"
            value={sourceUrl}
            onChange={(e) => setSourceUrl(e.target.value)}
          />
          <div className="flex justify-end gap-2">
            <Button
              type="button"
              variant="outline"
              onClick={() => onOpenChange(false)}
            >
              Cancel
            </Button>
            <Button type="submit" disabled={!content.trim()}>
              Add Item
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
