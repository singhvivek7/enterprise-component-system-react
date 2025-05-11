import { create } from 'zustand';
import { Modal } from '@/components/ModalSystem/types';
import { v4 as uuidv4 } from 'uuid';

interface ModalState {
  modals: Modal[];
  openModal: (modal: Omit<Modal, 'id'>) => string;
  closeModal: (id: string) => void;
  updateModal: (id: string, updates: Partial<Modal>) => void;
  closeAllModals: () => void;
}

export const useModalStore = create<ModalState>(set => ({
  modals: [],
  openModal: modal => {
    const id = uuidv4();
    set(state => ({
      modals: [...state.modals, { id, ...modal }],
    }));
    return id;
  },
  closeModal: id => {
    set(state => ({
      modals: state.modals.filter(modal => modal.id !== id),
    }));
  },
  updateModal: (id, updates) => {
    set(state => ({
      modals: state.modals.map(modal =>
        modal.id === id ? { ...modal, ...updates } : modal
      ),
    }));
  },
  closeAllModals: () => {
    set({ modals: [] });
  },
}));

export const useModal = () => {
  const { openModal, closeModal, closeAllModals } = useModalStore();
  return { openModal, closeModal, closeAllModals };
};
