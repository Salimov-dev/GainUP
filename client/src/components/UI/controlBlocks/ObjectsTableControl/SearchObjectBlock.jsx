import React from "react";
// Librares
import { useDispatch, useSelector } from "react-redux";
// Utils
import { handleKeyDown } from "../../../../utils/handleKeyDown";
// Components
import { InputField, MultiSelectField } from "../../../common/forms";
import HideAdvancedSearchBtn from "./buttons/HideAdvancedSearchBtn";
import ShowAdvancedSearchBtn from "./buttons/ShowAdvancedSearchBtn";
import { VerticalDividerForm } from "../../../common/dividers";
import Button from "../../../common/buttons/button";
// Store
import {
  getIsHideAdvObjSearchBlock,
  toggleHideAdvObjSearchBlock,
  toggleShowAdvObjSearchBlock,
} from "../../../../store/hideAdvObjSearchBlock.store";

const SearchObjectBlock = ({
  onSubmit,
  handleClearSearchField,
  onChange,
  searchQuery,
  getCitysArray,
  getDistrictsArray,
}) => {
  const dispatch = useDispatch();

  const isHideAdvancedSearchBlock = JSON.parse(
    useSelector(getIsHideAdvObjSearchBlock())
  );

  const toggleShowAdvancedSearch = () => {
    localStorage.setItem("isHideAdvObjSearchBlock", JSON.stringify(false));
    dispatch(toggleShowAdvObjSearchBlock());
  };

  const toggleHideAdvancedSearch = () => {
    localStorage.setItem("isHideAdvObjSearchBlock", JSON.stringify(true));
    dispatch(toggleHideAdvObjSearchBlock());
  };
  return (
    <form onSubmit={onSubmit}>
      <div className="d-flex" style={{ marginRight: "-3px" }}>
        <div
          className="d-flex container-fluid p-0 justify-content-between align-items-sm-center"
          style={{ marginBottom: "-8px" }}
        >
          {isHideAdvancedSearchBlock ? (
            <HideAdvancedSearchBtn
              onHideAdvancedSearch={toggleHideAdvancedSearch}
            />
          ) : (
            <ShowAdvancedSearchBtn
              onShowAdvancedSearch={toggleShowAdvancedSearch}
            />
          )}

          <Button
            onClick={handleClearSearchField}
            styles="light btn-sm"
            text="Очистить"
          />
          <div className="d-flex container-fluid mt-3 p-0">
            <InputField
              placeholder="Найти по адресу..."
              name="adress"
              onChange={onChange}
              value={searchQuery.adress}
              onKeyDown={handleKeyDown}
              autoFocus={true}
            />
          </div>
        </div>
      </div>
      {isHideAdvancedSearchBlock && (
        <div className="container-fluid p-0 advancedSearch__container">
          <div
            className="d-flex"
            style={{ marginRight: "-3px", marginBottom: "-8px" }}
          >
            <InputField
              label="Начало периода:"
              type="date"
              name="dateStart"
              onChange={onChange}
              value={searchQuery.dateStart}
              onKeyDown={handleKeyDown}
            />
            <VerticalDividerForm />
            <InputField
              label="Конец периода:"
              type="date"
              name="dateEnd"
              onChange={onChange}
              value={searchQuery.dateEnd}
              onKeyDown={handleKeyDown}
            />
            <VerticalDividerForm />
            <InputField
              label="По имени:"
              placeholder="Искать по имени"
              name="name"
              onChange={onChange}
              value={searchQuery.name}
              onKeyDown={handleKeyDown}
            />
            <VerticalDividerForm />
            <InputField
              label="По телефону:"
              placeholder="Искать по телефону"
              name="phone"
              onChange={onChange}
              value={searchQuery.phone}
              onKeyDown={handleKeyDown}
            />
          </div>
          <div className="d-flex">
            <MultiSelectField
              label="По городу:"
              options={getCitysArray}
              onChange={onChange}
              name="city"
              value={searchQuery.city}
              placeholder="Искать по городу"
            />
            <VerticalDividerForm />
            <MultiSelectField
              label="По району:"
              options={getDistrictsArray}
              onChange={onChange}
              name="district"
              value={searchQuery.district}
              placeholder="Искать по району"
            />
          </div>
        </div>
      )}
    </form>
  );
};

export default SearchObjectBlock;
