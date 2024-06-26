import React from "react";

import TaskCard from "~/components/task-card";

interface Props {
  column: any;
}

export default function ColumnSection({ column }: Props) {
  return (
    <section className="flex flex-col gap-6">
      <div className="flex items-center gap-3">
        <div className="size-4 rounded-full bg-blue-300" />
        <h4 className="text-muted-foreground">{column.name}</h4>
      </div>
      <div className="space-y-5">
        {column.tasks.map((task) => (
          <TaskCard key={task.id} task={task} />
        ))}
      </div>
    </section>
  );
}
