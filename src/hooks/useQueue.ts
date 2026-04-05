"use client";

import { useCallback, useEffect, useState } from "react";
import { createClient } from "@/lib/supabase/client";
import type { ClipboardItem, ContentTypeFilter } from "@/lib/types";

export function useQueue() {
  const [items, setItems] = useState<ClipboardItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [typeFilter, setTypeFilter] = useState<ContentTypeFilter>("all");
  const [collectionFilter, setCollectionFilter] = useState<string | null>(null);
  const supabase = createClient();

  const fetchItems = useCallback(async () => {
    let query = supabase
      .from("items")
      .select("*")
      .order("is_pinned", { ascending: false })
      .order("created_at", { ascending: false });

    if (typeFilter !== "all") {
      query = query.eq("content_type", typeFilter);
    }

    if (collectionFilter) {
      query = query.eq("collection_id", collectionFilter);
    }

    if (searchQuery) {
      query = query.textSearch("content", searchQuery, { type: "websearch" });
    }

    const { data, error } = await query.limit(200);

    if (!error && data) {
      setItems(data as ClipboardItem[]);
    }
    setLoading(false);
  }, [searchQuery, typeFilter, collectionFilter, supabase]);

  // Fetch on mount and when filters change
  useEffect(() => {
    fetchItems();
  }, [fetchItems]);

  const addItem = async (
    content: string,
    contentType: ClipboardItem["content_type"] = "text",
    sourceUrl?: string,
    sourceTitle?: string
  ) => {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return;

    const { error } = await supabase.from("items").insert({
      user_id: user.id,
      content,
      content_type: contentType,
      source_url: sourceUrl || null,
      source_title: sourceTitle || null,
    });

    if (error) {
      console.error("Failed to add item:", error);
    } else {
      await fetchItems();
    }
  };

  const deleteItem = async (id: string) => {
    await supabase.from("items").delete().eq("id", id);
    setItems((prev) => prev.filter((item) => item.id !== id));
  };

  const togglePin = async (id: string, currentPinned: boolean) => {
    await supabase
      .from("items")
      .update({ is_pinned: !currentPinned })
      .eq("id", id);
    await fetchItems();
  };

  const updateItem = async (id: string, updates: Partial<ClipboardItem>) => {
    await supabase.from("items").update(updates).eq("id", id);
    await fetchItems();
  };

  const moveToCollection = async (itemId: string, collectionId: string | null) => {
    await supabase
      .from("items")
      .update({ collection_id: collectionId })
      .eq("id", itemId);
    await fetchItems();
  };

  const clearUnpinned = async () => {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return;
    await supabase
      .from("items")
      .delete()
      .eq("user_id", user.id)
      .eq("is_pinned", false);
    await fetchItems();
  };

  return {
    items,
    loading,
    searchQuery,
    setSearchQuery,
    typeFilter,
    setTypeFilter,
    collectionFilter,
    setCollectionFilter,
    addItem,
    deleteItem,
    togglePin,
    updateItem,
    moveToCollection,
    clearUnpinned,
    refetch: fetchItems,
  };
}
