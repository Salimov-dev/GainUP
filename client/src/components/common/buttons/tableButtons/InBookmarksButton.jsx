import React from "react";

const InBookmarksButton = ({ inBookmark, getBookmarkObjects }) => {

  return (
    <button
      className={
        inBookmark ? "btn btn-success m-1" : "btn btn-outline-success m-1"
      }
      onClick={getBookmarkObjects}
    >
      Избранные
    </button>
  );
};

export default InBookmarksButton;
