"use client";

import React from "react";

import BoardForm from "~/components/forms/board-form";
import { Button } from "~/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "~/components/ui/dialog";
import { useModalStore } from "~/store/use-modal-store";

export default function BoardModal() {
  const { type, data, onClose } = useModalStore();

  const isVisible = type === "BOARD_FORM";

  return (
    <Dialog open={isVisible} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            {data.board ? "Edit Board" : "Add New Board"}
          </DialogTitle>
        </DialogHeader>
        <BoardForm />
        <DialogFooter>
          <Button type="submit" form="board-form" className="w-full">
            {data.board ? "Saves Changes" : "Create New Board"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
