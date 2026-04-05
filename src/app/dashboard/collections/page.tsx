"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useCollections } from "@/hooks/useCollections";
import { Header } from "@/components/layout/Header";
import { CollectionCard } from "@/components/collections/CollectionCard";
import { CreateCollectionDialog } from "@/components/collections/CreateCollectionDialog";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Plus, FolderOpen } from "lucide-react";
import { createClient } from "@/lib/supabase/client";

export default function CollectionsPage() {
  const [createOpen, setCreateOpen] = useState(false);
  const { collections, loading, createCollection, updateCollection, deleteCollection } =
    useCollections();
  const router = useRouter();

  const handleExport = async (collectionId: string) => {
    const supabase = createClient();
    const collection = collections.find((c) => c.id === collectionId);
    if (!collection) return;

    const { data: items } = await supabase
      .from("items")
      .select("*")
      .eq("collection_id", collectionId)
      .order("created_at", { ascending: false });

    if (!items) return;

    const markdown = [
      `# ${collection.name}`,
      ``,
      `*Exported from PasteQueue on ${new Date().toLocaleDateString()}*`,
      ``,
      ...items.map(
        (item, i) =>
          `## ${i + 1}. ${item.content_type} — ${new Date(item.created_at).toLocaleString()}\n\n\`\`\`\n${item.content}\n\`\`\`\n`
      ),
    ].join("\n");

    const blob = new Blob([markdown], { type: "text/markdown" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${collection.name.toLowerCase().replace(/\s+/g, "-")}.md`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleClick = (id: string) => {
    // Navigate to dashboard with collection filter (via query param)
    router.push(`/dashboard?collection=${id}`);
  };

  return (
    <>
      <Header
        title="Collections"
        actions={
          <Button size="sm" onClick={() => setCreateOpen(true)}>
            <Plus className="mr-2 h-3.5 w-3.5" />
            New Collection
          </Button>
        }
      />

      <ScrollArea className="flex-1">
        {loading ? (
          <div className="flex-1 flex items-center justify-center p-8">
            <div className="animate-pulse text-muted-foreground">Loading...</div>
          </div>
        ) : collections.length === 0 ? (
          <div className="flex-1 flex flex-col items-center justify-center text-center p-8">
            <FolderOpen className="h-12 w-12 text-muted-foreground/50 mb-4" />
            <h3 className="text-lg font-medium">No collections yet</h3>
            <p className="text-sm text-muted-foreground mt-1 max-w-sm">
              Create collections to organize your clipboard items by project,
              topic, or any grouping that works for you.
            </p>
            <Button className="mt-4" onClick={() => setCreateOpen(true)}>
              <Plus className="mr-2 h-4 w-4" />
              Create Your First Collection
            </Button>
          </div>
        ) : (
          <div className="grid gap-4 p-4 lg:p-6 sm:grid-cols-2 lg:grid-cols-3">
            {collections.map((col) => (
              <CollectionCard
                key={col.id}
                collection={col}
                onUpdate={updateCollection}
                onDelete={deleteCollection}
                onExport={handleExport}
                onClick={handleClick}
              />
            ))}
          </div>
        )}
      </ScrollArea>

      <CreateCollectionDialog
        open={createOpen}
        onOpenChange={setCreateOpen}
        onCreate={createCollection}
      />
    </>
  );
}
