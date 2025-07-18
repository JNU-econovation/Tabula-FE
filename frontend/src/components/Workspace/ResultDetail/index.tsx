'use client';

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
    currentPageData,
    handleNextPage,
    handlePrevPage,
    isLastPage,
  } = useResultPage({
    resultList,
    missingAnswer,
  });

  return (
    <>
      <Layout>
        <div className="flex h-9/10 w-full max-w-4xl border border-gray-200 rounded-lg shadow-md overflow-hidden ">
          <button
            onClick={handlePrevPage}
            className="text-2xl text-gray-500 hover:text-black hover:bg-gray-100 cursor-pointer"
          >
            <FaChevronLeft />
          </button>

          {/* 만약 패드 혹은 폰 사이즈라면 DetailLeft 는 그대로, DetailRight 는 특정 버튼 클릭 시 모달 형태로 아래에서 위로 올라와야함 */}

          <div className="w-3/5 bg-white p-1">
            <DetailLeft
              currentPageData={currentPageData}
              isLastPage={isLastPage}
            />
          </div>
          <div className="w-2/5 h-full bg-gray-50 p-6 overflow-y-auto">
            <DetailRight
              isLastPage={isLastPage}
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
        </div>
        <div className="mt-3 flex space-x-2">
          {Array.from({ length: totalPageCount }, (_, i) => (
            <button
              key={i}
              onClick={() => setPage(i + 1)}
              className={`cursor-pointer w-8 h-8 rounded-full text-sm font-semibold ${
                page === i + 1
                  ? 'bg-primary-600 text-white'
                  : 'bg-gray-200 text-gray-800 hover:bg-gray-300'
              }`}
            >
              {i + 1}
            </button>
          ))}
        </div>
      </Layout>
    </>
  );
};

export default ResultDetail;
