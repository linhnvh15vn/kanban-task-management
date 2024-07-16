import React from "react";

import { redirect } from "next/navigation";

import EmptyBoard from "~/components/empty-board";
import KanbanBoard from "~/components/kanban-board";
import { api } from "~/trpc/server";

interface Props {
  params: {
    boardId: string;
  };
}

export default async function Page({ params }: Props) {
  const board = await api.board.getById({ id: params.boardId });
  if (!board) {
    return redirect("/");
  }

  return (
    <main className="overflow-x-auto">
      {!!board.columns.length ? <KanbanBoard board={board} /> : <EmptyBoard />}
    </main>
  );
}
