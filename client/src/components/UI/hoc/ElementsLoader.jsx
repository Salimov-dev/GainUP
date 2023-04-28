import React, { useEffect } from "react";
// Librares
import { useDispatch, useSelector } from "react-redux";
// Store
import {
  getDataMeetingsStatus,
  loadMeetingsList,
} from "../../../store/meetings.store";
import {
  getDataObjectsStatus,
  loadObjectsList,
} from "../../../store/objects.store";
import {
  getDataUsersLoadingStatus,
  loadUsersList,
} from "../../../store/users.store";
import Loader from "../loader/Loader";

const ElementsLoader = ({ children }) => {
  const meetingsStatus = useSelector(getDataMeetingsStatus());
  const objectsStatus = useSelector(getDataObjectsStatus());
  const usersStatus = useSelector(getDataUsersLoadingStatus());
  const dispatch = useDispatch();

  useEffect(() => {
    if (!meetingsStatus) dispatch(loadMeetingsList());
    if (!objectsStatus) dispatch(loadObjectsList());
    if (!usersStatus) dispatch(loadUsersList());
  }, []);

  if (!meetingsStatus) return <Loader />;
  if (!objectsStatus) return <Loader />;
  if (!usersStatus) return <Loader />;

  return children;
};

export default ElementsLoader;
