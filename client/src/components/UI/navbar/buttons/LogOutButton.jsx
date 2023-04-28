import React, { forwardRef } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { logOut } from "../../../../store/users.store";
import Button from "../../../common/buttons/button";

const LogOutButton = forwardRef(() => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogOut = () => {
    if (window.confirm("Выйти из системы?")) {
      dispatch(logOut())
      navigate("/auth/login")
      window.location.reload()
    }
  };

  return (
    <Button styles="outline-light btn-sm" text="Выйти" onClick={handleLogOut} />
  );
});

export default LogOutButton;
