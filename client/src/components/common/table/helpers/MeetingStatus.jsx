import React from "react";
import { useSelector } from "react-redux";
import {
  getMeetingStatusById,
  getMeetingStatusLoadingStatus,
} from "../../../../store/meetingStatus.store";

const MeetingStatus = ({ id }) => {
  const isLoading = useSelector(getMeetingStatusLoadingStatus());
  const status = useSelector(getMeetingStatusById(id));
  if (!isLoading) {
    return <div className="text-nowrap padding">{status.name}</div>;
  } else return "Loading...";
};
export default MeetingStatus;
