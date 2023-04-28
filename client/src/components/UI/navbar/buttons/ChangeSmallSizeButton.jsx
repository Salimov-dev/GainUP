import React from "react";
import classes from "../Navbar.module.css";

const ChangeSmallSizeButton = ({ onHideNavBar }) => {
  return (
    <div className={classes.hideMenuBtn}>
      <button onClick={onHideNavBar}>
        <i className="bi bi-arrow-bar-left"> · · · Свернуть меню</i>
      </button>
    </div>
  );
};

export default ChangeSmallSizeButton;
