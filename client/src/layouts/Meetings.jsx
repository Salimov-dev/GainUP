/* eslint-disable no-undef */
import React, { useEffect, useMemo, useState } from "react";
// Librares
import { useSelector } from "react-redux";
import dayjs from "dayjs";
import _ from "lodash";
// Utils
import { paginate } from "../utils/paginate";
// Components
import MeetingsListControl from "../components/UI/controlBlocks/MeetingsControlBlock";
import MeetingStatus from "../components/common/table/helpers/MeetingStatus";
import ManagerName from "../components/common/table/helpers/ManagerName";
import Pagination from "../components/common/pagination/Pagination";
import District from "../components/common/table/helpers/District";
import TableHeader from "../components/common/table/TableHeader";
import { Adress, Date } from "../components/common/table/helpers";
import TableBody from "../components/common/table/TableBody";
import Button from "../components/common/buttons/button";
import Navbar from "../components/UI/navbar/Navbar";
import Header from "../components/common/Header";
// Icons
import target from "../img/location/target.png";
import target_cluster from "../img/location/target_cluster.png";
// Store
import { getMeetingStatus } from "../store/meetingStatus.store";
import { getMeetingsList } from "../store/meetings.store";
import { getUsersList } from "../store/users.store";

const Meetings = () => {
  const users = useSelector(getUsersList());
  const meetings = useSelector(getMeetingsList());
  const meetingsStatus = useSelector(getMeetingStatus());
  const [sortBy, setSortBy] = useState({ path: "date", order: "asc" });
  const [pageSizePagination, setPageSizePagination] = useState(5);
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedStatus, setSelectedStatus] = useState();
  const [searchQuery, setSearchQuery] = useState({
    adress: "",
  });

  const searchedMeetings = useMemo(() => {
    let searchQueryArray = [];
    searchQueryArray = [...meetings];
    if (searchQuery.adress.length > 0) {
      searchQueryArray = searchQueryArray.filter((meet) =>
        meet.location.adress
          .toLowerCase()
          .includes(searchQuery.adress.toLowerCase())
      );
    }
    return searchQueryArray;
  }, [searchQuery, meetings]);

  function getMeetingStatusById(id) {
    return meetingsStatus.find((s) => s._id === id);
  }

  const filteredUMeetings = () => {
    if (selectedStatus) {
      return searchedMeetings.filter(
        (meet) =>
          getMeetingStatusById(meet.meetingsStatus).name === selectedStatus.name
      );
    }
    return searchedMeetings;
  };

  const sortedMeetings = _.orderBy(
    filteredUMeetings(),
    [sortBy.path],
    [sortBy.order]
  );

  const number = sortedMeetings.map((meet) => {
    return meet._id;
  });

  const columns = {
    number: {
      path: "",
      name: "№",
      component: (meet) => <strong>{number.indexOf(meet._id) + 1}</strong>,
    },
    date: {
      path: "created_at",
      name: "Дата внесения",
      component: (meet) => <Date date={meet.created_at} />,
    },
    createdAtmanager: {
      path: "userId",
      name: "Менеджер",
      component: (meet) => <ManagerName id={meet.userId} />,
    },
    meetingsStatus: {
      path: "meetingsStatus",
      name: "Статус",
      component: (meet) => <MeetingStatus id={meet.meetingsStatus} />,
    },
    dateOfMeeting: {
      path: "dateOfMeeting",
      name: "Дата встречи",
      component: (meet) => <Date date={meet.dateOfMeeting} />,
    },
    timeOfMeeting: {
      path: "timeOfMeeting",
      name: "Время",
    },
    city: { path: "location.city", name: "Город" },
    adress: {
      path: "location.adress",
      name: "Адрес",
      component: (meet) => <Adress adress={meet.location.adress} />,
    },
    district: {
      path: "location.district",
      name: "Район",
      component: (meet) => <District id={meet.location.district} />,
    },
    comment: {
      path: "comment",
      name: "Комментарий",
    },
    open: {
      component: (meet) => (
        <Button
          styles="outline-success btn-sm"
          text="Редактировать"
          link={`/meetings/${meet._id}/edit`}
          isNavLink
        />
      ),
    },
  };

  const count = sortedMeetings.length;
  let meetingsCrop = paginate(sortedMeetings, currentPage, pageSizePagination);
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
    setPageSizePagination(localStorage.getItem("QuantityMeetingsOnPage") || 5);
    setSortBy({ order: "desc", path: "dateOfMeeting" });
  }, []);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [currentPage]);

  useEffect(() => {
    if (meetingsCrop.length === 0 && currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  }, [users, currentPage, meetingsCrop.length]);

  function managerName(id) {
    const user = users.find((user) => user._id === id);
    return user?.lastName + " " + user?.firstName;
  }

  let geoObjects = [];
  function showAllMeetings() {
    const mapMeetings = new ymaps.Map("map__objects", {
      center: [59.930320630519155, 30.32906024941998],
      zoom: 11,
    });

    for (let i = 0; i < meetings.length; i++) {
      geoObjects[i] = new ymaps.Placemark(
        [meetings[i].location.latitude, meetings[i].location.longitude],
        {
          hintContent: [meetings[i].location.city, meetings[i].location.adress],
          clusterCaption: `${dayjs(meetings[i].date).format("DD.MM.YYYY")}`,
          balloonContent: `
              <div>
                  <div ><strong>Дата встречи:</strong> ${dayjs(
                    meetings[i].dateOfMeeting
                  ).format("DD.MM.YYYY")}</div>
                  <div><strong>Время:</strong> ${meetings[i].timeOfMeeting}
                  <div><strong>Менеджер:</strong> 
                  ${managerName(meetings[i].userId)} </div>
                  <div><strong>Город:</strong> ${
                    meetings[i].location.city
                  }</div>
                  <div><strong>Адрес:</strong> ${
                    meetings[i].location.adress
                  }</div>
                  </div>
                  <div><strong>Комментарий:</strong> ${
                    meetings[i].comment
                  }</div>
                  <hr/>
              </div>
          `,
        },
        {
          iconLayout: "default#image",
          iconImageHref: target,
          iconImageSize: [40, 40],
          iconImageOffset: [-20, -40],
        }
      );
    }
    const clusterer = new ymaps.Clusterer({
      clusterIcons: [
        {
          href: target_cluster,
          size: [50, 50],
          offset: [-25, -25],
        },
      ],
    });
    mapMeetings.geoObjects.add(clusterer);
    clusterer.add(geoObjects);
  }

  useEffect(() => {
    ymaps.ready(showAllMeetings);
  }, []);

  return (
    <>
      <Navbar />
      <div className="container-fluid p-3 overflow-hidden">
        <div className="p-0">
          <Header title={`Список встреч:`} />
        </div>
        <div
          id="map__objects"
          style={{ width: "100%", height: "250px", paddingBottom: "10px" }}
        ></div>
        <MeetingsListControl
          pageSizePagination={pageSizePagination}
          setPageSizePagination={setPageSizePagination}
          selectedStatus={selectedStatus}
          onClearFilter={handleClearFilter}
          onItemSelect={handleStatusSelect}
          items={meetingsStatus}
          users={meetings}
          setSearchQuery={setSearchQuery}
          searchQuery={searchQuery}
        />
        {meetingsCrop.length ? (
          <>
            <table className="table table-striped">
              <TableHeader
                onSort={handleSort}
                selectedSort={sortBy}
                columns={columns}
              />
              <TableBody objects={meetingsCrop} columns={columns} />
            </table>
            <Pagination
              objects={meetings}
              itemsCount={count}
              pageSize={pageSizePagination}
              currentPage={currentPage}
              setCurrentPage={setCurrentPage}
              onPageChange={handlePageChange}
            />
          </>
        ) : (
          <h6>Встречи не обнаружены</h6>
        )}
      </div>
    </>
  );
};

export default Meetings;
