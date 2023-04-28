import React from "react";
import _ from "lodash";
import "./styles.css";

const SelectStatusButton = ({ items, selectedStatus, onItemSelect }) => {
  const sortedItems = _.orderBy(items, ["name"], ["asc"]);
  return Object.keys(sortedItems).map((item) => (
    <li
      key={sortedItems[item]._id}
      className="nav-item m-1"
      onClick={() => onItemSelect(sortedItems[item])}
      role="button"
    >
      <button
        className={
          "statusList__link nav-link " +
          (sortedItems[item] === selectedStatus
            ? " active statusList__activeLink"
            : "")
        }
      >
        {sortedItems[item].name}
      </button>
    </li>
  ));
};

export default SelectStatusButton;
