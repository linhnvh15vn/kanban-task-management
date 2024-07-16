"use client";

import React from "react";

import { EllipsisVertical } from "lucide-react";
import { useParams } from "next/navigation";

import SubtaskCard from "~/components/subtask-card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "~/components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "~/components/ui/dropdown-menu";
import { Label } from "~/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "~/components/ui/select";
import { useModalStore } from "~/store/use-modal-store";
import { api } from "~/trpc/react";

export default function TaskDetailModal() {
  const params = useParams();
  const { type, data, onOpen, onClose } = useModalStore();

  const isVisible = type === "TASK_DETAIL";

  const { data: columnData } = api.board.getBoardColumns.useQuery(
    { id: params.boardId as string },
    { enabled: !!data.task },
  );

  const getRemainingSubtask = () => {
    const total = data.task?.subtasks?.length;
    const done = data.task?.subtasks?.filter((st) => st.isCompleted).length;

    return `Subtasks (${done} of ${total})`;
  };

  return (
    <Dialog open={isVisible} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader className="space-y-6">
          <DialogTitle className="flex items-center justify-between gap-6">
            {data.task?.title}
            <DropdownMenu>
              <DropdownMenuTrigger>
                <EllipsisVertical className="text-muted-foreground" />
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuItem
                  onClick={() => onOpen("TASK_FORM", { task: data.task })}
                >
                  Edit Task
                </DropdownMenuItem>
                <DropdownMenuItem
                  className="text-destructive"
                  onClick={() => onOpen("DELETE_TASK", { task: data.task })}
                >
                  Delete Task
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </DialogTitle>
          {data.task?.description && (
            <DialogDescription>{data.task.description}</DialogDescription>
          )}
        </DialogHeader>

        {!!data.task?.subtasks?.length && (
          <div className="space-y-4">
            <h3 className="text-muted-foreground">{getRemainingSubtask()}</h3>
            <div className="space-y-2">
              {data.task?.subtasks?.map((subtask) => (
                <SubtaskCard key={subtask.id} subtask={subtask} />
              ))}
            </div>
          </div>
        )}

        <div className="space-y-2">
          <Label>
            <h3 className="text-muted-foreground">Current Status</h3>
          </Label>
          <Select>
            <SelectTrigger className="w-full">
              <SelectValue placeholder={data.task?.column!.name} />
            </SelectTrigger>
            <SelectContent>
              {columnData?.columns.map((column) => (
                <SelectItem key={column.id} value={column.id}>
                  {column.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </DialogContent>
    </Dialog>
  );
}
