import Modal from '@/components/common/Modal/Modal';
import useModal from '@/hooks/common/useModal';
import Image from 'next/image';
import { useState } from 'react';
import Starbucks from '../../../assets/starbucks.png';

const PopupModal = () => {
  const { isModalOpen, closeModal } = useModal(true);
  const [dontShowAgain, setDontShowAgain] = useState(false);

  const hasSeen = localStorage.getItem('tabula_feedback_seen');
  if (hasSeen) return null;

  const dontShowClose = () => {
    if (dontShowAgain) {
      localStorage.setItem('tabula_feedback_seen', '1');
    }
    closeModal();
  };

  return (
    <Modal isOpen={isModalOpen} close={closeModal} size="xl" isXButton={false}>
      <div className="relative flex flex-col h-full text-center">
        <div className="flex-1 flex flex-col gap-8 overflow-y-auto p-6 sm:p-8">
          <div className="flex flex-col gap-4">
            <h3 className="text-2xl sm:text-3xl font-bold text-indigo-600">
              🚀 지금은 서비스 운영 기간입니다!
            </h3>
            <p className="text-slate-700 dark:text-slate-200 text-base sm:text-lg">
              타뷸라를 더 좋은 서비스로 만들기 위해{' '}
              <span className="font-semibold ">여러분의 피드백</span>이 꼭
              필요해요.
            </p>
            <p className="text-slate-700 dark:text-slate-200 text-base sm:text-lg">
              이용 후 상단의{' '}
              <span className="font-bold ">“서비스 의견 남기러 가기”</span>{' '}
              버튼을 통해 의견을 남겨주세요!
            </p>
          </div>
        </div>
        <div className="flex justify-center">
          <Image src={Starbucks} alt="스타벅스 쿠폰" />
        </div>

        <div className="sticky bottom-0 left-0 w-full bg-white dark:bg-slate-800 border-t border-slate-200 dark:border-slate-700 p-4 sm:p-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <label className="inline-flex items-center gap-2 text-sm text-slate-500 dark:text-slate-300">
            <input
              type="checkbox"
              checked={dontShowAgain}
              onChange={(e) => setDontShowAgain(e.target.checked)}
              className="w-4 h-4 rounded border-slate-300"
            />
            다시 보지 않기
          </label>

          <button
            onClick={dontShowClose}
            className="cursor-pointer px-5 py-2.5 rounded-xl bg-indigo-600 text-white font-semibold shadow hover:shadow-md hover:bg-indigo-700 transition"
          >
            닫기
          </button>
        </div>
      </div>
    </Modal>
  );
};

export default PopupModal;
