import SelectedFileItem from '@/components/Workspace/LearningFileUpload/SelectedFileItem';
import ChatBubble from '@/components/Workspace/StudyLog/ChatBubble';

interface LearningFileProps {
  fileName: string;
}

const LearningFile = ({ fileName }: LearningFileProps) => {
  return (
    <div className="w-[60%]">
      <ChatBubble isUser={true}>
        <div className="w-64">
          <SelectedFileItem fileName="학습자료" content={fileName} />
        </div>
      </ChatBubble>

      <ChatBubble isUser={false}>
        <p>
          학습 과정 중 막히는 부분이 있다면 ‘키워드 확인하기' 를 이용해주세요!
        </p>
        <p>모르는 부분에 ㅁ 표시를 하면 채점의 정확도를 높일 수 있어요 ☺️</p>
      </ChatBubble>
    </div>
  );
};

export default LearningFile;
