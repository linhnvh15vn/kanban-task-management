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
  const board = await api.board.getById({ id: params.boardId });
  if (!board) {
    return notFound();
  }

  return (
    <div className="flex min-h-screen flex-col">
      <Header board={board} />
      <div className="flex flex-1">
        <Navigation />
        {children}
      </div>
    </div>
  );
}
