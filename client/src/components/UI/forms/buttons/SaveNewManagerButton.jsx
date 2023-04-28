import React from "react";
import Button from "../../../common/buttons/button";

const SaveNewManagerButton = ({ onEditManager, data }) => {
  return (
    <Button
      styles="success"
      text="Изменить"
      onClick={(e) => onEditManager(e, data)}
    />
  );
};

export default SaveNewManagerButton;
