import React from "react";

import { Checkbox } from "~/components/ui/checkbox";
import { Label } from "~/components/ui/label";
import { type Subtask } from "~/types";

interface Props {
  subtask: Subtask;
}

export default function SubtaskCard({ subtask }: Props) {
  return (
    <div className="flex items-center gap-4 bg-background p-3">
      <Checkbox
        defaultChecked={subtask.isCompleted}
        checked={subtask.isCompleted}
      />
      <Label>{subtask.title}</Label>
    </div>
  );
}
