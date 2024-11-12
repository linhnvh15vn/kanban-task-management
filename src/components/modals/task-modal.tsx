'use client';

import React from 'react';

import TaskForm from '~/components/forms/task-form';
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

export default function TaskModal() {
  const { type, data, onClose } = useModalStore();

  const isVisible = type === ModalType.TASK;

  return (
    <Dialog open={isVisible} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{data?.task ? 'Edit Task' : 'Add New Task'}</DialogTitle>
          <DialogDescription></DialogDescription>
        </DialogHeader>
        <TaskForm />
        <DialogFooter>
          <Button type="submit" form={ModalType.TASK} className="w-full">
            {data?.task ? 'Save Changes' : 'Create Task'}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
