import React from "react";
// Styles
import "./styles.css";
// Librares
import { useSelector } from "react-redux";
// Components
import AddNewObjectButton from "../buttons/AddNewObjectButton";
import SearchObjectBlock from "./SearchObjectBlock";
import {
  AllItemsButton,
  // InBookmarksButton,
  SelectStatusButton,
} from "../../../common/buttons/tableButtons";
// Store
import { getDistrictsSpbLO } from "../../../../store/districtsSpbLO.store";

const ObjectsTableControl = ({
  allObjects,
  items,
  onItemSelect,
  selectedStatus,
  onClearFilter,
  // inBookmark,
  // getBookmarkObjects,
  searchQuery,
  setSearchQuery,
}) => {
  const districtsSpbLO = useSelector(getDistrictsSpbLO());

  const getCitysArray = () => {
    function getCitysList(objects) {
      const citysArray = [...new Set(objects?.map((obj) => obj.location.city))];
      const transformArray = citysArray.map((city) => ({
        id: city,
        name: city,
      }));
      return transformArray;
    }
    return getCitysList(allObjects);
  };

  function getDistrictsSpbLOByIds(id) {
    return districtsSpbLO?.find((d) => d._id === id);
  }
  const getDistrictsArray = () => {
    function getDictrictsList(objects) {
      const distictsArray = [
        ...new Set(objects?.map((obj) => obj.location.district)),
      ];
      const transformArray = distictsArray.map((dist) => ({
        id: dist,
        name: getDistrictsSpbLOByIds(dist)?.name,
      }));
      return transformArray;
    }
    return getDictrictsList(allObjects);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  const handleChange = (target) => {
    setSearchQuery((prevState) => ({
      ...prevState,
      [target.name]: target.value,
    }));
  };

  const handleClearSearchField = () => {
    setSearchQuery({
      dateStart: "",
      dateEnd: "",
      adress: "",
      city: "",
      district: "",
      name: "",
      phone: "",
    });
  };

  return (
    <>
      <div style={{ marginBottom: "-16px" }}>
        <ul className="nav nav-pills mb-1 d-flex align-items-center">
          <AddNewObjectButton />
          {/* <InBookmarksButton
            inBookmark={inBookmark}
            getBookmarkObjects={getBookmarkObjects}
          /> */}
          <AllItemsButton
            selectedStatus={selectedStatus}
            onClearFilter={onClearFilter}
            link="/"
            text="Все объекты"
          />
          <SelectStatusButton
            items={items}
            selectedStatus={selectedStatus}
            onItemSelect={onItemSelect}
          />
        </ul>
      </div>
      <SearchObjectBlock
        onSubmit={handleSubmit}
        handleClearSearchField={handleClearSearchField}
        onChange={handleChange}
        searchQuery={searchQuery}
        // getCitysArray={citysArray}
        // getDistrictsArray={districtsArray}
        getCitysArray={getCitysArray()}
        getDistrictsArray={getDistrictsArray()}
      />
    </>
  );
};

export default ObjectsTableControl;
