'use client';

import { EllipsisVertical } from 'lucide-react';
import { useRouter } from 'next/navigation';

import SubtaskCard from '~/components/subtask-card';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '~/components/ui/dialog';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '~/components/ui/dropdown-menu';
import { Label } from '~/components/ui/label';
import { Select, SelectTrigger, SelectValue } from '~/components/ui/select';
import { ModalType } from '~/enums';
import { useModalStore } from '~/store/use-modal-store';
import { type GetTaskById } from '~/types';

interface Props {
  task: GetTaskById;
}

export default function TaskDetailModal({ task }: Props) {
  const router = useRouter();

  const { onOpen } = useModalStore();

  const total = task.subtasks.length;
  const done = task.subtasks.filter((subtask) => subtask.isCompleted).length;

  return (
    <Dialog open onOpenChange={() => router.back()}>
      <DialogContent aria-describedby={undefined}>
        <DialogHeader className="space-y-6">
          <DialogTitle className="flex items-center justify-between gap-6">
            {task.title}
            <DropdownMenu>
              <DropdownMenuTrigger>
                <EllipsisVertical className="text-muted-foreground" />
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuItem
                  onClick={() => onOpen(ModalType.TASK, { task })}
                >
                  Edit Task
                </DropdownMenuItem>
                <DropdownMenuItem
                  className="text-destructive"
                  onClick={() => onOpen(ModalType.DEL_TASK, { task })}
                >
                  Delete Task
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </DialogTitle>
          {task.description && (
            <DialogDescription>{task.description}</DialogDescription>
          )}
        </DialogHeader>

        {!!task.subtasks.length && (
          <div className="space-y-4">
            <h3 className="text-muted-foreground">
              Subtasks {done} of {total}
            </h3>
            <div className="space-y-2">
              {task.subtasks.map((subtask) => (
                <SubtaskCard key={subtask.id} subtask={subtask} />
              ))}
            </div>
          </div>
        )}

        <div className="space-y-2">
          <Label>
            <h3 className="text-muted-foreground">Current Status</h3>
          </Label>
          <Select disabled>
            <SelectTrigger className="w-full">
              <SelectValue placeholder={task?.column.name} />
            </SelectTrigger>
          </Select>
        </div>
      </DialogContent>
    </Dialog>
  );
}
