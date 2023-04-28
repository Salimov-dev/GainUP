import React from "react";

const RadioField = ({ label, options, name, onChange, value, onKeyDown }) => {
  const handleChange = ({ target }) => {
    onChange({ name: target.name, value: target.value });
  };
  return (
    <div>
      <label className="form-label me-1">{label}</label>
      {options.map((option) => (
        <div
          key={option.name + "_" + option.value}
          className="form-check form-check-inline"
        >
          <input
            className="form-check-input"
            type="radio"
            name={name}
            id={option.name + "_" + option.value}
            checked={option.value === value}
            value={option.value}
            onChange={handleChange}
            onKeyDown={(event) => onKeyDown(event)}
          />
          <label
            className="form-check-label"
            htmlFor={option.name + "_" + option.value}
          >
            {option.name}
          </label>
        </div>
      ))}
    </div>
  );
};

export default RadioField;
