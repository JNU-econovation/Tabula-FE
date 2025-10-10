import { useModalStore } from '@/stores/guideModalStore';

interface ProgressbarProps {
  percent: number;
}

const ProgressBar = ({ percent }: ProgressbarProps) => {
  const { openGuideModal } = useModalStore();
  return (
    <div className="w-full max-w-md flex flex-col gap-5 justify-center items-center">
      <span className="text-md text-gray-700 flex gap-3">
        <p>현재 {percent}% 완료했어요 !</p>
        <span className="relative flex size-3 ">
          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-gray-400 opacity-75"></span>
          <span className="relative inline-flex size-3 rounded-full  bg-gray-400"></span>
        </span>
      </span>

      <div className="w-full bg-gray-200 rounded-full h-6">
        <div
          className="h-6 rounded-full transition-all duration-300 ease-in-out relative bg-gradient-to-r from-primary-600 to-secondary-500"
          style={{ width: `${percent}%` }}
        >
          <div className="absolute inset-0 rounded-full shadow-xl shadow-primary-200"></div>
        </div>
      </div>
      <span className="text-md text-gray-600 flex flex-col items-center gap-3 mt-7">
        <p> 일단 키워드를 보지 않고 백지 학습을 시작해보세요! 📝</p>
        <div className="flex gap-1">
          시작 전에 상단의
          <div
            className="cursor-pointer font-bold underline"
            onClick={openGuideModal}
          >
            'Tabula 사용법 알아보기'
          </div>
          를 읽고 작성해주세요.
        </div>
      </span>
    </div>
  );
};

export default ProgressBar;
