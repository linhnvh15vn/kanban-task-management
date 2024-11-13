'use client';

import React from 'react';

import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from '~/components/ui/card';
import { ModalType } from '~/enums';
import { useModalStore } from '~/store/use-modal-store';
import { type Task } from '~/types';

interface Props {
  task: Task;
}

export default function TaskCard({ task }: Props) {
  const { onOpen } = useModalStore();

  const getDescription = () => {
    const total = task.subtasks?.length;
    const done = task.subtasks?.filter((subtask) => subtask.isCompleted).length;

    return `${done} of ${total} subtasks`;
  };

  return (
    <Card
      className="cursor-pointer"
      onClick={() => onOpen(ModalType.VIEW_TASK, { task })}
    >
      <CardHeader>
        <CardTitle className="text-sm font-bold hover:text-primary">
          {task.title}
        </CardTitle>
        <CardDescription className="text-xs font-bold">
          {getDescription()}
        </CardDescription>
      </CardHeader>
    </Card>
  );
}
