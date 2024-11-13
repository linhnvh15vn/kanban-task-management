'use client';

import React from 'react';

import { useRouter } from 'next/navigation';

import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from '~/components/ui/card';
import { type Task } from '~/types';

interface Props {
  task: Task;
}

export default function TaskCard({ task }: Props) {
  const router = useRouter();

  const getDescription = () => {
    const total = task.subtasks?.length;
    const done = task.subtasks?.filter((subtask) => subtask.isCompleted).length;

    return `${done} of ${total} subtasks`;
  };

  return (
    <Card
      className="cursor-pointer"
      onClick={() => router.push(`/tasks/${task.id}`)}
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
