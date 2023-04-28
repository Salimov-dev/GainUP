import React from "react";
import Button from "./button";

const EditElementButton = ({ editElementLink }) => {
  return (
    <Button
      styles="info"
      text="Редактировать объект"
      link={editElementLink}
      isNavLink
    />
  );
};

export default EditElementButton;
