import React from "react";

import ColumnSection from "~/components/column-section";

interface Props {
  board: any;
}

export default function KanbanBoard({ board }: Props) {
  return (
    <div className="grid h-full auto-cols-[280px] grid-flow-col gap-x-6 overflow-x-auto px-4 py-6">
      {board.columns.map((column) => (
        <ColumnSection key={column.id} column={column} />
      ))}
    </div>
  );
}
