'use client';

import React from 'react';

import BoardForm from '~/components/forms/board-form';
import { Button } from '~/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '~/components/ui/dialog';
import { ModalType } from '~/enums';

export default function InitialModal() {
  return (
    <Dialog open>
      <DialogContent aria-describedby={undefined}>
        <DialogHeader>
          <DialogTitle>Add New Board</DialogTitle>
        </DialogHeader>
        <BoardForm />
        <DialogFooter>
          <Button type="submit" form={ModalType.BOARD} className="w-full">
            Create New Board
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
