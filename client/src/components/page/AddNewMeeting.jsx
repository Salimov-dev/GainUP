import React from "react";
// Librares
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
// UI
import MeetingForm from "../UI/forms/MeetingForm";
import Navbar from "../UI/navbar/Navbar";
// Components
import Header from "../common/Header";
// Store
import { getCurrentUserId } from "../../store/users.store";
import { createMeeting } from "../../store/meetings.store";

const AddNewMeeting = () => {
  const currentUserId = useSelector(getCurrentUserId());
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleAddNewMeeting = async (
    e,
    data,
    dataCity,
    dataAdress,
    dataLatitude,
    dataLongitude
  ) => {
    const isActiveMetting = "6415b5af90cdcd6344790d4e";

    const newMeeting = {
      userId: currentUserId,
      dateOfMeeting: data.dateOfMeeting,
      timeOfMeeting: data.timeOfMeeting,
      comment: data.comment,
      meetingsStatus: isActiveMetting,
      location: {
        city: dataCity,
        district: data.district,
        adress: dataAdress,
        latitude: dataLatitude,
        longitude: dataLongitude,
        zoom: 16,
      },
    };
    e.preventDefault();
    dispatch(createMeeting(newMeeting));
    navigate("/meetings");
    toast.success("Встреча успешно добавлена!");
    if (e.keyCode === 13) {
      return null;
    }
  };

  return (
    <>
      <Navbar />
      <div className="container-fluid p-3">
        <Header title={`Добавить новую встречу: `} />
        <MeetingForm onAddNewMeeting={handleAddNewMeeting} />
      </div>
    </>
  );
};

export default AddNewMeeting;
