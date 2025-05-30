interface SpinnerProps {
  text: string;
  percent: number;
}
export default function Spinner({ text, percent }: SpinnerProps) {
  return (
    <div className="flex items-center gap-5">
      <div className="spinner-container">
        {Array.from({ length: 12 }, (_, i) => (
          <div key={i} className="spinner-line" />
        ))}
      </div>
      <p className="text-md text-gray-400">{text}</p>
      <p className="text-md text-gray-400">{percent}%</p>
    </div>
  );
}
