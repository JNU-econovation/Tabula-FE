import { PageResult } from '@/api/workspace';

interface DetailLeftProps {
  currentPageData?: PageResult | null;
}

const DetailLeft = ({ currentPageData }: DetailLeftProps) => {
  return (
    <div className="w-full h-full overflow-scroll">
      {currentPageData && (
        <img
          src={currentPageData?.postImageUrl}
          alt="Result Image"
          className="w-full"
        />
      )}
    </div>
  );
};

export default DetailLeft;
