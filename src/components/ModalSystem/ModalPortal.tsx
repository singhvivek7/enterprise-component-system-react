import { useRef, useEffect, useCallback } from 'react';
import { createPortal } from 'react-dom';
import { X } from 'lucide-react';
import { Modal } from './types';
import { cn } from '@/lib/utils';
import { useModalStore } from '@/stores/modalStore';
import { Button } from '@/components/ui/button';

interface ModalPortalProps extends Modal {
  index: number;
}

const ModalPortal = ({
  id,
  title,
  content,
  width = 400,
  height = 300,
  x = 100,
  y = 100,
  animation = 'fade',
  index,
}: ModalPortalProps) => {
  const { closeModal, updateModal } = useModalStore();
  const modalRef = useRef<HTMLDivElement>(null);
  const dragRef = useRef<HTMLDivElement>(null);
  const resizeRef = useRef<HTMLDivElement>(null);
  const lastFocusedElement = useRef<HTMLElement | null>(null);

  useEffect(() => {
    lastFocusedElement.current = document.activeElement as HTMLElement;

    const modalRoot = document.getElementById('modal-root');
    if (!modalRoot) {
      console.error('Modal root element not found. Creating one...');
      const root = document.createElement('div');
      root.id = 'modal-root';
      document.body.appendChild(root);
    }

    if (modalRef.current) {
      const focusableElements = modalRef.current.querySelectorAll(
        'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
      );

      if (focusableElements.length > 0) {
        const firstElement = focusableElements[0] as HTMLElement;
        firstElement?.focus();

        const handleKeyDown = (e: KeyboardEvent) => {
          if (e.key === 'Escape') {
            closeModal(id);
          }
          if (e.key === 'Tab') {
            const lastElement = focusableElements[
              focusableElements.length - 1
            ] as HTMLElement;
            if (e.shiftKey && document.activeElement === firstElement) {
              e.preventDefault();
              lastElement.focus();
            } else if (!e.shiftKey && document.activeElement === lastElement) {
              e.preventDefault();
              firstElement.focus();
            }
          }
        };

        modalRef.current.addEventListener('keydown', handleKeyDown);
        return () => {
          modalRef.current?.removeEventListener('keydown', handleKeyDown);
          lastFocusedElement.current?.focus();
        };
      }
    }
  }, [id, closeModal]);

  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = '';
    };
  }, []);

  const handleDragStart = useCallback(
    (e: React.MouseEvent | React.TouchEvent) => {
      e.preventDefault();
      e.stopPropagation();
      const startX = 'touches' in e ? e.touches[0].clientX : e.clientX;
      const startY = 'touches' in e ? e.touches[0].clientY : e.clientY;
      const initialX = x;
      const initialY = y;

      const handleDrag = (moveEvent: MouseEvent | TouchEvent) => {
        moveEvent.preventDefault();
        const clientX =
          'touches' in moveEvent
            ? moveEvent.touches[0].clientX
            : moveEvent.clientX;
        const clientY =
          'touches' in moveEvent
            ? moveEvent.touches[0].clientY
            : moveEvent.clientY;
        const newX = initialX + (clientX - startX);
        const newY = initialY + (clientY - startY);

        const maxX = window.innerWidth - width / 2;
        const maxY = window.innerHeight - 50;
        updateModal(id, {
          x: Math.max(-(width / 3), Math.min(maxX, newX)),
          y: Math.max(0, Math.min(maxY, newY)),
        });
      };

      const handleDragEnd = () => {
        window.removeEventListener('mousemove', handleDrag);
        window.removeEventListener('touchmove', handleDrag);
        window.removeEventListener('mouseup', handleDragEnd);
        window.removeEventListener('touchend', handleDragEnd);
      };

      window.addEventListener('mousemove', handleDrag);
      window.addEventListener('touchmove', handleDrag);
      window.addEventListener('mouseup', handleDragEnd);
      window.addEventListener('touchend', handleDragEnd);
    },
    [id, x, y, width, updateModal]
  );

  const handleResizeStart = useCallback(
    (e: React.MouseEvent | React.TouchEvent) => {
      e.preventDefault();
      e.stopPropagation();
      const startX = 'touches' in e ? e.touches[0].clientX : e.clientX;
      const startY = 'touches' in e ? e.touches[0].clientY : e.clientY;
      const initialWidth = width;
      const initialHeight = height;

      const handleResize = (moveEvent: MouseEvent | TouchEvent) => {
        moveEvent.preventDefault();
        const clientX =
          'touches' in moveEvent
            ? moveEvent.touches[0].clientX
            : moveEvent.clientX;
        const clientY =
          'touches' in moveEvent
            ? moveEvent.touches[0].clientY
            : moveEvent.clientY;
        const newWidth = initialWidth + (clientX - startX);
        const newHeight = initialHeight + (clientY - startY);
        updateModal(id, {
          width: Math.max(200, Math.min(window.innerWidth, newWidth)),
          height: Math.max(150, Math.min(window.innerHeight, newHeight)),
        });
      };

      const handleResizeEnd = () => {
        window.removeEventListener('mousemove', handleResize);
        window.removeEventListener('touchmove', handleResize);
        window.removeEventListener('mouseup', handleResizeEnd);
        window.removeEventListener('touchend', handleResizeEnd);
      };

      window.addEventListener('mousemove', handleResize);
      window.addEventListener('touchmove', handleResize);
      window.addEventListener('mouseup', handleResizeEnd);
      window.addEventListener('touchend', handleResizeEnd);
    },
    [id, width, height, updateModal]
  );

  const modalRoot =
    typeof document !== 'undefined'
      ? document.getElementById('modal-root')
      : null;
  if (!modalRoot) {
    return null;
  }

  return createPortal(
    <div
      className={cn(
        'fixed inset-0 bg-black/50 backdrop-blur-sm z-[1000]',
        index > 0 && 'bg-black/30'
      )}
      style={{ zIndex: 1000 + index * 10 }}
      onClick={() => closeModal(id)}
      role="presentation">
      <div
        ref={modalRef}
        className={cn(
          'absolute bg-background border border-border rounded-lg shadow-lg overflow-hidden',
          animation === 'fade' && 'animate-in fade-in-0',
          animation === 'slide' && 'animate-in slide-in-from-top-5',
          animation === 'scale' && 'animate-in zoom-in-95',
          index > 0 && 'scale-95'
        )}
        style={{
          width,
          height,
          top: y,
          left: x,
          zIndex: 1000 + index * 10 + 1,
          transformOrigin: 'center center',
        }}
        role="dialog"
        aria-modal="true"
        aria-labelledby={`${id}-title`}
        onClick={e => e.stopPropagation()}>
        <div
          ref={dragRef}
          className="flex items-center justify-between p-4 border-b border-border bg-muted cursor-move select-none"
          onMouseDown={handleDragStart}
          onTouchStart={handleDragStart}>
          <h2 id={`${id}-title`} className="text-lg font-semibold">
            {title}
          </h2>
          <Button
            size="icon"
            className="cursor-pointer"
            onClick={() => closeModal(id)}
            aria-label="Close modal">
            <X size={18} />
          </Button>
        </div>
        <div
          className="p-4 overflow-auto"
          style={{ height: `calc(${height}px - 80px)` }}>
          {content}
        </div>
        <div
          ref={resizeRef}
          className="absolute bottom-0 right-0 w-6 h-6 cursor-se-resize flex items-center justify-center"
          onMouseDown={handleResizeStart}
          onTouchStart={handleResizeStart}
          aria-hidden="true">
          <div className="w-3 h-3 bg-border rounded-sm transform rotate-45" />
        </div>
      </div>
    </div>,
    modalRoot
  );
};

export default ModalPortal;
