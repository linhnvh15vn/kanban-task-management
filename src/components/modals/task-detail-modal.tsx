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

  const {
    type,
    data: { task },
    onOpen,
    onClose,
  } = useModalStore();

  const isVisible = type === "TASK_DETAIL";

  const { data, isLoading } = api.task.getById.useQuery(
    { id: task?.id },
    { enabled: !!task },
  );

  const { data: columnData } = api.board.getBoardColumns.useQuery(
    { id: Number(params.boardId) },
    { enabled: !!task },
  );

  if (isLoading) {
    return <h1>Loading...</h1>;
  }

  return (
    <Dialog open={isVisible} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader className="space-y-6">
          <DialogTitle className="flex items-center justify-between">
            <div>{data?.title}</div>
            <DropdownMenu>
              <DropdownMenuTrigger>
                <EllipsisVertical />
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuItem onClick={() => onOpen("TASK_FORM")}>
                  Edit Task
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => onOpen("DELETE_TASK")}>
                  Delete Task
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </DialogTitle>
          {data?.description && (
            <DialogDescription>{data?.description}</DialogDescription>
          )}
        </DialogHeader>

        {!!data?.subtasks?.length && (
          <div className="space-y-4">
            <h4>Subtasks</h4>
            <div className="space-y-2">
              {data?.subtasks?.map((subtask) => (
                <SubtaskCard key={subtask.id} subtask={subtask} />
              ))}
            </div>
          </div>
        )}

        <div className="space-y-2">
          <Label>Current Status</Label>
          <Select>
            <SelectTrigger className="w-full">
              <SelectValue placeholder={data?.id} />
            </SelectTrigger>
            <SelectContent>
              {columnData?.columns.map((column) => (
                <SelectItem key={column.id} value={column.id.toString()}>
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
