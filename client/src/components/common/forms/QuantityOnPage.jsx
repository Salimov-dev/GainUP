import React from "react";

const QuantityOnPage = ({
  items,
  pageSize,
  setPageSize,
  label,
  name,
  options,
}) => {
  const handleChange = ({ target }) => {
    setPageSize(Number(target.value));
    localStorage.setItem(name, JSON.stringify(Number(target.value)));
  };

  return (
    <form>
      <div className="d-flex align-items-center">
        <div className="me-1">
          <label>{label}</label>
        </div>
        <div>
          <select
            className="form-select"
            id={name}
            name={name}
            style={{ width: "80px" }}
            aria-label="Default select example"
            onChange={handleChange}
            value={pageSize}
          >
            {options.map((item) => (
              <option key={item} value={item}>
                {item}
              </option>
            ))}
            <option value={items.length}>все</option>
          </select>
        </div>
      </div>
    </form>
  );
};

export default QuantityOnPage;
