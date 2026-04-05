"use client";

import { useEffect } from "react";

interface Shortcuts {
  onSearch?: () => void;
  onAddItem?: () => void;
}

export function useKeyboardShortcuts({ onSearch, onAddItem }: Shortcuts) {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Cmd/Ctrl + K → focus search
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        onSearch?.();
      }
      // Cmd/Ctrl + Shift + A → open add dialog
      if ((e.metaKey || e.ctrlKey) && e.shiftKey && e.key === "a") {
        e.preventDefault();
        onAddItem?.();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [onSearch, onAddItem]);
}
