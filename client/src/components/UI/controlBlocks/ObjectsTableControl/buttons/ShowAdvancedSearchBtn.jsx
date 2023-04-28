import React from "react";

const ShowAdvancedSearchBtn = ({ onShowAdvancedSearch }) => {
  return (
    <button onClick={onShowAdvancedSearch}>
      <i className="bi bi-caret-down-square me-2 openSearch" />
    </button>
  );
};

export default ShowAdvancedSearchBtn;
