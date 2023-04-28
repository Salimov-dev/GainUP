import React from "react";

const CreateObjectButton = ({
  onClick,
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
        onClick(e, data, dataCity, dataAdress, dataLatitude, dataLongitude)
      }
    >
      Создать
    </button>
  );
};

export default CreateObjectButton;
