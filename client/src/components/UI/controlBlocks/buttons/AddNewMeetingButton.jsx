import React from "react";
import Button from "../../../common/buttons/button";

const AddNewMeetingButton = () => {
  return (
    <Button
      styles="success"
      text="Добавить встречу"
      link={`/meetings/create`}
      isNavLink
    />
  );
};

export default AddNewMeetingButton;
