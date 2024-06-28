import React from "react";

import ColumnSection from "~/components/column-section";
import { type Board } from "~/types";

interface Props {
  board: Board;
}

export default function KanbanBoard({ board }: Props) {
  return (
    <div className="grid h-full auto-cols-[280px] grid-flow-col gap-x-6 overflow-x-auto px-4 py-6">
      {board.columns?.map((column) => (
        <ColumnSection key={column.id} column={column} />
      ))}

      <div className="mt-10 flex items-center justify-center rounded-md bg-gradient-to-b from-[#2b2c37] to-[#2b2c37]/50 text-muted-foreground">
        <h1>+ New Column</h1>
      </div>
    </div>
  );
}
