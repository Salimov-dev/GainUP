import React from "react";
import SearchForm from "../../common/forms/SearchForm";
import { QuantityOnPage } from "../../common/forms";
import AddNewManagerButton from "./buttons/AddNewManagerButton";
import {
  AllItemsButton,
  SelectStatusButton,
} from "../../common/buttons/tableButtons";

const ManagerListControl = ({
  pageSizePagination,
  setPageSizePagination,
  users,
  selectedStatus,
  onClearFilter,
  onItemSelect,
  items,
  searchQuery,
  setSearchQuery,
}) => {
  const handleSubmit = (e) => {
    e.preventDefault();
  };

  const handleChange = (target) => {
    setSearchQuery((prevState) => ({
      ...prevState,
      [target.name]: target.value,
    }));
  };

  return (
    <>
      <QuantityOnPage
        pageSize={pageSizePagination}
        setPageSize={setPageSizePagination}
        items={users}
        label="Показать на странице по:"
        name="QuantityManagersOnPage"
        options={[5, 10, 15, 25]}
      />
      <div>
        <ul className="nav nav-pills mb-1 d-flex align-items-center">
          <AddNewManagerButton />
          <AllItemsButton
            selectedStatus={selectedStatus}
            onClearFilter={onClearFilter}
            link="/managers"
            text="Все менеджеры"
          />
          <SelectStatusButton
            items={items}
            selectedStatus={selectedStatus}
            onItemSelect={onItemSelect}
          />
        </ul>
      </div>
      <form onSubmit={handleSubmit}>
        <SearchForm
          placeholder="Найти по фамилии"
          name="lastName"
          onChange={handleChange}
          value={searchQuery.lastName}
          autoFocus
        />
      </form>
    </>
  );
};

export default ManagerListControl;
