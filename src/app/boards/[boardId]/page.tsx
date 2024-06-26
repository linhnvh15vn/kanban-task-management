import React from "react";

import { redirect } from "next/navigation";

import KanbanBoard from "~/components/kanban-board";
import Navigation from "~/components/navigation";
import NavigationOpenSidebar from "~/components/navigation/navigation-open-sidebar";
import { api } from "~/trpc/server";

interface Props {
  params: {
    boardId: number;
  };
  searchParams: {
    nav?: boolean;
  };
}

export default async function Page({ params, searchParams }: Props) {
  const board = await api.board.getById({ id: Number(params.boardId) });
  if (!board) {
    return redirect("/");
  }

  return (
    <div className="grid flex-1 overflow-scroll md:grid-cols-[260px_minmax(0,1fr)] xl:grid-cols-[300px_minmax(0,1fr)]">
      {searchParams.nav && <Navigation />}
      {!searchParams.nav && <NavigationOpenSidebar />}

      <KanbanBoard board={board} />
    </div>
  );
}
