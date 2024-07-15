import React from "react";

import { redirect } from "next/navigation";

import InitialModal from "~/components/modals/initial-modal";
import { api } from "~/trpc/server";

export default async function Page() {
  const board = await api.board.getFirst();
  if (!board) {
    return <InitialModal />;
  }

  return redirect(`/boards/${board.id}`);
}
