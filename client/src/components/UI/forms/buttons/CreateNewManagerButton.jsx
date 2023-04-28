import React from "react";
import Button from "../../../common/buttons/button";

const CreateNewManagerButton = ({ onAddManager, isValid, data }) => {
  return (
    <Button
      styles="primary"
      text="Создать"
      disabled={!isValid}
      onClick={(e) => onAddManager(e, data)}
    />
  );
};

export default CreateNewManagerButton;
