import React from "react";
// Librares
import { Navigate, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";
// Store
import { getIsLoggedIn } from "../store/users.store";

const AuthLayout = () => {
  const isLoggedIn = useSelector(getIsLoggedIn());

  if (isLoggedIn) {
    return <Navigate to="/" />;
  }

  return <Outlet />;
};

export default AuthLayout;
