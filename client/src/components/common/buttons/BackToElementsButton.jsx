import React from "react";
import { useNavigate } from "react-router-dom";
import Button from "./button";

const BackToElementsButton = ({ navigateLink }) => {
  const navigate = useNavigate();
  const handleBackToElements = () => {
    navigate(navigateLink);
  };
  return (
    <Button
      onClick={handleBackToElements}
      styles="secondary"
      text="Назад к объектам"
    />
  );
};

export default BackToElementsButton;
