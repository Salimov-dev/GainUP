import React from "react";
import NavBarBig from "./NavBarBig";
import NavBarSmall from "./NavBarSmall";
import { useDispatch, useSelector } from "react-redux";
import {
  getisNavBarHide,
  toggleHideNavBar,
  toggleShowNavBar,
} from "../../../store/hideNavBar.store";

const Navbar = () => {
  const dispatch = useDispatch();

  const isNavBarHide = JSON.parse(useSelector(getisNavBarHide()));

  const handleHideNavBar = () => {
    localStorage.setItem("isHideNavBar", JSON.stringify(true));
    dispatch(toggleHideNavBar());
  };

  const handleShowNavBar = () => {
    localStorage.setItem("isHideNavBar", JSON.stringify(false));
    dispatch(toggleShowNavBar());
  };

  return isNavBarHide ? (
    <NavBarSmall onShowNavBar={handleShowNavBar} />
  ) : (
    <NavBarBig onHideNavBar={handleHideNavBar} />
  );
};

export default Navbar;
