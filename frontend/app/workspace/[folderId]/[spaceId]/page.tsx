'use client';

import LearningResultUpload from '@/components/Workspace/LearningResultUpload/LearningResultUpload';
import { useParams } from 'next/navigation';
import { useContext, useEffect } from 'react';
import { SidebarContext } from '../layout';
import { useGetLearningResultList } from '@/hooks/query/workspace/query';
import ChatBubble from '@/components/Workspace/StudyLog/ChatBubble';
import { Button } from '@/components/common/Button/Button';
import { FaSearchPlus } from 'react-icons/fa';
import LoadingSpinner from '@/components/Workspace/StudyLog/LoadingSpinner';
import { useLearningStore } from '@/stores/useLearningStore';
import SelectedFileItem from '@/components/Workspace/LearningFileUpload/SelectedFileItem';

const page = () => {
  const { spaceId } = useParams();
  const { isSidebarOpen } = useContext(SidebarContext);
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
    <div className="relative w-full overflow-x-hidden">
      <div
        className={`flex flex-col items-center min-h-[calc(100vh-4.5rem)] py-40 ${
          isSidebarOpen && 'relative left-20'
        } gap-10 pb-60 transition-all duration-300`}
      >
        <div className="w-[60%]">
          <ChatBubble isUser={true}>
            <div className="w-64">
              <SelectedFileItem fileName="학습자료" content={fileName} />
            </div>
          </ChatBubble>

          <ChatBubble isUser={false}>
            <p>
              학습 과정 중 막히는 부분이 있다면 ‘키워드 확인하기' 를
              이용해주세요!
            </p>
            <p>
              모르는 부분에 ㅁ 표시를 하면 채점의 정확도를 높일 수 있어요 ☺️
            </p>
          </ChatBubble>
        </div>

        {learningResult.map((result, index) => {
          return (
            <div key={result.resultId} className="w-[60%]">
              <ChatBubble isUser={true}>
                <div className="w-64">
                  <SelectedFileItem fileName={`백지 학습 ${index + 1}`} />
                </div>
              </ChatBubble>

              <ChatBubble isUser={false}>
                {result.resultStatus === 'LOADING' ? (
                  <div className="flex flex-col items-center gap-3">
                    <LoadingSpinner taskId={result.resultId} />
                  </div>
                ) : (
                  <div className="flex flex-col gap-3">
                    <p>채점이 완료되었어요.</p>
                    <p>
                      자세히보기를 통해 채점결과에 대한 피드백을 확인할 수
                      있어요.
                    </p>
                    <div className="flex gap-5">
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
                    </div>
                    <Button
                      variant="line"
                      size="md"
                      style={{
                        border: '2px solid #2F0DA9',
                        color: '#2F0DA9',
                        width: '10rem',
                        borderRadius: '1rem',
                      }}
                    >
                      <div className="flex items-center gap-2">
                        <FaSearchPlus />
                        <p>자세히보기</p>
                      </div>
                    </Button>
                  </div>
                )}
              </ChatBubble>
            </div>
          );
        })}

        <div className="fixed bottom-5 w-full flex justify-center">
          <LearningResultUpload />
        </div>
      </div>
    </div>
  );
};

export default page;
