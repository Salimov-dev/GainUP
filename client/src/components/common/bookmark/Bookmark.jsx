import React from "react";
import "./styles.css";

const Bookmark = ({ onToggleBookmark, objects }) => {
  return (
    <button className="btn btn-sm" onClick={() => onToggleBookmark(objects.id)}>
      <i
        className={
          "bookmark__resize bi bi-bookmark-star" +
          (!objects.bookmark ? "" : "-fill color")
        }
      ></i>
    </button>
  );
};

export default Bookmark;
