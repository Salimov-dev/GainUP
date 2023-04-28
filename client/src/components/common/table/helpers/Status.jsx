import React, { memo } from "react";
import { useSelector } from "react-redux";
import {
  getStatusObjectById,
  getStatusObjectStatus,
} from "../../../../store/statusObject.store";

const Status = memo(({ id }) => {
  const status = useSelector(getStatusObjectById(id));
  const isLoading = useSelector(getStatusObjectStatus());
  if (!isLoading) {
    return <div className="text-nowrap padding">{status}</div>;
  } else return "Loading...";
});
export default Status
