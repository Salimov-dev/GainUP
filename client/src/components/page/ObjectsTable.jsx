import React, { useEffect, useState } from "react";
// Librares
import { useSelector } from "react-redux";
import _ from "lodash";
// Utils
import { paginate } from "../../utils/paginate";
// Hooks
import useSearch from "../../hooks/useSearchObjects";
// UI
import ObjectsTableControl from "../UI/controlBlocks/ObjectsTableControl/ObjectsTableControl";
import ScrollToTop from "../UI/scrollToTop/ScrollToTop";
// Components
import { Adress, Date, Status } from "../common/table/helpers";
import PhoneNumber from "../common/table/helpers/PhoneNumber";
import Pagination from "../common/pagination/Pagination";
import District from "../common/table/helpers/District";
import TableHeader from "../common/table/TableHeader";
// import Bookmark from "../common/bookmark/Bookmark";
import TableBody from "../common/table/TableBody";
import { QuantityOnPage } from "../common/forms";
import Button from "../common/buttons/button";
import Header from "../common/Header";
// Store
import { getStatusObject } from "../../store/statusObject.store";
import { getObjectsList } from "../../store/objects.store";
import ManagerName from "../common/table/helpers/ManagerName";
import ContactName from "../common/table/helpers/ContactName";
import Navbar from "../UI/navbar/Navbar";
import { getCurrentUserData } from "../../store/users.store";
import { Navigate } from "react-router-dom";

const ObjectsTable = () => {
  const objects = useSelector(getObjectsList());
  const currentUser = useSelector(getCurrentUserData());
  const status = useSelector(getStatusObject());
  const [objInBookmark, setObjInBookmark] = useState();
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedStatus, setSelectedStatus] = useState();
  const [pageSizePagination, setPageSizePagination] = useState(
    localStorage.getItem("QuantityObjectsOnPage") || 5
  );
  const [sortBy, setSortBy] = useState({ path: "date", order: "asc" });
  const [inBookmark, setInBookmark] = useState(
    JSON.parse(localStorage.getItem("inBookmark"))
  );
  const [searchQuery, setSearchQuery] = useState({
    dateStart: "",
    dateEnd: "",
    adress: "",
    city: [],
    district: [],
    name: "",
    phone: "",
  });
  const { searchedObjects } = useSearch(searchQuery);
  const [isDarkMode, setIsDarkMode] = useState();

  useEffect(() => {
    setPageSizePagination(localStorage.getItem("QuantityObjectsOnPage") || 5);
    setIsDarkMode(localStorage.getItem("darkMode"));
    setSortBy({ order: "desc", path: "created_at" });
  }, []);

  // const inBookmarksObjects = Object.keys(objects)?.filter((obj) => obj.bookmark);
  const inBookmarksObjects = objects.filter((obj) => obj.bookmark);

  useEffect(() => {
    setObjInBookmark(inBookmarksObjects);
  }, [objects]);

  const getBookmarkObjects = () => {
    setInBookmark(!inBookmark);
    localStorage.setItem("inBookmark", JSON.stringify(!inBookmark));
  };

  function getStatusObjectById(id) {
    return status.find((s) => s._id === id);
  }
  const filteredObjects = () => {
    if (selectedStatus) {
      return searchedObjects.filter(
        (obj) => getStatusObjectById(obj.status).name === selectedStatus.name
      );
    }
    return searchedObjects;
  };

  const sortedUsers = _.orderBy(
    filteredObjects(),
    [sortBy.path],
    [sortBy.order]
  );

  const columns = {
    number: {
      path: "",
      name: "№",
      component: (obj) => <strong>{number.indexOf(obj._id) + 1}</strong>,
    },
    date: {
      path: "created_at",
      name: "Дата",
      component: (obj) => <Date date={obj.created_at} />,
    },
    manager: {
      path: "userId",
      name: "Менеджер",
      component: (obj) => <ManagerName id={obj.userId} />,
    },
    city: { path: "location.city", name: "Город" },

    district: {
      path: "location.district",
      name: "Район",
      component: (obj) => <District id={obj.location.district} />,
    },
    // bookmark: {
    //   path: "",
    //   name: "",
    //   component: (obj) => (
    //     <Bookmark
    //       objects={obj}
    //       inBookmark={inBookmark}
    //       objInBookmark={objInBookmark}
    //       onToggleBookmark={hadleToggleBookmark}
    //     />
    //   ),
    // },
    adress: {
      path: "location.adress",
      name: "Адрес",
      component: (obj) => <Adress adress={obj.location.adress} />,
    },
    status: {
      path: "status.name",
      name: "Статус",
      component: (obj) => <Status id={obj.status} />,
    },
    comment: { path: "description.comment", name: "Комментарий" },
    phone: {
      name: "Телефон",
      component: (obj) => <PhoneNumber number={obj.contact.phone} />,
    },
    contact: {
      path: "contact.name",
      name: "Контакт",
      component: (obj) => <ContactName name={obj.contact.name} />,
    },
    open: {
      component: (obj) => (
        <Button
          styles="outline-success btn-sm"
          text="Открыть"
          link={`/objects/${obj._id}`}
          isNavLink
        />
      ),
    },
  };

  const count = sortedUsers.length;
  let objectsCrop = paginate(sortedUsers, currentPage, pageSizePagination);
  const number = sortedUsers.map((obj) => {
    return obj._id;
  });

  // const hadleToggleBookmark = (id) => {
  //   const inBookmarkObj = objects.map((object) => {
  //     if (object.id === id) {
  //       return { ...object, bookmark: !object.bookmark };
  //     }
  //     return object;
  //   });

  //   localStorage.setItem("objectsArr", JSON.stringify(inBookmarkObj));
  //   const inBookmarksObjects = objects.filter((obj) => obj.bookmark);
  //   setObjInBookmark(inBookmarksObjects);
  //   // setObjects(inBookmarkObj);

  //   if (objInBookmark)
  //     setObjInBookmark(
  //       objInBookmark.filter((obj) => obj.id !== id),
  //       objInBookmark.map((object) => {
  //         if (object.id === id) {
  //           return { ...object, bookmark: !object.bookmark };
  //         }
  //         return object;
  //       })
  //     );
  // };

  const handleClearFilter = () => {
    setSelectedStatus();
  };

  const handleStatusSelect = (item) => {
    setSelectedStatus(item);
  };

  const handlePageChange = (pageIndex) => {
    setCurrentPage(pageIndex);
  };

  const handleSort = (item) => {
    setSortBy(item);
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [currentPage]);

  useEffect(() => {
    if (objectsCrop.length === 0 && currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  }, [objects, currentPage, objectsCrop.length]);

  useEffect(() => {
    setCurrentPage(1);
  }, [searchQuery, inBookmark, pageSizePagination, selectedStatus]);

  return (
    <>
      {currentUser ? (
        <>
          {" "}
          <Navbar />
          <div className="container-fluid">
            <Header
              title={selectedStatus ? selectedStatus.name : "Все объекты"}
            />
            <QuantityOnPage
              pageSize={pageSizePagination}
              setPageSize={setPageSizePagination}
              items={objects}
              label="Показать на странице по:"
              name="QuantityObjectsOnPage"
              options={[5, 10, 15, 25]}
            />
            {status && (
              <ObjectsTableControl
                allObjects={objects}
                items={status}
                onItemSelect={handleStatusSelect}
                selectedStatus={selectedStatus}
                onClearFilter={handleClearFilter}
                inBookmark={inBookmark}
                objInBookmark={objInBookmark}
                getBookmarkObjects={getBookmarkObjects}
                searchQuery={searchQuery}
                setSearchQuery={setSearchQuery}
                searchedObjects={searchedObjects}
              />
            )}
            <div className="pt-2">
              {objectsCrop.length ? (
                <>
                  <table className="table table-striped table-hover">
                    <TableHeader
                      onSort={handleSort}
                      selectedSort={sortBy}
                      columns={columns}
                    />
                    <TableBody objects={objectsCrop} columns={columns} />
                  </table>
                  <Pagination
                    objects={objects}
                    itemsCount={count}
                    pageSize={pageSizePagination}
                    currentPage={currentPage}
                    setCurrentPage={setCurrentPage}
                    onPageChange={handlePageChange}
                  />
                </>
              ) : (
                <h6>Объекты не обнаружены</h6>
              )}
            </div>
            <ScrollToTop />
          </div>
        </>
      ) : (
        <Navigate to="/auth/login" />
      )}
    </>
  );
};

export default ObjectsTable;
