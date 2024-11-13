import React from 'react';

import dynamic from 'next/dynamic';

import { api } from '~/trpc/server';

const TaskDetailModal = dynamic(
  () => import('~/components/modals/task-detail-modal'),
  { ssr: false },
);

interface Props {
  params: {
    taskId: string;
  };
}

export default async function Page({ params }: Props) {
  const task = await api.task.getById({ id: params.taskId });

  return <TaskDetailModal task={task} />;
}
