import React from "react";

const CheckBox = ({ name, value, onChange, children }) => {
  const handleChange = () => {
    onChange({ name: name, value: !value });
  };

  return (
    <div className="form-check mb-3">
      <input
        className="form-check-input"
        type="checkbox"
        id={name}
        checked={value}
        onChange={handleChange}
      />
      <label className="form-check-label" htmlFor={name}>
        {children}
      </label>
    </div>
  );
};

export default CheckBox;
