import React from "react";
// Librares
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { nanoid } from "nanoid";
// UI
import ObjectForm from "../UI/forms/ObjectForm";
import Navbar from "../UI/navbar/Navbar";
// Components
import Header from "../common/Header";
// Store
import { getCurrentUserId } from "../../store/users.store";
import { createObject } from "../../store/objects.store";

const AddNewObject = () => {
  const dispatch = useDispatch();
  const currentUserId = useSelector(getCurrentUserId());
  const navigate = useNavigate();

  const handleAddNewObject = (
    e,
    data,
    dataCity,
    dataAdress,
    dataLatitude,
    dataLongitude
  ) => {
    e.preventDefault();

    const newObject = {
      userId: currentUserId,
      bookmark: data.bookmark,
      status: data.status,
      contact: {
        phone: data.contactPhone,
        name: data.contactName,
        position: data.contactPosition,
        email: data.contactEmail,
      },
      location: {
        city: dataCity,
        district: data.district,
        adress: dataAdress,
        latitude: dataLatitude,
        longitude: dataLongitude,
        zoom: 16,
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
    dispatch(createObject(newObject));
    toast.success("Объект успешно добавлен!");
    navigate("/");
    if (e.keyCode === 13) {
      return null;
    }
  };

  return (
    <>
      <Navbar />
      <div className="container-fluid p-3 ">
        <Header title={`Создать новый объект:`} />
        <ObjectForm onClick={handleAddNewObject} />
      </div>
    </>
  );
};

export default AddNewObject;
