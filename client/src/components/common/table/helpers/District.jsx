import React from "react";
import { useSelector } from "react-redux";
import { getgetDistrictsSpbLOById, getgetDistrictsSpbLOStatus } from "../../../../store/districtsSpbLO.store";

const District = ({ id }) => {
  const isLoading = useSelector(getgetDistrictsSpbLOStatus())
  const district = useSelector(
    getgetDistrictsSpbLOById(id)
  );
  if (!isLoading) {
    return <div className="text-nowrap padding">{district?.name}</div>;
  } else return "Loading...";
};
export default District;
