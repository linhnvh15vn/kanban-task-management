import { create } from 'zustand';

import { type ModalType } from '~/enums';
import { type GetTaskById, type GetBoardById } from '~/types';

interface ModalData {
  task?: GetTaskById;
  board?: GetBoardById;
}

interface ModalStore {
  type: ModalType | null;
  data: ModalData;
  onOpen: (type: ModalType, data?: ModalData) => void;
  onClose: () => void;
}

export const useModalStore = create<ModalStore>((set) => ({
  type: null,
  data: {},
  onOpen: (type, data = {}) => set({ type, data }),
  onClose: () => set({ type: null }),
}));
