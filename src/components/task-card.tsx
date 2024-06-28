"use client";

import React from "react";

import { useModalStore } from "~/store/use-modal-store";
import { type Task } from "~/types";

interface Props {
  task: Task;
}

export default function TaskCard({ task }: Props) {
  const { onOpen } = useModalStore();

  return (
    <div
      className="cursor-pointer rounded-lg bg-card px-4 py-6 shadow-md"
      onClick={() => onOpen("TASK_DETAIL", { task })}
    >
      <h3>{task.title}</h3>
      <p>0 of 3 subtasks</p>
    </div>
  );
}
