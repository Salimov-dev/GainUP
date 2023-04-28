import React, { useEffect, useMemo, useState } from "react";
// Librares
import { useSelector } from "react-redux";
import _ from "lodash";
// Utils
import { paginate } from "../utils/paginate";
// Components
import ManagerListControl from "../components/UI/controlBlocks/ManagerControlBlock";
import UserAccessRoot from "../components/common/table/helpers/UserAccessRoot";
import ManagerStatus from "../components/common/table/helpers/ManagerStatus";
import PhoneNumber from "../components/common/table/helpers/PhoneNumber";
import Pagination from "../components/common/pagination/Pagination";
import TableHeader from "../components/common/table/TableHeader";
import TableBody from "../components/common/table/TableBody";
import { Date } from "../components/common/table/helpers";
import Button from "../components/common/buttons/button";
import Navbar from "../components/UI/navbar/Navbar";
import Header from "../components/common/Header";
// Store
import { getCurrentUserId, getUsersList } from "../store/users.store";
import { getManagersStatus } from "../store/managerStatus.store";
import QuantityOfMeetings from "../components/common/table/helpers/QuantityOfMeetings";
import QuantityOfObjects from "../components/common/table/helpers/QuantityOfObjects";

const Managers = () => {
  const users = useSelector(getUsersList());
  const currentUserId = useSelector(getCurrentUserId());
  const [sortBy, setSortBy] = useState({ path: "date", order: "asc" });
  const [pageSizePagination, setPageSizePagination] = useState(5);
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedStatus, setSelectedStatus] = useState();
  const managersStatus = useSelector(getManagersStatus());
  const [searchQuery, setSearchQuery] = useState({
    lastName: "",
  });

  const withoutCurrentUser = users

  const searchedUsers = useMemo(() => {
    let searchQueryArray = users.filter((user) => user._id !== currentUserId);
    if (searchQuery.lastName.length > 0) {
      searchQueryArray = searchQueryArray.filter((user) =>
        user.lastName.toLowerCase().includes(searchQuery.lastName.toLowerCase())
      );
    }
    return searchQueryArray;
  }, [searchQuery, withoutCurrentUser]);

  function getManagersStatusById(id) {
    return managersStatus.find((s) => s._id === id);
  }
  const filteredUsers = () => {
    if (selectedStatus) {
      return searchedUsers.filter(
        (user) =>
          getManagersStatusById(user.managerStatus).name === selectedStatus.name
      );
    }
    return searchedUsers;
  };

  const sortedUsers = _.orderBy(filteredUsers(), [sortBy.path], [sortBy.order]);

  const number = sortedUsers.map((user) => {
    return user._id;
  });

  const columns = {
    number: {
      path: "",
      name: "№",
      component: (user) => <strong>{number.indexOf(user._id) + 1}</strong>,
    },
    startDateOfJobOffer: {
      path: "startDateOfJobOffer",
      name: "Дог. от:",
      component: (user) => <Date date={user.startDateOfJobOffer} />,
    },
    expiresDateOfJobOffer: {
      path: "expiresDateOfJobOffer",
      name: "Дог. по:",
      component: (user) => <Date date={user.expiresDateOfJobOffer} />,
    },
    lastName: {
      path: "lastName",
      name: "Фамилия",
    },
    firstName: {
      path: "firstName",
      name: "Имя",
    },
    position: {
      path: "userAccessRoot",
      name: "Позиция",
      component: (user) => <UserAccessRoot id={user.userAccessRoot} />,
    },
    managerStatus: {
      path: "managerStatus",
      name: "Статус",
      component: (user) => <ManagerStatus id={user.managerStatus} />,
    },
    quantityOfOpenStore: {
      path: "quantityOfOpenStore",
      name: "Магз:",
    },
    quantityOfMeetings: {
      path: "quantityOfMetings",
      name: "Встр:",
      component: (user) => <QuantityOfMeetings id={user._id} />,
    },
    quantityOfObjects: {
      path: "quantityOfObjects",
      name: "Обкт:",
      component: (user) => <QuantityOfObjects id={user._id} />,
    },
    email: {
      path: "email",
      name: "Email",
    },
    phoneNumber: {
      name: "Номер телефона",
      component: (user) => <PhoneNumber number={user.phoneNumber} />,
    },
    dateOfStartVacation: {
      path: "dateOfStartVacation",
      name: "Отпуск от:",
      component: (user) => <Date date={user.dateOfStartVacation} />,
    },
    dateOfEndVacation: {
      path: "dateOfEndVacation",
      name: "Отпуск по:",
      component: (user) => <Date date={user.dateOfEndVacation} />,
    },
    open: {
      component: (user) => (
        <Button
          styles="outline-success btn-sm"
          text="Редактировать"
          link={`/managers/${user._id}/edit`}
          isNavLink
        />
      ),
    },
  };

  const count = sortedUsers.length;
  let usersCrop = paginate(sortedUsers, currentPage, pageSizePagination);
  const handlePageChange = (pageIndex) => {
    setCurrentPage(pageIndex);
  };

  const handleSort = (item) => {
    setSortBy(item);
  };

  const handleClearFilter = () => {
    setSelectedStatus();
  };

  const handleStatusSelect = (item) => {
    setSelectedStatus(item);
  };

  useEffect(() => {
    setPageSizePagination(localStorage.getItem("QuantityManagersOnPage") || 5);
    setSortBy({ order: "desc", path: "expiresDateOfJobOffer" });
  }, []);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [currentPage]);

  useEffect(() => {
    if (usersCrop.length === 0 && currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  }, [users, currentPage, usersCrop.length]);

  return (
    <>
      <Navbar />
      <div className="container-fluid p-3">
        <Header title={"Список менеджеров"} />
        <div className="pt-2">
          <ManagerListControl
            pageSizePagination={pageSizePagination}
            setPageSizePagination={setPageSizePagination}
            selectedStatus={selectedStatus}
            onClearFilter={handleClearFilter}
            onItemSelect={handleStatusSelect}
            items={managersStatus}
            users={withoutCurrentUser}
            setSearchQuery={setSearchQuery}
            searchQuery={searchQuery}
          />
          {usersCrop.length ? (
            <table className="table table-striped">
              <TableHeader
                onSort={handleSort}
                selectedSort={sortBy}
                columns={columns}
              />
              <TableBody objects={usersCrop} columns={columns} />
            </table>
          ) : (
            <h6>Менеджеры не обнаружены</h6>
          )}
          <Pagination
            objects={withoutCurrentUser}
            itemsCount={count}
            pageSize={pageSizePagination}
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
            onPageChange={handlePageChange}
          />
        </div>
      </div>
    </>
  );
};

export default Managers;
