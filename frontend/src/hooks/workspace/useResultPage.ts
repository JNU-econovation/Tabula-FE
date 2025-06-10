import { PageResult } from '@/api/workspace';
import { useState } from 'react';

interface ResultListItem {
  resultList: PageResult[];
  missingAnswer: string[];
}

const useResultPage = ({ resultList, missingAnswer }: ResultListItem) => {
  const [page, setPage] = useState(1);

  const totalPageCount = resultList.length + (missingAnswer.length > 0 ? 1 : 0);

  const isLastPage = page === totalPageCount && missingAnswer.length > 0;

  const currentPageData = !isLastPage
    ? resultList.find((item) => item.page === page)
    : null;

  const handleNextPage = () => {
    setPage((prev) => (prev < totalPageCount ? prev + 1 : 1));
  };

  const handlePrevPage = () => {
    setPage((prev) => (prev > 1 ? prev - 1 : totalPageCount));
  };

  return {
    page,
    setPage,
    totalPageCount,
    isLastPage,
    currentPageData,
    handleNextPage,
    handlePrevPage,
  };
};

export default useResultPage;
