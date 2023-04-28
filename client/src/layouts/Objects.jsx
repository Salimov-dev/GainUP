import React, { useState } from "react";
// Librares
import { Navigate, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
// Components
import Navbar from "../components/UI/navbar/Navbar";
import ObjectPage from "../components/page/ObjectPage/ObjectPage";
import ObjectsTable from "../components/page/ObjectsTable";
import { getCurrentUserData } from "../store/users.store";

const Objects = () => {
  const { objectId } = useParams();
  const currentUser = useSelector(getCurrentUserData());

  return (
    <>
      <Navbar />
      {currentUser ? (
        objectId ? (
          <ObjectPage objectId={objectId} />
        ) : (
          <ObjectsTable />
        )
      ) : (
        <Navigate to="/auth/login" />
      )}
    </>
  );
};

export default Objects;
