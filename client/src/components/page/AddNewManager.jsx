import React from "react";
// Librares
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
// UI
import ManagerForm from "../UI/forms/ManagerForm";
import Navbar from "../UI/navbar/Navbar";
// Components
import Header from "../common/Header";
// Store
import { getCurrentUserId, signUp } from "../../store/users.store";

const AddNewManager = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const currentUserId = useSelector(getCurrentUserId());

  const handleAddNewManager = (e, data) => {
    e.preventDefault();
    const newData = { ...data, created_byUser: currentUserId };
    dispatch(signUp(newData));
    navigate("/managers");
    toast.success("Менеджер успешно добавлен!");
    if (e.keyCode === 13) {
      return null;
    }
  };

  return (
    <>
      <Navbar />
      <div className="container-fluid p-3">
        <Header title={"Добавить нового менеджера"} />
        <br />
        <ManagerForm onAddManager={handleAddNewManager} />
      </div>
    </>
  );
};

export default AddNewManager;
