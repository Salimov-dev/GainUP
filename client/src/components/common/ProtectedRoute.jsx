import React from "react";
import { useSelector } from "react-redux";
import { Navigate, useLocation } from "react-router-dom";
import { getIsLoggedIn } from "../../store/users.store";

const ProtectedRoute = ({ children }) => {
  const location = useLocation();
  const isLoggedIn = useSelector(getIsLoggedIn());

  if (!isLoggedIn)
    return <Navigate to="/auth/login" state={{ referrer: location }} />;
  return children;
};

export default ProtectedRoute;
