'use client';

import React from 'react';

import {
  SortableContext,
  useSortable,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';

import TaskCard from '~/components/task-card';
import { DragItemType } from '~/enums';
import { type Column } from '~/types';

interface Props {
  column: Column;
}

export default function ColumnSection({ column }: Props) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({
    id: column.id,
    data: { ...column, type: DragItemType.Column },
  });

  const style = {
    transform: CSS.Translate.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
  };

  return (
    <section
      className="flex flex-col gap-6"
      {...attributes}
      {...listeners}
      ref={setNodeRef}
      style={style}
    >
      <div className="flex items-center gap-3">
        <div className="size-4 rounded-full bg-blue-300" />
        <h4 className="text-muted-foreground">
          {`${column.name.toUpperCase()} (${column.tasks?.length})`}
        </h4>
      </div>
      <div className="space-y-5">
        <SortableContext
          items={column.tasks!}
          strategy={verticalListSortingStrategy}
        >
          {column.tasks?.map((task) => <TaskCard key={task.id} task={task} />)}
        </SortableContext>
      </div>
    </section>
  );
}
