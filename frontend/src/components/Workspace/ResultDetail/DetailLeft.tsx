import { PageResult } from '@/api/workspace';

interface DetailLeftProps {
  currentPageData?: PageResult | null;
  isLastPage?: boolean;
}

const DetailLeft = ({ currentPageData, isLastPage }: DetailLeftProps) => {
  return (
    <div className="w-full h-full overflow-scroll">
      {currentPageData && !isLastPage ? (
        <img
          src={currentPageData?.postImageUrl}
          alt="Result Image"
          className="w-full"
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
