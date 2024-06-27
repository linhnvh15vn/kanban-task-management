import { create } from "zustand";

type ModalType =
  | "TASK_DETAIL"
  | "DELETE_TASK"
  | "DELETE_BOARD"
  | "TASK_FORM"
  | "BOARD_FORM";

interface ModalData {
  task?: any;
  board?: any;
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
  onOpen: (type, data) => set({ type, data }),
  onClose: () => set({ type: null }),
}));
