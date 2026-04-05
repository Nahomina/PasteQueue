"use client";

import { useAuth } from "@/hooks/useAuth";
import { Header } from "@/components/layout/Header";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { LogOut, Globe, Keyboard } from "lucide-react";

export default function SettingsPage() {
  const { user, signOut } = useAuth();

  const initials = user?.user_metadata?.full_name
    ? user.user_metadata.full_name
        .split(" ")
        .map((n: string) => n[0])
        .join("")
        .toUpperCase()
    : user?.email?.[0]?.toUpperCase() ?? "?";

  return (
    <>
      <Header title="Settings" />

      <div className="flex-1 overflow-y-auto p-4 lg:p-6 max-w-2xl space-y-8">
        {/* Profile */}
        <section>
          <h2 className="text-lg font-semibold mb-4">Profile</h2>
          <div className="flex items-center gap-4">
            <Avatar className="h-16 w-16">
              <AvatarFallback className="text-lg bg-indigo-100 text-indigo-700">
                {initials}
              </AvatarFallback>
            </Avatar>
            <div>
              <p className="font-medium">
                {user?.user_metadata?.full_name || "User"}
              </p>
              <p className="text-sm text-muted-foreground">{user?.email}</p>
              <p className="text-xs text-muted-foreground mt-1">
                Member since{" "}
                {user?.created_at
                  ? new Date(user.created_at).toLocaleDateString()
                  : "—"}
              </p>
            </div>
          </div>
        </section>

        <Separator />

        {/* Browser Extension */}
        <section>
          <h2 className="text-lg font-semibold mb-2">Browser Extension</h2>
          <p className="text-sm text-muted-foreground mb-4">
            Install the PasteQueue Chrome extension to automatically capture
            everything you copy.
          </p>
          <Button variant="outline">
            <Globe className="mr-2 h-4 w-4" />
            Install Chrome Extension
          </Button>
        </section>

        <Separator />

        {/* Keyboard Shortcuts */}
        <section>
          <h2 className="text-lg font-semibold mb-2">Keyboard Shortcuts</h2>
          <div className="space-y-2 text-sm">
            <div className="flex items-center justify-between py-1">
              <span className="text-muted-foreground">Quick add item</span>
              <kbd className="px-2 py-1 bg-muted rounded text-xs font-mono">
                Ctrl + Shift + V
              </kbd>
            </div>
            <div className="flex items-center justify-between py-1">
              <span className="text-muted-foreground">Search queue</span>
              <kbd className="px-2 py-1 bg-muted rounded text-xs font-mono">
                Ctrl + K
              </kbd>
            </div>
            <div className="flex items-center justify-between py-1">
              <span className="text-muted-foreground">Copy top item</span>
              <kbd className="px-2 py-1 bg-muted rounded text-xs font-mono">
                Ctrl + Shift + C
              </kbd>
            </div>
          </div>
        </section>

        <Separator />

        {/* Account */}
        <section>
          <h2 className="text-lg font-semibold mb-4">Account</h2>
          <Button variant="destructive" onClick={signOut}>
            <LogOut className="mr-2 h-4 w-4" />
            Sign Out
          </Button>
        </section>
      </div>
    </>
  );
}
