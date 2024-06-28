"use client";

import React from "react";

import { SquareKanban } from "lucide-react";

import { useModalStore } from "~/store/use-modal-store";

export default function NavigationCreateButton() {
  const { onOpen } = useModalStore();

  return (
    <div
      className="flex h-12 items-center gap-3 rounded-e-full px-6"
      onClick={() => onOpen("BOARD_FORM", { task: null })}
    >
      <SquareKanban />
      <h3>+ Create a board</h3>
    </div>
  );
}
