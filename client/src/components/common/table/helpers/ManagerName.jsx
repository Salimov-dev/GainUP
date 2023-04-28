import { useSelector } from "react-redux";
import { getUsersById } from "../../../../store/users.store";

const ManagerName = ({ id }) => {
  const user = useSelector(getUsersById(id));
  return (id
    ?
    <div className="text-nowrap padding">
      {user.lastName + " " + user.firstName}
    </div>
    : "Отсутствует"
  );
};

export default ManagerName;
