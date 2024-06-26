import React from "react";

interface Props {
  task: any;
}

export default function TaskCard({ task }: Props) {
  return (
    <div className="rounded-lg bg-white px-4 py-6 shadow-md">
      <h3>{task.title}</h3>
      <p>0 of 3 subtasks</p>
    </div>
  );
}
