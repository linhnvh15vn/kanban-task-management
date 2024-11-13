'use client';

import React from 'react';

import { SquareKanban } from 'lucide-react';

import { ModalType } from '~/enums';
import { useModalStore } from '~/store/use-modal-store';

export default function NavigationCreateButton() {
  const { onOpen } = useModalStore();

  return (
    <div
      className="flex h-12 cursor-pointer items-center gap-3 rounded-e-full px-6 text-primary hover:bg-secondary hover:text-primary"
      onClick={() => onOpen(ModalType.BOARD)}
    >
      <SquareKanban />
      <h3>+ Create New Board</h3>
    </div>
  );
}
