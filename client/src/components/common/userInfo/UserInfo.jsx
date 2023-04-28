import React from "react";
import { useSelector } from "react-redux";
import { getCurrentUserData } from "../../../store/users.store";
import classes from "./UserInfo.module.css";

const UserInfo = () => {
  const currentUser = useSelector(getCurrentUserData());

  return (
    <div className={classes.container}>
      <div className={classes.photo}>
        <img
          src={currentUser?.image}
          alt=""
          height="40px"
          className="img-responsive rounded-circle"
        />
      </div>
      <div className={classes.name}>
        {currentUser?.firstName} <br /> {currentUser?.lastName}
      </div>
    </div>
  );
};

export default UserInfo;
