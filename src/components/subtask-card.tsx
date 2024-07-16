"use client";

import React, { useState } from "react";

import { useRouter } from "next/navigation";

import { Checkbox } from "~/components/ui/checkbox";
import { Label } from "~/components/ui/label";
import { cn } from "~/lib/utils";
import { api } from "~/trpc/react";
import { type Subtask } from "~/types";

interface Props {
  subtask: Subtask;
}

export default function SubtaskCard({ subtask }: Props) {
  const router = useRouter();
  const [isCompleted, setIsCompleted] = useState(subtask.isCompleted);

  const { mutate: changeStatus } = api.subtask.changeStatus.useMutation({
    onSuccess: (data) => {
      setIsCompleted(data.isCompleted);
      router.refresh();
    },
  });

  const handleChangeStatus = () => {
    changeStatus({ id: subtask.id, isCompleted: !isCompleted });
  };

  return (
    <div
      className={cn(
        "flex cursor-pointer items-center gap-4 rounded bg-background p-3 hover:bg-secondary-hover",
        isCompleted ? "text-muted-foreground line-through" : "",
      )}
    >
      <Checkbox
        defaultChecked={isCompleted}
        checked={isCompleted}
        onCheckedChange={handleChangeStatus}
      />
      <Label className="text-xs font-bold">{subtask.title}</Label>
    </div>
  );
}
