import React from 'react';

import ColumnSection from '~/components/column-section';
import { Card } from '~/components/ui/card';
import { type Board } from '~/types';

interface Props {
  board: Board;
}

export default function KanbanBoard({ board }: Props) {
  return (
    <div className="grid h-full auto-cols-[280px] grid-flow-col gap-x-6 overflow-x-auto px-4 py-6">
      {board.columns?.map((column) => (
        <ColumnSection key={column.id} column={column} />
      ))}

      <Card className="mt-10 flex items-center justify-center bg-gradient-to-b from-[#e9effa] to-[#e9effa]/50 text-muted-foreground dark:from-[#2b2c37] dark:to-[#2b2c37]/50">
        <h1 className="cursor-pointer hover:text-primary">+ New Column</h1>
      </Card>
    </div>
  );
}
