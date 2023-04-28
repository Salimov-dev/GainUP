import React from "react";
import Button from "../../../common/buttons/button";

const AddNewManagerButton = () => {
  return (
    <Button
      styles="success"
      text="Добавить менеджера"
      link={`/managers/create`}
      isNavLink
    />
  );
};

export default AddNewManagerButton;
