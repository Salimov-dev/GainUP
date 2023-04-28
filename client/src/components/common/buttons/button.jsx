import React from "react";
import { NavLink } from "react-router-dom";

const Button = ({ onClick, styles, text, link, disabled, isNavLink }) => {
  return (
    <>
      {isNavLink ? (
        <NavLink to={link}>
          <button
            className={`btn me-1 btn-${styles}`}
            onClick={onClick}
            disabled={disabled}
          >
            {text}
          </button>
        </NavLink>
      ) : (
        <button
          className={`btn me-1 btn-${styles}`}
          onClick={onClick}
          disabled={disabled}
        >
          {text}
        </button>
      )}
    </>
  );
};

export default Button;
