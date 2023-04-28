import React from "react";
import Button from "../../../common/buttons/button";

const AddNewObjectButton = () => {
  return (
    <Button
      styles="info"
      text="Создать объект"
      link={`/objects/create`}
      isNavLink
    />
  );
};

export default AddNewObjectButton;
