import { useMemo } from "react";
import usePagination from "../../hooks/usePagination";
import { Pagination as BsPagination } from "react-bootstrap";
import styles from "../../scss/modules/ui/Pagination.module.scss";

export function Pagination({
  pageSize = 30,
  totalCount,
  currentPage,
  onPageChange
}) {
  const totalPageCount = useMemo(() => {
    return Math.ceil(totalCount / pageSize);
  }, [totalCount, pageSize]);

  const items = usePagination({
    pageSize: pageSize,
    totalCount: totalCount,
    currentPage: currentPage,
  });

  function handleNext() {
    onPageChange(
      currentPage + 1 <= totalPageCount ? currentPage + 1 : currentPage
    );
  }
  function handlePrev() {
    onPageChange(
      currentPage - 1 >= 1 ? currentPage - 1 : 1
    );
  }

  return (
    <div>
      {
        <BsPagination className={`${styles.pagination}`}>
          {items.map((item, index) => {
            if (item === "PREV") {
              return currentPage !== 1 ? 
                <BsPagination.Prev onClick={handlePrev} key={index} /> :
                <BsPagination.Prev onClick={handlePrev} key={index} disabled/>
            }

            if (item === "NEXT") {
              return currentPage !== totalPageCount ?
                <BsPagination.Next onClick={handleNext} key={index} /> :
                <BsPagination.Next onClick={handleNext} key={index} disabled />
            }

            if (item === "DOTS") {
              return <BsPagination.Ellipsis key={index}/>
            }

            return currentPage === item ?
              <BsPagination.Item 
                active 
                onClick={() => onPageChange(item)} 
                key={index}>{item}</BsPagination.Item> :
              <BsPagination.Item 
                onClick={() => onPageChange(item)} 
                key={index}>{item}</BsPagination.Item>;
          })}
        </BsPagination>
      }
    </div>
  )
}

export function TopPagination({currentPage, totalPageCount, onPageChange}) {

  function handleNext() {
    onPageChange(
      currentPage + 1 <= totalPageCount ? currentPage + 1 : currentPage
    );
  }
  function handlePrev() {
    onPageChange(
      currentPage - 1 >= 1 ? currentPage - 1 : 1
    );
  }

  return (
    <BsPagination className={`${styles["top-pagination"]}`}>
      <BsPagination.Prev onClick={handlePrev}/>
      <p>{currentPage} of {" "}
        <span onClick={() => onPageChange(totalPageCount)} className={`${styles["last-page"]}`}>
          {totalPageCount}
        </span>
      </p>
      <BsPagination.Next onClick={handleNext}/>
    </BsPagination>
  );
}