import { useMemo } from "react";

/**
 * Helper method for creating a range of numbers
 * range(1, 5) => [1, 2, 3, 4, 5]
 */
 const range = (from, to, step = 1) => {
  let i = from;
  const range = [];

  while (i <= to) {
    range.push(i);
    i += step;
  }

  return range;
}

const PREV = "PREV";
const NEXT = "NEXT";
const DOTS = "DOTS";

export default function usePagination({
  totalCount,
  currentPage,
  pageSize = 30,
  siblingsCount = 1
}) {
  // This memo will run when either of the dependencies changes
  const paginationRage = useMemo(() => {
    const totalPageCount = Math.ceil(totalCount / pageSize);
    /*
     * This represents the blocks of pagination,
     * < (1) ... {4} [5] {6} ... (10) >
     * totalPagesNumber = (2 * siblingsCount) + currentPage + firstPage + lastPage
    */
    const totalPagesNumber = (siblingsCount * 2) + 3;
    const totalBlocksNumber = totalPagesNumber + 2; // +2 for 2*DOTS

    // Case 1: Total number of pages is equal or less than the total number of blocks
    if (totalPageCount <= totalBlocksNumber) {
      const middlePages = range(1, totalPageCount);
      return [PREV, ...middlePages, NEXT];
    }

    // < (firstPage) {startPage, ...} [currentPage] {..., endPage} (lastPage) >
    const startPage = Math.max(2, currentPage - siblingsCount);
    const endPage = Math.min(totalPageCount - 1, currentPage + siblingsCount);

    const hasLeftOverflow = (startPage - 1) > 2;
    const hasRightOverflow = (totalPageCount - endPage) > 2;

    const firstPage = 1;
    const lastPage = totalPageCount;

    // Case 2: < (1) 2 {3} [4] {5} ... (10) >
    if (!hasLeftOverflow && hasRightOverflow) {
      const leftPages = 3 + 2 * siblingsCount;
      const leftRange = range(2, leftPages);
      return [PREV, firstPage, ...leftRange, DOTS, lastPage, NEXT];
    }

    // Case 3: < (1) ... {6} [7] {8} 9 (10) >
    if (hasLeftOverflow && !hasRightOverflow) {
      const rightPages = 3 + 2 * siblingsCount;
      const rightRange = range( totalPageCount - rightPages + 1, totalPageCount - 1);
      return [PREV, firstPage, DOTS, ...rightRange , lastPage, NEXT];
    }

    // Case 4: < (1) ... {4} [5] {6} ... (10) >
    if (hasLeftOverflow && hasRightOverflow) {
      const middleRange = range(startPage, endPage);
      return [PREV, firstPage, DOTS, ...middleRange , DOTS, lastPage, NEXT];
    }

  }, [totalCount, currentPage, pageSize, siblingsCount]);

  return paginationRage;
}