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

export default function InitialModal() {
  return (
    <Dialog open>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add New Board</DialogTitle>
        </DialogHeader>
        <BoardForm />
        <DialogFooter>
          <Button type="submit" form="board-form" className="w-full">
            Create New Board
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
