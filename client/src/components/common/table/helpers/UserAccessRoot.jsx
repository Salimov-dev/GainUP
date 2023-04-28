import { useSelector } from "react-redux";
import { getUserAccessRootById } from "../../../../store/userAccessRoot.store";
const UserAccessRoot = ({ id }) => {
  const position = useSelector(getUserAccessRootById(id));

  return position?.name;
};

export default UserAccessRoot;
