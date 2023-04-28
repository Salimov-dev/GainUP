import React, { useState } from "react";

const InputField = ({
  label,
  type = "text",
  name,
  value,
  placeholder,
  onChange,
  error,
  maxLength,
  style,
  onKeyDown,
  disabled,
  hasValidation,
  tooltipTitle,
  options,
  autoFocus,
  addon,
  ...rest
}) => {
  const [showPassword, setShowPassword] = useState(false);
  const getInputClasses = () => {
    return "form-control" + (!options && error ? " is-invalid" : " is-valid");
  };

  const handleChange = ({ target }) => {
    onChange({ name: target.name, value: target.value });
  };
  const toggleShowPassword = () => {
    setShowPassword((prevState) => !prevState);
  };

  return (
    <div className="input-group d-flex flex-column mb-3" style={style}>
      {label && (
        <div>
          <label htmlFor={name} className="mb-1" title={tooltipTitle}>
            {label}
          </label>
        </div>
      )}
      <div className="input-group has-validation">
        {addon && (
          <span className="input-group-text" id="basic-addon1">
            {addon}
          </span>
        )}
        <input
          value={options ? options : value}
          id={name}
          type={showPassword ? "text" : type}
          name={name}
          maxLength={maxLength}
          autoFocus={autoFocus}
          className={hasValidation ? getInputClasses() : "form-control"}
          placeholder={placeholder}
          onChange={handleChange}
          onKeyDown={(event) => onKeyDown(event)}
          disabled={disabled}
          data-bs-toggle="tooltip"
          data-bs-placement="top"
          {...rest}
        />
        {type === "password" && (
          <button
            className="btn btn-outline-secondary has-validation"
            type="button"
            onClick={toggleShowPassword}
          >
            <i className={"bi bi-eye" + (showPassword ? "-slash" : "")}></i>
          </button>
        )}
        {error ? <div className="invalid-feedback">{error}</div> : <br />}
      </div>
    </div>
  );
};

export default InputField;
