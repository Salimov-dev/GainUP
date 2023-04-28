const isHideNavBar = false;

if (!localStorage.getItem("isHideNavBar")) {
  localStorage.setItem("isHideNavBar", JSON.stringify(isHideNavBar));
}

export default isHideNavBar;
