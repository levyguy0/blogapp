import React from "react";

interface Props {
  page: number;
  setPage: (num: number) => void;
  numberOfPages: number;
}

const CommentPagination = ({ page, setPage, numberOfPages }: Props) => {
  return (
    <div className="join">
      <button
        className={`join-item btn ${page == 1 && "btn-disabled"}`}
        onClick={() => setPage(page - 1)}
      >
        «
      </button>
      <button className="join-item btn">Page {page}</button>
      <button
        className={`join-item btn ${page == numberOfPages && "btn-disabled"}`}
        onClick={() => {
          setPage(page + 1);
        }}
      >
        »
      </button>
    </div>
  );
};

export default CommentPagination;
