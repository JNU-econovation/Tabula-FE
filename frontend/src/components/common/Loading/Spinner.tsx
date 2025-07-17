import { JSX } from 'react';
interface SpinnerProps {
  text?: string | JSX.Element;
  percent?: number;
}
export default function Spinner({ text, percent }: SpinnerProps) {
  return (
    <div className="flex items-center gap-5">
      <div className="spinner-container">
        {Array.from({ length: 12 }, (_, i) => (
          <div key={i} className="spinner-line" />
        ))}
      </div>
      {text && <p className="text-md text-gray-400">{text}</p>}
      {percent && <p className="text-md text-gray-400">{percent}%</p>}
    </div>
  );
}
