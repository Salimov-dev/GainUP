import React from "react";

const AddFile = ({
  label,
  name,
  style,
  error,
  onChange,
  value,
  hasValidation,
}) => {
  const getInputClasses = () => {
    return "form-control" + (error ? " is-invalid" : " is-valid");
  };

  return (
    <div className="input-group mb-3 d-flex flex-column">
      <div>
        <label className="mb-1">{label}</label>
      </div>
      <div className="d-flex flex-column has-validation">
        <input
          id={name}
          name={name}
          value={value}
          type="file"
          className={hasValidation ? getInputClasses() : "form-control"}
          aria-label="file example"
          style={style}
          onChange={onChange}
          required
        />
        {error && <div className="invalid-feedback">{error}</div>}
      </div>
    </div>
  );
};

export default AddFile;
