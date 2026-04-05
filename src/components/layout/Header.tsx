"use client";

import { Button } from "@/components/ui/button";
import { Menu } from "lucide-react";

interface HeaderProps {
  title: string;
  onMenuToggle?: () => void;
  actions?: React.ReactNode;
}

export function Header({ title, onMenuToggle, actions }: HeaderProps) {
  return (
    <header className="flex h-14 items-center gap-4 border-b bg-card px-4 lg:px-6">
      {onMenuToggle && (
        <Button
          variant="ghost"
          size="icon"
          className="lg:hidden"
          onClick={onMenuToggle}
        >
          <Menu className="h-5 w-5" />
        </Button>
      )}
      <h1 className="text-lg font-semibold">{title}</h1>
      {actions && <div className="ml-auto flex items-center gap-2">{actions}</div>}
    </header>
  );
}
