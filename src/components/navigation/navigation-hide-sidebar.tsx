"use client";

import React from "react";

import { EyeOff } from "lucide-react";

import { useGlobalStore } from "~/store/use-global-store";

export default function NavigationHideSidebar() {
  const { toggleNav } = useGlobalStore();

  return (
    <button
      className="mr-6 flex h-12 items-center gap-2.5 rounded-e-full px-6 text-muted-foreground hover:bg-primary hover:text-white"
      onClick={toggleNav}
    >
      <EyeOff className="size-4" />
      <h3>Hide Sidebar</h3>
    </button>
  );
}
