import { create } from "zustand";

import { type Board, type Task } from "~/types";

type ModalType =
  | "TASK_DETAIL"
  | "DELETE_TASK"
  | "DELETE_BOARD"
  | "TASK_FORM"
  | "BOARD_FORM";

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
