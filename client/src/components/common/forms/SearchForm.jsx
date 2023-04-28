import React from "react";
import { handleKeyDown } from "../../../utils/handleKeyDown";
import InputField from "./InputField";

const SearchForm = ({ placeholder, name, onChange, value, autoFocus }) => {
  return (
    <InputField
      placeholder={placeholder}
      name={name}
      onChange={onChange}
      value={value}
      onKeyDown={handleKeyDown}
      autoFocus
    />
  );
};

export default SearchForm;
