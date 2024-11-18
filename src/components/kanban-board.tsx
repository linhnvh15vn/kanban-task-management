'use client';

import React, { useState } from 'react';

import {
  DndContext,
  useSensor,
  useSensors,
  PointerSensor,
  TouchSensor,
  DragOverlay,
  defaultDropAnimationSideEffects,
  type DragStartEvent,
  type DragOverEvent,
  type DragEndEvent,
  closestCorners,
} from '@dnd-kit/core';
import {
  horizontalListSortingStrategy,
  SortableContext,
  arrayMove,
} from '@dnd-kit/sortable';

import ColumnSection from '~/components/column-section';
import TaskCard from '~/components/task-card';
import { Card } from '~/components/ui/card';
import { DragItemType } from '~/enums';
import { type Task, type Board, type Column } from '~/types';

interface Props {
  board: Board;
}

interface DragItem {
  id: string;
  type: DragItemType;
  data: any;
}

export default function KanbanBoard({ board }: Props) {
  const [orderColumn, setOrderColumn] = useState(board.columns ?? []);
  const [activeItem, setActiveItem] = useState<DragItem | undefined>();

  const pointerSensor = useSensor(PointerSensor, {
    activationConstraint: {
      distance: 10, // mouse move 10px
    },
  });
  const touchSensor = useSensor(TouchSensor);
  const sensors = useSensors(pointerSensor, touchSensor);
  const dropAnimation = {
    sideEffects: defaultDropAnimationSideEffects({
      styles: { active: { opacity: '0.5' } },
    }),
  };

  const handleDragStart = (e: DragStartEvent) => {
    setActiveItem({
      id: e.active.id as string,
      type: e.active.data.current?.type as DragItemType,
      data: e.active.data.current,
    });
  };

  const handleDragOver = (e: DragOverEvent) => {
    if (activeItem?.type === DragItemType.Column) return;
  };

  /**
   * TODO: Fix drag column (first column can not find over index)
   * TODO: Implement drag n drop task card
   * TODO: update database after drag n drop
   */

  const handleDragEnd = (e: DragEndEvent) => {
    const { active, over } = e;

    if (!over) return;
    if (active.id === over.id) return;
    if (activeItem?.type === DragItemType.Card) return;

    const oldIdx = orderColumn.findIndex((c) => c.id === active.id);
    const newIdx = orderColumn.findIndex((c) => c.id === over.id);

    setOrderColumn(arrayMove(orderColumn, oldIdx, newIdx));
    setActiveItem(undefined);
  };

  return (
    <div className="grid h-full auto-cols-[280px] grid-flow-col gap-x-6 overflow-x-auto px-4 py-6">
      <DndContext
        sensors={sensors}
        collisionDetection={closestCorners}
        onDragStart={handleDragStart}
        onDragOver={handleDragOver}
        onDragEnd={handleDragEnd}
      >
        <SortableContext
          items={orderColumn}
          strategy={horizontalListSortingStrategy}
        >
          {orderColumn.map((column) => (
            <ColumnSection key={column.id} column={column} />
          ))}
        </SortableContext>
        <DragOverlay dropAnimation={dropAnimation}>
          {activeItem && activeItem.type === DragItemType.Column && (
            <ColumnSection column={activeItem.data} />
          )}
          {activeItem && activeItem.type === DragItemType.Card && (
            <TaskCard task={activeItem.data} />
          )}
        </DragOverlay>
      </DndContext>

      <Card className="mt-10 flex items-center justify-center bg-gradient-to-b from-[#e9effa] to-[#e9effa]/50 text-muted-foreground dark:from-[#2b2c37] dark:to-[#2b2c37]/50">
        <h1 className="cursor-pointer hover:text-primary">+ New Column</h1>
      </Card>
    </div>
  );
}
