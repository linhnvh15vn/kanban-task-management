import React from "react";

import { redirect } from "next/navigation";

import KanbanBoard from "~/components/kanban-board";
import { api } from "~/trpc/server";

interface Props {
  params: {
    boardId: number;
  };
}

export default async function Page({ params }: Props) {
  const board = await api.board.getById({ id: Number(params.boardId) });
  if (!board) {
    return redirect("/");
  }

  return (
    <main className="overflow-x-auto">
      <KanbanBoard board={board} />
    </main>
  );
}
