import ProgressBar from '@/components/common/Loading/ProgressBar';
import Spinner from '@/components/common/Loading/Spinner';
import { JSX } from 'react';

interface LoadingProps {
  type?: 'progress' | 'spinner';
  text?: string | JSX.Element;
  percent?: number;
}
const Loading = ({ type = 'progress', percent, text }: LoadingProps) => {
  return (
    <div className="w-full flex items-center justify-center p-8 relative break-words whitespace-normal">
      {type === 'progress' && text && typeof percent === 'number' && (
        <ProgressBar text={text} percent={percent} />
      )}
      {type === 'spinner' && text && typeof percent === 'number' && (
        <Spinner text={text} percent={percent} />
      )}
      {type === 'spinner' && !text && <Spinner />}
    </div>
  );
};

export default Loading;
