import React from "react";

import { redirect } from 'next/navigation';

import { api } from "~/trpc/server";

export default async function Page() {
  const board = await api.board.getFirst();
  if (!board) {
    return <h1>Return no board</h1>;
  }

  return redirect(`/boards/${board.id}`);
}
