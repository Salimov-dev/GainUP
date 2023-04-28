// Librares
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
// Store
import { loadWorkingPositionList } from "../../../store/workingPosition.store";
import { loadUserAccessRootList } from "../../../store/userAccessRoot.store";
import { loadDistrictsSpbLOList } from "../../../store/districtsSpbLO.store";
import { loadManagersStatusList } from "../../../store/managerStatus.store";
import { loadMeetingStatusList } from "../../../store/meetingStatus.store";
import { getIsLoggedIn, loadUsersList } from "../../../store/users.store";
import { loadStatusObjectList } from "../../../store/statusObject.store";
import { loadMeetingsList } from "../../../store/meetings.store";
import { loadObjectsList } from "../../../store/objects.store";

const AppLoader = ({ children }) => {
  const dispatch = useDispatch();
  const isLoggedIn = useSelector(getIsLoggedIn());

  useEffect(() => {
    dispatch(loadWorkingPositionList());
    dispatch(loadUserAccessRootList());
    dispatch(loadStatusObjectList());
    dispatch(loadMeetingStatusList());
    dispatch(loadManagersStatusList());
    dispatch(loadDistrictsSpbLOList());
    if (isLoggedIn) {
      dispatch(loadMeetingsList());
      dispatch(loadObjectsList());
      dispatch(loadUsersList());
    }
  }, [isLoggedIn, dispatch]);

  return children;
};

export default AppLoader;
