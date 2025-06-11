import ProgressBar from '@/components/common/Loading/ProgressBar';
import Spinner from '@/components/common/Loading/Spinner';

interface LoadingProps {
  type?: 'progress' | 'spinner';
  text?: string;
  percent?: number;
}
const Loading = ({ type = 'progress', percent, text }: LoadingProps) => {
  return (
    <div className="w-full flex items-center justify-center p-8 relative">
      {type === 'progress' && text && percent && (
        <ProgressBar text={text} percent={percent} />
      )}
      {type === 'spinner' && text && percent && (
        <Spinner text={text} percent={percent} />
      )}
      {type === 'spinner' && !text && <Spinner />}
    </div>
  );
};

export default Loading;
