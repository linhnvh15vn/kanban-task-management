"use client";

import * as React from "react";

import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";

import { Switch } from "~/components/ui/switch";

export default function ModeToggle() {
  const { setTheme } = useTheme();

  return (
    <div className="mx-2.5 flex h-12 items-center justify-center gap-6 rounded-lg bg-background xl:mx-6">
      <Sun className="size-4 text-muted-foreground" />
      <Switch />
      <Moon className="size-4 text-muted-foreground" />
    </div>
  );
}
