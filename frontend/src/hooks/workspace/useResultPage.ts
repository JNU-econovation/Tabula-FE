import { PageResult } from '@/api/workspace';
import { useState } from 'react';

interface ResultListItem {
  resultList: PageResult[];
  missingAnswer: string[];
}

const useResultPage = ({ resultList, missingAnswer }: ResultListItem) => {
  const [page, setPage] = useState(1);

  const handleNextPage = () => {
    if (page < totalPageCount) {
      setPage((prev) => prev + 1);
    } else {
      setPage(1);
    }
  };

  const handlePrevPage = () => {
    if (page > 1) {
      setPage((prev) => prev - 1);
    } else {
      setPage(totalPageCount);
    }
  };

  const totalPageCount = resultList.length + (missingAnswer.length > 0 ? 1 : 0);

  const isLastPage = page === totalPageCount && missingAnswer.length > 0;

  const currentPageData = !isLastPage
    ? resultList.find((item) => item.page === page)
    : null;

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
