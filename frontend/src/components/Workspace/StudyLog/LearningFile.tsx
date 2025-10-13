import GuideModal from '@/components/Home/GuideModal';
import SelectedFileItem from '@/components/Workspace/LearningFileUpload/SelectedFileItem';
import ChatBubble from '@/components/Workspace/StudyLog/ChatBubble';
import useModal from '@/hooks/common/useModal';
interface LearningFileProps {
  fileName: string;
}

const LearningFile = ({ fileName }: LearningFileProps) => {
  const { isModalOpen, openModal, closeModal } = useModal()
  return (
    <div className="w-[70%] lg:w-[60%]">
      <ChatBubble isUser={true}>
        <div className="w-64">
          <SelectedFileItem fileName="학습자료" content={fileName} />
        </div>
      </ChatBubble>

      <ChatBubble isUser={false}>
        <p>
          학습 과정 중 막히는 부분이 있다면 ‘키워드 확인하기' 를 이용해주세요!
        </p>
        <p>백지 학습시에는 2분할로 나눠서 작성해주세요.</p>
        <p>자세한 예시는{' '}
          <span onClick={openModal} className="font-medium hover:text-primary-600 cursor-pointer transition">
            'Tabula 사용법 알아보기'
          </span>
          {' '}를 참고해주세요 ☺️
        </p>
        <br />
        <p>이제 학습 결과물을 올려볼까요?✨</p>
        <p>또렷한 글씨, 스캔본·전자 필기본일수록 인식률이 높아집니다.</p>
      </ChatBubble>

      {isModalOpen && <GuideModal isModalOpen={isModalOpen} closeModal={closeModal}/>}
    </div>
  );
};

export default LearningFile;
