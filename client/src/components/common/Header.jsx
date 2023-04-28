import React from "react";
// import DarkModeButton from "../darkMode/DarkModeButton";

const Header = ({ title }) => {
  return (
    <div className="container-fluid d-flex justify-content-between align-items-center p-0">
      <div>
        <h1>{title}</h1>
      </div>
      <div>
        {/* <DarkModeButton /> */}
      </div>
    </div>
  );
};

export default Header;
