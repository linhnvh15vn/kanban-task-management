"use client";

import React from "react";

import { useRouter } from "next/navigation";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "~/components/ui/alert-dialog";
import { buttonVariants } from "~/components/ui/button";
import { cn } from "~/lib/utils";
import { useModalStore } from "~/store/use-modal-store";
import { api } from "~/trpc/react";

export default function DeleteTaskModal() {
  const router = useRouter();
  const { type, data, onClose } = useModalStore();

  const isVisible = type === "DELETE_TASK";

  const { mutate: deleteTask } = api.task.delete.useMutation({
    onSuccess: () => {
      onClose();
      router.refresh();
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
            className={cn("w-full", buttonVariants({ variant: "destructive" }))}
            onClick={() => deleteTask({ id: data.task!.id })}
          >
            Delete
          </AlertDialogAction>
          <AlertDialogCancel
            className={cn("w-full", buttonVariants({ variant: "secondary" }))}
          >
            Cancel
          </AlertDialogCancel>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
