import React from "react";
import classes from "./Navbar.module.css";
import AboutCompany from "../../common/aboutCompany/AboutCompany";
import UserInfo from "../../common/userInfo/UserInfo";
import LogOutButton from "./buttons/LogOutButton";
import ChangeSmallSizeButton from "./buttons/ChangeSmallSizeButton";
import { NavLink } from "react-router-dom";

const NavBarBig = ({ onHideNavBar }) => {
  const activeLink = classes.liActive;
  const regularLink = classes.li;
  return (
    <>
      <div className={classes.container}>
        <div className={classes.innerContainer}>
          <div className={classes.topSection}>
            <AboutCompany />
            <UserInfo />
            <div>
              <div className="d-flex justify-content-center mt-3">
                <nav className={classes.ul}>
                  <li className={classes.li}>
                    <NavLink
                      to="/"
                      className={({ isActive }) => {
                        return isActive ? activeLink : regularLink;
                      }}
                    >
                      Таблица объектов
                    </NavLink>
                  </li>
                  <li className={classes.li}>
                    <NavLink
                      to="/objectsonmap"
                      className={({ isActive }) => {
                        return isActive ? activeLink : regularLink;
                      }}
                    >
                      Объекты на карте
                    </NavLink>
                  </li>
                  <br />
                  <li className={classes.li}>
                    <NavLink
                      to="/presentations"
                      className={({ isActive }) => {
                        return isActive ? activeLink : regularLink;
                      }}
                    >
                      Презентации объектов
                    </NavLink>
                  </li>
                  <li className={classes.li}>
                    <NavLink
                      to="/feedback"
                      className={({ isActive }) => {
                        return isActive ? activeLink : regularLink;
                      }}
                    >
                      Обратная связь
                    </NavLink>
                  </li>
                  <br />
                  <li className={classes.li}>
                    <NavLink
                      to="/managers"
                      className={({ isActive }) => {
                        return isActive ? activeLink : regularLink;
                      }}
                    >
                      Список менеджеров
                    </NavLink>
                  </li>
                  <li className={classes.li}>
                    <NavLink
                      to="/meetings"
                      className={({ isActive }) => {
                        return isActive ? activeLink : regularLink;
                      }}
                    >
                      Список встреч
                    </NavLink>
                  </li>
                </nav>
              </div>
            </div>
          </div>
          <div className={classes.bottomSection}>
            <ChangeSmallSizeButton onHideNavBar={onHideNavBar} />
            <LogOutButton />
          </div>
        </div>
      </div>
    </>
  );
};

export default NavBarBig;
