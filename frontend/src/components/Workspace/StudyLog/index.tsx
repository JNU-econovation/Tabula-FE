import SelectedFileItem from '@/components/Workspace/LearningFileUpload/SelectedFileItem';
import LearningResultUpload from '@/components/Workspace/LearningResultUpload/LearningResultUpload';
import ChatBubble from '@/components/Workspace/StudyLog/ChatBubble';
import Layout from '@/components/Workspace/StudyLog/Layout';
import LearningFile from '@/components/Workspace/StudyLog/LearningFile';
import Feedback from '@/components/Workspace/StudyLog/Feedback';
import { useGetLearningResultList } from '@/hooks/query/workspace/query';
import { useLearningStore } from '@/stores/useLearningStore';
import { useParams } from 'next/navigation';
import { useEffect } from 'react';

const StudyLog = () => {
  const { spaceId } = useParams();
  const { fileName } = useGetLearningResultList(spaceId as string);
  const { learningResult } = useLearningStore();

  useEffect(() => {
    const scrollToBottom = () => {
      window.scrollTo({
        top: document.body.scrollHeight,
        behavior: 'smooth',
      });
    };
    scrollToBottom();
  }, [learningResult]);

  return (
    <Layout>
      <LearningFile fileName={fileName} />
      {learningResult.map((result, index) => {
        return (
          <div key={result.resultId} className="w-[60%]">
            <ChatBubble isUser={true}>
              <div className="w-64">
                <SelectedFileItem fileName={`백지 학습 ${index + 1}`} />
              </div>
            </ChatBubble>

            <ChatBubble isUser={false}>
              <Feedback status={result.resultStatus} id={result.resultId}>
                {result.resultImages.map((image, index) => {
                  return (
                    <img
                      key={image.id}
                      src={image.resultImageUrl}
                      alt={`Result ${index + 1}`}
                      className="w-40 h-50 rounded-sm shadow-lg"
                    />
                  );
                })}
              </Feedback>
            </ChatBubble>
          </div>
        );
      })}

      <div className="fixed bottom-5 w-full flex justify-center">
        <LearningResultUpload />
      </div>
    </Layout>
  );
};

export default StudyLog;
