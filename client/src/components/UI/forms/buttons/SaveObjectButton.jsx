import React from "react";

const SaveObjectButton = ({ data, onEditObject, editObject }) => {
  return editObject ? (
    <button
      className="btn btn-primary"
      onClick={(e) => {
        onEditObject(e, data);
      }}
    >
      Сохранить
    </button>
  ) : null;
};

export default SaveObjectButton;
