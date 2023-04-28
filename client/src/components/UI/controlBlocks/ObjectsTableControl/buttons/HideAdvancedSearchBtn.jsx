import React from "react";

const HideAdvancedSearchBtn = ({ onHideAdvancedSearch }) => {
  return (
    <button onClick={onHideAdvancedSearch}>
      <i className="bi bi-caret-up-square me-2 openSearch" />
    </button>
  );
};

export default HideAdvancedSearchBtn;
