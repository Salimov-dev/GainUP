import { useSelector } from "react-redux";
import { getManagersStatusById } from "../../../../store/managerStatus.store";

const ManagerStatus = ({ id }) => {
  const status = useSelector(getManagersStatusById(id));
  return status?.name;
};

export default ManagerStatus;
