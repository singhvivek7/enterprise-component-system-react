import ModalSystem from '@/components/ModalSystem/ModalSystem';
import { useModal } from '@/stores/modalStore';
import { Button } from '@/components/ui/button';

export const ModalSystemDemo = () => {
  const { openModal } = useModal();

  const handleOpenModal = (animation: 'fade' | 'slide' | 'scale') => {
    openModal({
      title: `Modal with ${animation} animation`,
      content: (
        <div>
          <p>This is a modal with {animation} animation.</p>
          <Button
            className="cursor-pointer mt-2"
            onClick={() =>
              openModal({
                title: 'Nested Modal',
                content: <p>Nested modal content.</p>,
                animation: 'scale',
              })
            }>
            Open Nested Modal
          </Button>
        </div>
      ),
      width: 400,
      height: 300,
      x: 100,
      y: 100,
      animation,
    });
  };

  return (
    <ModalSystem>
      <h2 className="text-center text-4xl mt-12 mb-6">2. Modal System</h2>
      <div className="flex justify-center flex-col items-center gap-5">
        <Button
          className="cursor-pointer"
          onClick={() => handleOpenModal('fade')}>
          Open Fade Modal
        </Button>
        <Button
          className="cursor-pointer"
          onClick={() => handleOpenModal('slide')}>
          Open Slide Modal
        </Button>
        <Button
          className="cursor-pointer"
          onClick={() => handleOpenModal('scale')}>
          Open Scale Modal
        </Button>
      </div>
    </ModalSystem>
  );
};
