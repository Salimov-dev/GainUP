import React from "react";
import SearchForm from "../../common/forms/SearchForm";
import { QuantityOnPage } from "../../common/forms";
import AddNewMeetingButton from "./buttons/AddNewMeetingButton";
import {
  AllItemsButton,
  SelectStatusButton,
} from "../../common/buttons/tableButtons";

const MeetingsListControl = ({
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
        name="QuantityMeetingsOnPage"
        options={[5, 10, 15, 25]}
      />
      <div>
        <ul className="nav nav-pills mb-1 d-flex align-items-center">
          <AddNewMeetingButton />
          <AllItemsButton
            selectedStatus={selectedStatus}
            onClearFilter={onClearFilter}
            link="/meetings"
            text="Все встречи"
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
          placeholder="Найти по адресу"
          name="adress"
          onChange={handleChange}
          value={searchQuery.adress}
          autoFocus
        />
      </form>
    </>
  );
};

export default MeetingsListControl;
