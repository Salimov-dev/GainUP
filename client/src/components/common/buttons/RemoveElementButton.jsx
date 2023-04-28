import React from "react";
import Button from "./button";

const RemoveElementButton = ({ onRemoveElement }) => {
  return <Button text="Удалить" styles="danger" onClick={onRemoveElement} />;
};

export default RemoveElementButton;
