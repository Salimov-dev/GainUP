import React from "react";
import { NavLink } from "react-router-dom";
import classes from "./AboutCompany.module.css";
import logoCompany from "../../../img/UP.png";

const AboutCompany = () => {
  return (
    <div className={classes.container}>
      <div className={classes.nameCompany}>gain</div>
      <div className={classes.logoCompany}>
        <NavLink to="/">
          <img src={logoCompany} alt="Logo" />
        </NavLink>
      </div>
      <div className={classes.sloganCompany}>
        Удобная CRM <br /> для Вашего <br /> отдела развития
      </div>
    </div>
  );
};

export default AboutCompany;
