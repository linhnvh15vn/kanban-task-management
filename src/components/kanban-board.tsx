'use client';

import React from 'react';

import { useParams } from 'next/navigation';

import ColumnSection from '~/components/column-section';
import { Card } from '~/components/ui/card';
import { api } from '~/trpc/react';
import { type GetBoardById } from '~/types';

interface Props {
  board: GetBoardById;
}

export default function KanbanBoard({ board }: Props) {
  const params = useParams<{ boardId: string }>();

  const { data } = api.board.getById.useQuery(
    { id: params.boardId },
    { initialData: board },
  );

  return (
    <div className="grid h-full auto-cols-[280px] grid-flow-col gap-x-6 overflow-x-auto px-4 py-6">
      {data.columns?.map((column) => (
        <ColumnSection key={column.id} column={column} />
      ))}

      <Card className="mt-10 flex items-center justify-center bg-gradient-to-t from-background text-muted-foreground">
        <h1 className="cursor-pointer hover:text-primary">+ New Column</h1>
      </Card>
    </div>
  );
}
