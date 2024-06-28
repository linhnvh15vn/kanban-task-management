"use client";

import React from "react";

import { useModalStore } from "~/store/use-modal-store";
import { type Task } from "~/types";

interface Props {
  task: Task;
}

export default function TaskCard({ task }: Props) {
  const { onOpen } = useModalStore();

  const completedSubtask = task.subtasks?.filter(
    (subtask) => subtask.isCompleted === true,
  ).length;

  return (
    <div
      className="cursor-pointer rounded-lg bg-card px-4 py-6 shadow-md"
      onClick={() => onOpen("TASK_DETAIL", { task })}
    >
      <h3 className="hover:text-primary">{task.title}</h3>
      <p className="text-muted-foreground">
        {`${completedSubtask} of ${task.subtasks?.length} subtasks`}
      </p>
    </div>
  );
}
