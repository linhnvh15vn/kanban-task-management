'use client';

import React from 'react';

import BoardForm from '~/components/forms/board-form';
import { Button } from '~/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '~/components/ui/dialog';
import { ModalType } from '~/enums';
import { useModalStore } from '~/store/use-modal-store';

export default function BoardModal() {
  const { type, data, onClose } = useModalStore();
  const isVisible = type === ModalType.BOARD;

  return (
    <Dialog open={isVisible} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            {data.board ? 'Edit Board' : 'Add New Board'}
          </DialogTitle>
          <DialogDescription></DialogDescription>
        </DialogHeader>
        <BoardForm />
        <DialogFooter>
          <Button type="submit" form={ModalType.BOARD} className="w-full">
            {data.board ? 'Saves Changes' : 'Create New Board'}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
