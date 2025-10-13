'use client';

import LearningFileUpload from '@/components/Workspace/LearningFileUpload';
import LoadingProgress from '@/components/Workspace/LearningResultUpload/LoadingProgress';
import { usePreventRefresh } from '@/hooks/common/usePreventRefresh';
import { UploadLearningFileResponse } from '@/hooks/query/workspace/mutation';
import { useEffect, useState } from 'react';

const page = () => {
  const [step, setStep] = useState<'upload' | 'loading'>('upload');
  const [taskId, setTaskId] = useState<string | null>(null);

  const handleTaskId = (id: string) => {
    setTaskId(id);
    localStorage.setItem('taskId', id);
  };

  const setStepToUpload = () => {
    setStep('upload');
  };

  const setStepToLoading = () => {
    setStep('loading');
  };

  return (
    <>
      {step === 'upload' && (
        <div className={`w-full flex justify-center items-center p-8 relative`}>
          <LearningFileUpload
            onSubmit={(data: UploadLearningFileResponse) => {
              handleTaskId(data.spaceId);
              setStepToLoading();
            }}
          />
        </div>
      )}
      {step === 'loading' && (
        <LoadingProgress taskId={taskId} setStepToUpload={setStepToUpload} />
      )}
    </>
  );
};

export default page;
