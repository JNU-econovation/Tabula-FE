interface ProgressbarProps {
  percent: number;
  text: string;
}

const ProgressBar = ({ text, percent }: ProgressbarProps) => {
  return (
    <div className="w-full max-w-md flex flex-col gap-5 justify-center items-center">
      <span className="text-lg font-light text-gray-600">{text}</span>
      <div className="w-full bg-gray-200 rounded-full h-6">
        <div
          className="h-6 rounded-full transition-all duration-300 ease-in-out relative bg-gradient-to-r from-primary-gradient-from to-primary-gradient-to"
          style={{ width: `${percent}%` }}
        >
          <div className="absolute inset-0 rounded-full shadow-xl shadow-primary/30"></div>
        </div>
      </div>
      <span className="text-lg text-gray-700">{percent}%</span>
    </div>
  );
};

export default ProgressBar;
