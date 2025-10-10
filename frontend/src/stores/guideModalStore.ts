import { create } from 'zustand';

type ModalType = 'guide' | 'feedback' | null;

interface ModalState {
  modalType: ModalType;
  openGuideModal: () => void;
  openFeedbackModal: () => void;
  closeModal: () => void;
}

export const useModalStore = create<ModalState>((set) => ({
  modalType: null,
  openGuideModal: () => set({ modalType: 'guide' }),
  openFeedbackModal: () => set({ modalType: 'feedback' }),
  closeModal: () => set({ modalType: null }),
}));
