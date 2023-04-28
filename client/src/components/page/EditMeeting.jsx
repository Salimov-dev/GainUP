import React from "react";
// Librares
import { Navigate, useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
// UI
import MeetingForm from "../UI/forms/MeetingForm";
import Navbar from "../UI/navbar/Navbar";
// Components
import RemoveElementButton from "../common/buttons/RemoveElementButton";
import Header from "../common/Header";
// Store
import {
  getMeetingById,
  removeMeeting,
  updateMeeting,
} from "../../store/meetings.store";

const EditMeeting = () => {
  const { meetingId } = useParams();
  const dispatch = useDispatch();
  const editingMeeting = useSelector(getMeetingById(meetingId));
  const navigate = useNavigate();

  const handleEditMeeting = (e, data) => {
    const editMeeting = {
      ...editingMeeting,
      dateOfMeeting: data.dateOfMeeting,
      timeOfMeeting: data.timeOfMeeting,
      comment: data.comment,
      meetingsStatus: data.meetingsStatus,
    };
    e.preventDefault();
    dispatch(updateMeeting(editMeeting, meetingId));
    navigate("/meetings");
    toast.success("Встреча успешно изменена!");
    if (e.keyCode === 13) {
      return null;
    }
  };

  const handleRemoveMeeting = () => {
    if (window.confirm("Удалить встречу?")) {
      dispatch(removeMeeting(meetingId))
      navigate("/meetings")
      toast.success("Встреча успешно удалена!");
    }
  };

  if (!editingMeeting) {
    return <Navigate to="/meetings" />;
  }

  return (
    <>
      <Navbar />
      <div className="container-fluid p-3">
        <Header title={`Редактировать встречу: `} />
        <h4>
          {editingMeeting.location.city}, {editingMeeting.location.adress}{" "}
        </h4>
        <MeetingForm
          editMeeting={editingMeeting}
          onEditMeeting={handleEditMeeting}
        />
        <div className="mt-2">
          <RemoveElementButton onRemoveElement={handleRemoveMeeting} />
        </div>
      </div>
    </>
  );
};

export default EditMeeting;
