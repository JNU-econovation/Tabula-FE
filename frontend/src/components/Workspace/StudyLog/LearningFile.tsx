import SelectedFileItem from '@/components/Workspace/LearningFileUpload/SelectedFileItem';
import ChatBubble from '@/components/Workspace/StudyLog/ChatBubble';

interface LearningFileProps {
  fileName: string;
}

const LearningFile = ({ fileName }: LearningFileProps) => {
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
        <p>자세한 예시는 'Tabula 사용법 알아보기'를 참고해주세요 ☺️</p>
      </ChatBubble>
    </div>
  );
};

export default LearningFile;
