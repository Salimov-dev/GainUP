import React from "react";
import _ from "lodash";

const SelectField = ({
  label,
  name,
  onChange,
  value,
  error,
  defaultOption,
  options,
  style,
  onKeyDown,
  hasValidation,
  disabled
}) => {
  const getInputClasses = () => {
    return "form-select" + (error ? " is-invalid" : " is-valid");
  };

  const handleChange = ({ target }) => {
    onChange({ name: target.name, value: target.value });
  };

  const optionsArray =
    !Array.isArray(options) && typeof options === "object"
      ? Object.keys(options).map((optionName) => ({
          id: options[optionName].id,
          name: options[optionName].name,
        }))
      : options;

  const sortedOptionsArray = _.sortBy(optionsArray, ["label"], ["asc"]);

  return (
    <div className="container p-0" style={style}>
      <label htmlFor={name} className="form-label mb-1">
        {label}
      </label>
      <select
        className={hasValidation ? getInputClasses() : "form-select"}
        id={name}
        value={value}
        name={name}
        onChange={handleChange}
        onKeyDown={(event) => onKeyDown(event)}
        disabled={disabled}
      >
        <option disabled value="">
          {defaultOption}
        </option>
        {optionsArray &&
          sortedOptionsArray.map((option) => (
            <option value={option.value} key={option.label}>
              {option.label}
            </option>
          ))}
      </select>
      {error && <div className="invalid-feedback">{error}</div>}
    </div>
  );
};

export default SelectField;
