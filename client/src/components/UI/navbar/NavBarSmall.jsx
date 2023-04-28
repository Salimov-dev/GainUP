import React from "react";
import classes from "./Navbar.module.css";
import logoCompany from "../../../img/UP.png";
import { NavLink } from "react-router-dom";
import ChangeBigSizeButton from "./buttons/ChangeBigSizeButton";

const NavBarSmall = ({ onShowNavBar }) => {
  const activeLink = classes.liNarrowActive;
  const regularLink = classes.liNarrow;
  return (
    <>
      <div className={classes.container_small}>
        <div className={classes.innerContainer}>
          <div className={classes.topSection_small}>
            <div className={classes.logoCompany__hideNavBar}>
              <NavLink to="/">
                <img
                  style={{ width: "30px", padding: "20px 0 50px 0" }}
                  src={logoCompany}
                  alt="Logo"
                />
              </NavLink>
            </div>
            <div className={classes.showObjects__hideNavBar}>
              <NavLink
                to="/"
                className={({ isActive }) => {
                  return isActive ? activeLink : regularLink;
                }}
              >
                <i className="bi bi-houses"></i>
              </NavLink>
            </div>
            <div className={classes.showObjects__hideNavBar}>
              <NavLink
                to="/objectsonmap"
                className={({ isActive }) => {
                  return isActive ? activeLink : regularLink;
                }}
              >
                <i className="bi bi-map"></i>
              </NavLink>
            </div>
            <div className={classes.showPresentations__hideNavBar}>
              <NavLink
                to="/presentations"
                className={({ isActive }) => {
                  return isActive ? activeLink : regularLink;
                }}
              >
                <i className="bi bi-clipboard-data"></i>
              </NavLink>
            </div>
            <div className={classes.showFeedBack__hideNavBar}>
              <NavLink
                to="/feedback"
                className={({ isActive }) => {
                  return isActive ? activeLink : regularLink;
                }}
              >
                <i className="bi bi-envelope"></i>
              </NavLink>
            </div>
            <div className={classes.showFeedBack__hideNavBar}>
              <NavLink
                to="/managers"
                className={({ isActive }) => {
                  return isActive ? activeLink : regularLink;
                }}
              >
                <i className="bi bi-people"></i>
              </NavLink>
            </div>
            <div className={classes.showFeedBack__hideNavBar}>
              <NavLink
                to="/meetings"
                className={({ isActive }) => {
                  return isActive ? activeLink : regularLink;
                }}
              >
                <i className="bi bi-list-check"></i>
              </NavLink>
            </div>
          </div>
          <div className={classes.bottomSection}>
            <ChangeBigSizeButton onShowNavBar={onShowNavBar} />
          </div>
        </div>
      </div>
    </>
  );
};

export default NavBarSmall;
