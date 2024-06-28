import React from "react";

import { notFound } from "next/navigation";

import Header from "~/components/header";
import Navigation from "~/components/navigation";
import { api } from "~/trpc/server";

interface Props {
  children: React.ReactNode;
  params: { boardId: string };
}

export default async function Layout({ children, params }: Props) {
  const board = await api.board.getById({ id: Number(params.boardId) });
  if (!board) {
    return notFound();
  }

  return (
    <div className="flex min-h-screen flex-col">
      <Header board={board} />
      <div className="grid flex-1 md:grid-cols-[auto_minmax(0,1fr)] xl:grid-cols-[auto_minmax(0,1fr)]">
        <Navigation />
        {children}
      </div>
    </div>
  );
}
