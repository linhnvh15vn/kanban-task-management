'use client';

import React from 'react';

import { useParams, useRouter } from 'next/navigation';

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '~/components/ui/alert-dialog';
import { buttonVariants } from '~/components/ui/button';
import { ModalType } from '~/enums';
import { useToast } from '~/hooks/use-toast';
import { cn } from '~/lib/utils';
import { useModalStore } from '~/store/use-modal-store';
import { api } from '~/trpc/react';
import { type Params } from '~/types';

export default function DeleteTaskModal() {
  const params = useParams<Params>();
  const router = useRouter();
  const { toast } = useToast();
  const utils = api.useUtils();
  const { type, data, onClose } = useModalStore();

  const isVisible = type === ModalType.DEL_TASK;

  const { mutate: deleteTask } = api.task.delete.useMutation({
    onSuccess: () => toast({ title: 'Task deleted successfully!' }),
    onError: () =>
      toast({ variant: 'destructive', title: 'Failed to delete task!' }),
    onSettled: () => {
      void utils.board.getById.invalidate({ id: params.boardId });
      onClose();
      router.back();
    },
  });

  return (
    <AlertDialog open={isVisible} onOpenChange={onClose}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle className="text-destructive">
            Delete this task?
          </AlertDialogTitle>
          <AlertDialogDescription>
            Are you sure you want to delete the &apos;{data.task?.title}&apos;
            task and its subtasks? This action cannot be reversed.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogAction
            className={cn('w-full', buttonVariants({ variant: 'destructive' }))}
            onClick={() => deleteTask({ id: data.task!.id })}
          >
            Delete
          </AlertDialogAction>
          <AlertDialogCancel
            className={cn('w-full', buttonVariants({ variant: 'secondary' }))}
          >
            Cancel
          </AlertDialogCancel>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
