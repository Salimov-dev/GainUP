import React from "react";
// Librares
import { Navigate, useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
// UI
import ManagerForm from "../UI/forms/ManagerForm";
// Components
import RemoveElementButton from "../common/buttons/RemoveElementButton";
import Navbar from "../UI/navbar/Navbar";
import Header from "../common/Header";
// Store
import { getUsersById, removeUser, updateUser } from "../../store/users.store";

const EditManager = () => {
  const { userId } = useParams();
  const dispatch = useDispatch();
  const editingUser = useSelector(getUsersById(userId));
  const navigate = useNavigate();

  const handleEditManager = (e, data) => {
    const editedManager = {
      ...editingUser,
      firstName: data.firstName,
      surName: data.surName,
      lastName: data.lastName,
      managerStatus: data.managerStatus,
      sex: data.sex,
      phoneNumber: data.phoneNumber,
      startDateOfJobOffer: data.startDateOfJobOffer,
      expiresDateOfJobOffer: data.expiresDateOfJobOffer,
      quantityOfOpenStore: data.quantityOfOpenStore,
      dateOfStartVacation: data.dateOfStartVacation,
      dateOfEndVacation: data.dateOfEndVacation,
      userAccessRoot: data.userAccessRoot,
    };
    e.preventDefault();
    navigate("/managers");
    dispatch(updateUser(editedManager, userId));
    toast.success("Менеджер успешно изменен!");
    if (e.keyCode === 13) {
      return null;
    }
  };

  const handleRemoveManager = () => {
    if (window.confirm("Удалить менеджера?")) {
      dispatch(removeUser(userId));
      toast.success("Менеджер успешно удален!");
      navigate("/managers");
    }
  };

  if (!editingUser) {
    return <Navigate to="/managers" />;
  }

  return (
    <>
      <Navbar />
      <div className="container-fluid p-3">
        <Header title={`Редактировать менеджера:`} />
        <h3>
          {editingUser.lastName} {editingUser.firstName} {editingUser.surName}
        </h3>
        <div>
          <img src={editingUser.image} alt="" width="150" />
        </div>
        <br />
        <ManagerForm
          editingManager={editingUser}
          onEditManager={handleEditManager}
        />
        <div className="mt-2">
          <RemoveElementButton onRemoveElement={handleRemoveManager} />
        </div>
      </div>
    </>
  );
};

export default EditManager;
