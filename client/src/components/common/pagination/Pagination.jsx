import React from "react";
import "./styles.css";
import _ from "lodash";

const Pagination = ({
  objects,
  itemsCount,
  pageSize,
  onPageChange,
  currentPage,
  setCurrentPage,
}) => {
  const pageCount = Math.ceil(itemsCount / pageSize);
  if (pageCount === 1) return null;
  const pages = _.range(1, pageCount + 1);

  const hanglePageChangeNext = () => {
    const lastPage = pages[pages.length - 1];
    if (currentPage !== lastPage) return setCurrentPage(currentPage + 1);
  };

  const hanglePageChangePrevious = () => {
    if (currentPage !== 1) return setCurrentPage(currentPage - 1);
  };

  return (
    <div className="container d-flex justify-content-center">
      {objects.length < pageSize && currentPage === 1 ? null : (
        <nav aria-label="Page navigation example">
          <ul className="pagination ">
            <button
              className="page-link"
              aria-label="Previous"
              onClick={hanglePageChangePrevious}
            >
              <span aria-hidden="true">&laquo;</span>
            </button>
            {pages.map((page) => (
              <li
                key={"page_" + page}
                className={
                  `page-item ` + (page === currentPage ? "active" : " ")
                }
              >
                <button
                  className="page-link"
                  onClick={() => onPageChange(page)}
                >
                  {page}
                </button>
              </li>
            ))}
            <button
              className="page-link"
              aria-label="Next"
              onClick={hanglePageChangeNext}
            >
              <span aria-hidden="true">&raquo;</span>
            </button>
          </ul>
        </nav>
      )}
    </div>
  );
};

export default Pagination;
