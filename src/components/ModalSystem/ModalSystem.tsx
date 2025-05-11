import { useEffect } from 'react';
import { useModalStore } from '@/stores/modalStore';
import ModalPortal from './ModalPortal';
import { ModalSystemProps } from './types';

const ModalSystem = ({ children }: ModalSystemProps) => {
  const { modals } = useModalStore();

  useEffect(() => {
    if (typeof window !== 'undefined') {
      let modalRoot = document.getElementById('modal-root');
      if (!modalRoot) {
        modalRoot = document.createElement('div');
        modalRoot.id = 'modal-root';
        document.body.appendChild(modalRoot);
      }
    }
  }, []);

  return (
    <div className="px-10">
      {children}
      {modals.map((modal, index) => (
        <ModalPortal key={modal.id} {...modal} index={index} />
      ))}
    </div>
  );
};

export default ModalSystem;
