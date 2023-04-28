import React from "react";
import Button from "../button";

const ClearFormButton = ({onClearForm}) => {
  return (
    <Button onClick={onClearForm} styles="warning" text="Очистить форму" />
  );
};

export default ClearFormButton;
