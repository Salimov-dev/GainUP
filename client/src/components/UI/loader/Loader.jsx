import React from "react";
import classes from "./Loader.module.css";
import loader from "../../../img/UP.png";

const Loader = () => {
  return (
    <div className={classes.loader_container}>
      <div className={classes.loader}>
        <img src={loader} alt="loading..." />
      </div>
    </div>
  );
};

export default Loader;
