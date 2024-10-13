import { create } from 'zustand';

interface ModalState {
  infoModalVisible: boolean;
  setInfoModalVisible: (isVisible: boolean) => void;
}

export const useModalStore = create<ModalState>((set) => ({
  infoModalVisible: false,
  setInfoModalVisible: (isVisible) => set({ infoModalVisible: isVisible })
}));
