import React from "react";

const Adress = ({ adress }) => {
  const getClassNoWrap = () => {
    if (adress.length > 25) {
      return null;
    }
    return "text-nowrap padding";
  };
  return <div className={getClassNoWrap()}>{adress}</div>;
};

export default Adress;
