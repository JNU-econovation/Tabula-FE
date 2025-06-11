interface ProgressbarProps {
  percent: number;
  text: string;
}

const ProgressBar = ({ text, percent }: ProgressbarProps) => {
  return (
    <div className="w-full max-w-md flex flex-col gap-5 justify-center items-center">
      <span className="text-lg font-light text-gray-600 flex gap-2">
        {text}
        {/* TODO: 여기 분리하기 */}
        <span className="relative flex size-3 ">
          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-gray-400 opacity-75"></span>
          <span className="relative inline-flex size-3 rounded-full  bg-gray-400"></span>
        </span>
      </span>
      <div className="w-full bg-gray-200 rounded-full h-6">
        <div
          className="h-6 rounded-full transition-all duration-300 ease-in-out relative bg-gradient-to-r from-primary-600 to-secondary-500"
          style={{ width: `${percent}%` }}
        >
          <div className="absolute inset-0 rounded-full shadow-xl shadow-primary-200"></div>
        </div>
      </div>
      <span className="text-lg text-gray-700">{percent}%</span>
    </div>
  );
};

export default ProgressBar;
