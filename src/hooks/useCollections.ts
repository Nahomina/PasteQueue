"use client";

import { useCallback, useEffect, useState } from "react";
import { createClient } from "@/lib/supabase/client";
import type { Collection } from "@/lib/types";

export function useCollections() {
  const [collections, setCollections] = useState<Collection[]>([]);
  const [loading, setLoading] = useState(true);
  const supabase = createClient();

  const fetchCollections = useCallback(async () => {
    const { data, error } = await supabase
      .from("collections")
      .select("*, items(count)")
      .order("created_at", { ascending: false });

    if (!error && data) {
      setCollections(
        data.map((c: Record<string, unknown>) => ({
          ...c,
          item_count: (c.items as { count: number }[])?.[0]?.count ?? 0,
        })) as Collection[]
      );
    }
    setLoading(false);
  }, [supabase]);

  useEffect(() => {
    fetchCollections();
  }, [fetchCollections]);

  const createCollection = async (name: string, color?: string) => {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return;

    const { error } = await supabase.from("collections").insert({
      user_id: user.id,
      name,
      color: color || "#6366f1",
    });

    if (error) {
      console.error("Failed to create collection:", error);
    } else {
      // Manually refetch after mutation so UI stays in sync
      await fetchCollections();
    }
  };

  const updateCollection = async (id: string, updates: Partial<Collection>) => {
    await supabase.from("collections").update(updates).eq("id", id);
    await fetchCollections();
  };

  const deleteCollection = async (id: string) => {
    await supabase.from("collections").delete().eq("id", id);
    await fetchCollections();
  };

  return {
    collections,
    loading,
    createCollection,
    updateCollection,
    deleteCollection,
    refetch: fetchCollections,
  };
}
