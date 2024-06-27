"use client";

import React from "react";

import { Button } from "~/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogDescription,
  DialogHeader,
  DialogFooter,
} from "~/components/ui/dialog";
import { useModalStore } from "~/store/use-modal-store";

export default function DeleteBoardModal() {
  const { type, data, onClose } = useModalStore();

  const isVisible = type === "DELETE_BOARD";

  return (
    <Dialog open={isVisible} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="text-destructive">
            Delete this board
          </DialogTitle>
          <DialogDescription>
            Are you sure you want to delete the &apos;{data.board?.name}&apos;
            board. This action will remove all columns and tasks and cannot be
            reversed.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <Button variant="destructive" className="w-full">
            Delete
          </Button>
          <Button variant="secondary" className="w-full" onClick={onClose}>
            Cancel
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
