import React from "react";
import classes from "../Navbar.module.css";

const ChangeBigSizeButton = ({ onShowNavBar }) => {
  return (
    <button onClick={onShowNavBar} className={classes.showMenuBtn__block}>
      <div>
        <i className="bi bi-arrow-bar-right"></i>
      </div>
    </button>
  );
};

export default ChangeBigSizeButton;
