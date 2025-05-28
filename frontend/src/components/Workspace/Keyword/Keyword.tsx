import Modal from '@/components/common/Modal/Modal';
import Toggle from '@/components/common/Toggle/Toggle';
import useModal from '@/hooks/common/useModal';
import { useState } from 'react';

const Keyword = () => {
  const [isToggleOn, setIsToggleOn] = useState(false);
  const { isModalOpen, openModal, closeModal } = useModal();
  const handleToggle = () => {
    setIsToggleOn(!isToggleOn);
    openModal();
  };

  const close = () => {
    setIsToggleOn(false);
    closeModal();
  };

  return (
    <>
      <div className="fixed top-20 z-50 flex gap-2 items-center justify-center h-10 bg-primary-300 rounded-4xl px-6 shadow-lg">
        <p className="text-white">키워드 확인하기</p>
        <Toggle handleToggle={handleToggle} isToggleOn={isToggleOn} />
      </div>
      <Modal isOpen={isModalOpen} close={close}>
        <div>키워드</div>
      </Modal>
    </>
  );
};

export default Keyword;
