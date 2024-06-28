"use client";

import React from "react";

import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogAction,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogFooter,
} from "~/components/ui/alert-dialog";
import { buttonVariants } from "~/components/ui/button";
import { cn } from "~/lib/utils";
import { useModalStore } from "~/store/use-modal-store";
import { api } from "~/trpc/react";

export default function DeleteBoardModal() {
  const { type, data, onClose } = useModalStore();

  const isVisible = type === "DELETE_BOARD";

  const { mutate: deleteBoard } = api.board.delete.useMutation({
    onSuccess: () => {},
  });

  return (
    <AlertDialog open={isVisible} onOpenChange={onClose}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle className="text-destructive">
            Delete this board?
          </AlertDialogTitle>
          <AlertDialogDescription>
            Are you sure you want to delete the &apos;{data.board?.name}&apos;
            board. This action will remove all columns and tasks and cannot be
            reversed.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogAction
            className={cn("w-full", buttonVariants({ variant: "destructive" }))}
            onClick={() => deleteBoard({ id: data.board?.id })}
          >
            Delete
          </AlertDialogAction>
          <AlertDialogCancel className={cn("w-full")}>Cancel</AlertDialogCancel>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
