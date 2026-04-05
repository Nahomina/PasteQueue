/**
 * Copyright © 2026 PasteQueue. All rights reserved.
 * Unauthorized copying or distribution of this file is strictly prohibited.
 */

"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { useAuth } from "@/hooks/useAuth";
import { useCollections } from "@/hooks/useCollections";
import {
  Clipboard,
  LayoutDashboard,
  FolderOpen,
  Settings,
  LogOut,
  Plus,
  Circle,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import { ScrollArea } from "@/components/ui/scroll-area";

const YEAR = new Date().getFullYear();

const navItems = [
  { href: "/dashboard",             label: "Queue",       icon: LayoutDashboard },
  { href: "/dashboard/collections", label: "Collections", icon: FolderOpen },
  { href: "/dashboard/settings",    label: "Settings",    icon: Settings },
];

interface SidebarProps {
  onCreateCollection?: () => void;
  onSelectCollection?: (id: string | null) => void;
  activeCollection?: string | null;
}

export function Sidebar({ onCreateCollection, onSelectCollection, activeCollection }: SidebarProps) {
  const pathname    = usePathname();
  const { user, signOut } = useAuth();
  const { collections }   = useCollections();

  const initials = user?.user_metadata?.full_name
    ? user.user_metadata.full_name.split(" ").map((n: string) => n[0]).join("").toUpperCase()
    : user?.email?.[0]?.toUpperCase() ?? "?";

  return (
    <div className="flex h-full w-64 flex-col border-r bg-card">
      {/* Logo */}
      <div className="flex h-14 items-center gap-2.5 px-4 border-b bg-gradient-to-r from-indigo-50/60 to-transparent dark:from-indigo-950/30">
        <div className="flex h-7 w-7 items-center justify-center rounded-md bg-indigo-600 shadow-sm">
          <Clipboard className="h-4 w-4 text-white" />
        </div>
        <span className="text-base font-bold tracking-tight">PasteQueue</span>
        <span className="ml-auto text-[10px] text-muted-foreground font-mono bg-muted px-1.5 py-0.5 rounded">v1.0</span>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-3 space-y-0.5">
        {navItems.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className={cn(
              "flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-all",
              pathname === item.href
                ? "bg-indigo-50 text-indigo-700 dark:bg-indigo-950/50 dark:text-indigo-300"
                : "text-muted-foreground hover:bg-accent hover:text-accent-foreground"
            )}
          >
            <item.icon className={cn("h-4 w-4", pathname === item.href ? "text-indigo-600" : "")} />
            {item.label}
          </Link>
        ))}

        <Separator className="my-3" />

        {/* Collections header */}
        <div className="flex items-center justify-between px-3 py-1.5">
          <span className="text-[11px] font-semibold text-muted-foreground uppercase tracking-widest">
            Collections
          </span>
          {onCreateCollection && (
            <button
              onClick={onCreateCollection}
              className="rounded p-0.5 text-muted-foreground hover:text-indigo-600 hover:bg-indigo-50 dark:hover:bg-indigo-950/40 transition-colors"
              title="New collection"
            >
              <Plus className="h-3.5 w-3.5" />
            </button>
          )}
        </div>

        <ScrollArea className="max-h-52">
          <button
            onClick={() => onSelectCollection?.(null)}
            className={cn(
              "flex w-full items-center gap-3 rounded-lg px-3 py-1.5 text-sm transition-colors",
              activeCollection === null
                ? "text-foreground font-medium"
                : "text-muted-foreground hover:text-foreground hover:bg-accent/50"
            )}
          >
            All Items
          </button>
          {collections.map((col) => (
            <button
              key={col.id}
              onClick={() => onSelectCollection?.(col.id)}
              className={cn(
                "flex w-full items-center gap-3 rounded-lg px-3 py-1.5 text-sm transition-colors",
                activeCollection === col.id
                  ? "text-foreground font-medium bg-accent/50"
                  : "text-muted-foreground hover:text-foreground hover:bg-accent/50"
              )}
            >
              <Circle className="h-2.5 w-2.5 shrink-0 fill-current" style={{ color: col.color }} />
              <span className="truncate">{col.name}</span>
              {col.item_count !== undefined && (
                <span className="ml-auto text-[11px] text-muted-foreground tabular-nums">
                  {col.item_count}
                </span>
              )}
            </button>
          ))}
        </ScrollArea>
      </nav>

      {/* User + copyright */}
      <div className="border-t p-3 space-y-3">
        <div className="flex items-center gap-3">
          <Avatar className="h-8 w-8 ring-2 ring-indigo-100 dark:ring-indigo-900">
            <AvatarFallback className="text-xs bg-indigo-600 text-white font-semibold">
              {initials}
            </AvatarFallback>
          </Avatar>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium truncate leading-none mb-0.5">
              {user?.user_metadata?.full_name || "User"}
            </p>
            <p className="text-[11px] text-muted-foreground truncate">
              {user?.email}
            </p>
          </div>
          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8 text-muted-foreground hover:text-destructive"
            onClick={signOut}
            title="Sign out"
          >
            <LogOut className="h-4 w-4" />
          </Button>
        </div>
        <p className="text-[10px] text-muted-foreground/50 text-center">
          © {YEAR} PasteQueue · All rights reserved
        </p>
      </div>
    </div>
  );
}
