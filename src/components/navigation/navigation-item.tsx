"use client";

import React from "react";

import { SquareKanban } from "lucide-react";
import Link from "next/link";
import { useParams } from "next/navigation";

import { cn } from "~/lib/utils";
import { type Board } from "~/types";

interface Props {
  board: Board;
}

export default function NavigationItem({ board }: Props) {
  const params = useParams();

  return (
    <Link
      href={`/boards/${board.id}`}
      className={cn(
        "flex h-12 items-center gap-3 rounded-e-full px-6 text-muted-foreground transition-colors",
        params.boardId === board.id
          ? "bg-primary text-primary-foreground hover:bg-primary-hover"
          : "hover:bg-secondary hover:text-secondary-foreground",
      )}
    >
      <SquareKanban />
      <h3>{board.name}</h3>
    </Link>
  );
}
