import { create } from 'zustand';

import { type ModalType } from '~/enums';
import { type Board, type Task } from '~/types';

interface ModalData {
  task?: Task;
  board?: Board;
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
