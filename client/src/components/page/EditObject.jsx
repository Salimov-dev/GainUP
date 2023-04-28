import React from "react";
// Librares
import { Navigate, useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
// UI
import ObjectForm from "../UI/forms/ObjectForm";
import Navbar from "../UI/navbar/Navbar";
// Components
import Header from "../common/Header";
// Store
import { getObjectById, updateObject } from "../../store/objects.store";

const EditObject = ({ setData, errors, setErrors, validate }) => {
  const { objectId } = useParams();
  const editingObject = useSelector(getObjectById(objectId));
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleEditObject = async (e, data) => {
    const editObject = {
      ...editingObject,
      status: data.status,
      contact: {
        phone: data.contactPhone,
        name: data.contactName,
        position: data.contactPosition,
        email: data.contactEmail,
      },
      estateOptions: {
        rentPrice: data.rentPrice.replace(/\s+/g, ""),
        prepaidPrice: data.prepaidPrice.replace(/\s+/g, ""),
        rentalHolidays: data.rentalHolidays,
        totalSquare: data.totalSquare,
        rentSquare: data.rentSquare,
        premisesHeight: data.premisesHeight,
        premisesFloor: data.premisesFloor,
      },
      accordTerms: {
        readyToRent: data.readyToRent,
        readyToContract: data.readyToContract,
        readyToRenovation: data.readyToRenovation,
      },
      description: {
        comment: data.comment,
        fullDescription: data.fullDescription,
      },
    };
    e.preventDefault();
    dispatch(updateObject(editObject, objectId));
    navigate(`/objects/${objectId}`);
    toast.success("Объект успешно изменен!");
    if (e.keyCode === 13) {
      return null;
    }
  };

  if (!editingObject) {
    return <Navigate to="/objects" />;
  }

  return (
    <>
      <Navbar />
      <div className="container-fluid p-3">
        <div className="p-0">
          <Header title={`Редактировать объект:`} />
          <h4>
            {editingObject.location.city}: {editingObject.location.adress}
          </h4>
          <br />
        </div>
        <ObjectForm
          objectId={objectId}
          editObject={editingObject}
          setData={setData}
          errors={errors}
          setErrors={setErrors}
          validate={validate}
          onEditObject={handleEditObject}
        />
      </div>
    </>
  );
};

export default EditObject;
