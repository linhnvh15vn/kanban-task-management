"use client";

import React from "react";

import { Eye } from "lucide-react";

import { Button } from "~/components/ui/button";
import { useGlobalStore } from "~/store/use-global-store";

export default function NavigationOpenSidebar() {
  const { toggleNav } = useGlobalStore();

  return (
    <Button
      type="button"
      onClick={toggleNav}
      className="fixed bottom-8 left-0 h-12 w-14 rounded-l-none rounded-r-full p-0"
    >
      <Eye size={16} />
    </Button>
  );
}
