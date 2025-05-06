import ProgressBar from '@/common/Loading/ProgressBar';
import Spinner from '@/common/Loading/Spinner';

interface LoadingProps {
  type?: 'progress' | 'spinner';
  text: string;
  percent: number;
}
const Loading = ({ type = 'progress', percent, text }: LoadingProps) => {
  return (
    <div>
      {type === 'progress' && <ProgressBar text={text} percent={percent} />}
      {type === 'spinner' && <Spinner text={text} percent={percent} />}
    </div>
  );
};

export default Loading;
