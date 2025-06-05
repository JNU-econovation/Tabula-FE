'use client';

import LearningFileUpload from '@/components/Workspace/LearningFileUpload';
import LoadingProgress from '@/components/Workspace/LearningResultUpload/LoadingProgress';
import { UploadLearningFileResponse } from '@/hooks/query/workspace/mutation';
import { useState } from 'react';

const page = () => {
  const [step, setStep] = useState<'upload' | 'loading' | 'result'>('upload');
  const [taskId, setTaskId] = useState<string | null>(null);

  const handleTaskId = (id: string) => {
    setTaskId(id);
  };

  return (
    <>
      {step === 'upload' && (
        <div className={`w-full flex justify-center items-center p-8 relative`}>
          <LearningFileUpload
            onSubmit={(data: UploadLearningFileResponse) => {
              handleTaskId(data.spaceId);
              setStep('loading');
            }}
          />
        </div>
      )}
      {step === 'loading' && <LoadingProgress taskId={taskId} />}
    </>
  );
};

export default page;
