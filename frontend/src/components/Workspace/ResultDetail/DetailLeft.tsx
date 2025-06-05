import { PageResult } from '@/api/workspace';

interface DetailLeftProps {
  currentPageData?: PageResult | null;
}

const DetailLeft = ({ currentPageData }: DetailLeftProps) => {
  return (
    <div className="w-full h-full overflow-hidden">
      {currentPageData ? (
        <img
          src={currentPageData?.resultImageUrl}
          alt="Result Image"
          className="w-full h-full object-cover"
        />
      
      ) : (
        <div className="w-full h-full flex items-center justify-center bg-gray-200">
          <p className="text-gray-500">누락된 내용</p>
        </div>
      )}
    </div>
  );
};

export default DetailLeft;
