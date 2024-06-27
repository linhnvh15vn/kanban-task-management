"use client";

import React from "react";

import { SquareKanban } from "lucide-react";

export default function NavigationCreateButton() {
  return (
    <div className="flex h-12 items-center gap-3 rounded-e-full px-6">
      <SquareKanban />
      <h3>+ Create a board</h3>
    </div>
  );
}
