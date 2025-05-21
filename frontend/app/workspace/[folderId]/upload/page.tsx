'use client';

import LearningFileUpload from '@/components/Workspace/LearningFileUpload';
import LoadingProgress from '@/components/Workspace/LoadingProgress/LoadingProgress';
import { useState } from 'react';

const page = () => {
  const [step, setStep] = useState<'upload' | 'loading' | 'result'>('upload');

  return (
    <>
      {step === 'upload' && (
        <div className={`w-full flex justify-center items-center p-8 relative`}>
          <LearningFileUpload onSubmit={() => setStep('loading')} />
        </div>
      )}
      {step === 'loading' && <LoadingProgress />}
    </>
  );
};

export default page;
