"use client";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Wand2 } from "lucide-react";
import { TransformType } from "@/lib/types";
import { transformLabels } from "@/lib/transforms";

const transforms: TransformType[] = [
  "strip_formatting",
  "extract_urls",
  "to_markdown",
  "prettify_json",
  "trim_whitespace",
  "to_uppercase",
  "to_lowercase",
];

interface TransformMenuProps {
  onTransform: (type: TransformType) => void;
}

export function TransformMenu({ onTransform }: TransformMenuProps) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="inline-flex h-7 w-7 items-center justify-center rounded-md text-sm hover:bg-accent hover:text-accent-foreground">
        <Wand2 className="h-3.5 w-3.5" />
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        {transforms.map((t) => (
          <DropdownMenuItem key={t} onClick={() => onTransform(t)}>
            {transformLabels[t]}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
