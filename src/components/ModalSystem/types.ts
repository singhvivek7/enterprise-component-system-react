import { ReactNode } from 'react';

export interface Modal {
  id: string;
  title: string;
  content: ReactNode;
  width?: number;
  height?: number;
  x?: number;
  y?: number;
  animation?: 'fade' | 'slide' | 'scale';
}

export interface ModalSystemProps {
  children: ReactNode;
}

export interface UseModal {
  openModal: (modal: Omit<Modal, 'id'>) => string;
  closeModal: (id: string) => void;
  closeAllModals: () => void;
}
