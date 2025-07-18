import { PageResult } from '@/api/workspace';
import { useState } from 'react';

interface ResultListItem {
  resultList: PageResult[];
}

const useResultPage = ({ resultList }: ResultListItem) => {
  const [page, setPage] = useState(1);

  const totalPageCount = resultList.length;

  const isLastPage = page === totalPageCount;
  const currentPageData = resultList.find((item) => item.page === page);

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
