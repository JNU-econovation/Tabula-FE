import { Suspense } from 'react';
import CallbackPage from './CallbackPage';

const page = () => {
  return (
    <Suspense fallback={<div>로딩중...</div>}>
      <CallbackPage />
    </Suspense>
  );
};

export default page;
