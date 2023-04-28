import { orderBy } from "lodash";
import React from "react";
import Select from "react-select";

const MultiSelectField = ({
  label,
  options,
  onChange,
  name,
  placeholder,
  defaultValue,
  value,
}) => {
  const optionsArray =
    !Array.isArray(options) && typeof options === "object"
      ? Object.keys(options).map((optionName) => ({
          label: options[optionName].name,
          value: options[optionName].id,
        }))
      : options.map((optionName) => ({
          label: optionName.name ? optionName.name : optionName,
          value: optionName.id ? optionName.id : optionName,
        }));

  const sortedOptionsArray = orderBy(optionsArray, ["label"], ["asc"]);

  const handleChange = (value) => {
    onChange({ name: name, value });
  };

  return (
    <div className="container-fluid p-0">
      {label ? (
        <div>
          <label htmlFor={name} className="mb-1">
            {label}
          </label>
        </div>
      ) : null}

      <Select
        isMulti
        name={name}
        value={value}
        onChange={handleChange}
        closeMenuOnSelect={false}
        placeholder={placeholder}
        options={sortedOptionsArray}
        className="basic-multi-select"
        classNamePrefix="select"
      />
    </div>
  );
};

export default MultiSelectField;
