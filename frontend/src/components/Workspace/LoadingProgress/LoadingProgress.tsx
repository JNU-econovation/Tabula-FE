import Loading from '@/components/common/Loading/Loading';
import { useEffect, useState } from 'react';

const LoadingProgress = () => {
  const [percent, setPercent] = useState(10);
  //   useEffect(() => {
  //     const eventSource = new EventSource(`/sse/ai-progress/${id}`);
  //     eventSource.onmessage = (e) => {
  //       setProgress(e.data);

  //     };
  //   }, []);

  return (
    <div className="w-full relative top-40">
      <Loading type="progress" percent={percent} text="로딩중 입니다." />
    </div>
  );
};

export default LoadingProgress;
