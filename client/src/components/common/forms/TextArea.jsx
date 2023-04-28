import React from "react";

const TextArea = ({
  value,
  label,
  type = "text",
  name,
  placeholder,
  onChange,
  style,
  error,
  maxLength,
  onKeyDown,
  autoFocus,
  hasValidation,
}) => {
  const getInputClasses = () => {
    return "form-control" + (error ? " is-invalid" : " is-valid");
  };

  const handleChange = ({ target }) => {
    onChange({ name: target.name, value: target.value });
  };

  return (
    <div className="input-group mb-3 d-flex flex-column">
      <div>
        <label htmlFor={name} className="mb-1">
          {label}
        </label>
      </div>
      <div>
        <textarea
          value={value}
          id={name}
          type={type}
          name={name}
          style={style}
          autoFocus={autoFocus}
          maxLength={maxLength}
          className={hasValidation ? getInputClasses() : "form-control"}
          placeholder={placeholder}
          onChange={handleChange}
          onKeyDown={(event) => onKeyDown(event)}
        ></textarea>
        {error && <div className="invalid-feedback">{error}</div>}
      </div>
    </div>
  );
};

export default TextArea;
