import DetailLeft from '@/components/Workspace/ResultDetail/DetailLeft';
import DetailRight from '@/components/Workspace/ResultDetail/DetailRight';
import Layout from '@/components/Workspace/ResultDetail/Layout';
import { useGetResultList } from '@/hooks/query/workspace/query';
import useResultPage from '@/hooks/workspace/useResultPage';
import { useParams } from 'next/navigation';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa6';

const ResultDetail = () => {
  const { spaceId, resultId } = useParams<{
    spaceId: string;
    resultId: string;
  }>();

  const { resultList, missingAnswer, isLoading } = useGetResultList(
    spaceId,
    resultId,
  );

  const {
    page,
    setPage,
    totalPageCount,
    isLastPage,
    currentPageData,
    handleNextPage,
    handlePrevPage,
  } = useResultPage({
    resultList,
    missingAnswer,
  });
  return (
    <Layout>
      <button
        onClick={handlePrevPage}
        className="text-2xl text-gray-500 hover:text-black hover:bg-gray-100 cursor-pointer"
      >
        <FaChevronLeft />
      </button>

      <div className="w-1/2 bg-white p-4">
        <DetailLeft currentPageData={currentPageData} />
      </div>
      <div className="w-1/2 h-full bg-gray-50 p-6 overflow-y-auto">
        <DetailRight
          currentPageData={currentPageData}
          missingAnswer={missingAnswer}
        />
      </div>

      <button
        onClick={handleNextPage}
        className="text-2xl text-gray-500 hover:text-black hover:bg-gray-100 cursor-pointer"
      >
        <FaChevronRight />
      </button>
    </Layout>
  );
};

export default ResultDetail;
