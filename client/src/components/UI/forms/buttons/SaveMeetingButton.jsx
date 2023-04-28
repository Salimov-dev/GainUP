import React from "react";

const SaveMeetingButton = ({ data, editMeeting, onEditMeeting }) => {
  return editMeeting ? (
    <button
      className="btn btn-primary"
      onClick={(e) => {
        onEditMeeting(e, data);
      }}
    >
      Сохранить
    </button>
  ) : null;
};

export default SaveMeetingButton;
