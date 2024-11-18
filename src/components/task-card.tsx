'use client';

import React from 'react';

import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { useRouter } from 'next/navigation';

import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from '~/components/ui/card';
import { DragItemType } from '~/enums';
import { type Task } from '~/types';

interface Props {
  task: Task;
}

export default function TaskCard({ task }: Props) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({
    id: task.id,
    data: { ...task, type: DragItemType.Card },
  });

  const style = {
    transform: CSS.Translate.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
  };

  const router = useRouter();

  const getDescription = () => {
    const total = task.subtasks?.length;
    const done = task.subtasks?.filter((subtask) => subtask.isCompleted).length;

    return `${done} of ${total} subtasks`;
  };

  const handleTitleClick = (e: React.MouseEvent) => {
    e.stopPropagation(); // Prevent the click from triggering the drag-and-drop
    e.preventDefault();
    router.push(`/tasks/${task.id}`);
  };

  return (
    <Card
      ref={setNodeRef}
      {...attributes}
      {...listeners}
      style={style}
      className="cursor-pointer"
      onClick={() => router.push(`/tasks/${task.id}`)}
    >
      <CardHeader>
        <CardTitle
          className="text-sm font-bold hover:text-primary"
          onClick={handleTitleClick}
        >
          {task.title}
        </CardTitle>
        <CardDescription className="text-xs font-bold">
          {getDescription()}
        </CardDescription>
      </CardHeader>
    </Card>
  );
}
