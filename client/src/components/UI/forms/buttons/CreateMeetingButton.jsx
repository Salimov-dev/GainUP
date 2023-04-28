import React from "react";

const CreateMeetingButton = ({
  onAddNewMeeting,
  data,
  dataCity,
  dataAdress,
  dataLatitude,
  dataLongitude,
  disabled,
}) => {
  return (
    <button
      disabled={disabled}
      className="btn btn-success"
      onClick={(e) =>
        onAddNewMeeting(
          e,
          data,
          dataCity,
          dataAdress,
          dataLatitude,
          dataLongitude
        )
      }
    >
      Создать
    </button>
  );
};

export default CreateMeetingButton;
