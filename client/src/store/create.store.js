import districtsSpbLOReducer from "./districtsSpbLO.store";
import hideAdvObjSearchBlockReducer from "./hideAdvObjSearchBlock.store";
import hideNavBarReducer from "./hideNavBar.store";
import managersStatusReducer from "./managerStatus.store";
import meetingsReducer from "./meetings.store";
import meetingStatusReducer from "./meetingStatus.store";
import objectsReducer from "./objects.store";
import statusObjectReducer from "./statusObject.store";
import userAccessRootReducer from "./userAccessRoot.store";
import usersReducer from "./users.store";
import workingPositionReducer from "./workingPosition.store";

const { combineReducers, configureStore } = require("@reduxjs/toolkit");

const rootReducer = combineReducers({
  users: usersReducer,
  objects: objectsReducer,
  meetings: meetingsReducer,
  workingPosition: workingPositionReducer,
  meetingStatus: meetingStatusReducer,
  managersStatus: managersStatusReducer,
  statusObject: statusObjectReducer,
  districtsSpbLO: districtsSpbLOReducer,
  userAccessRoot: userAccessRootReducer,
  isNavBarHide: hideNavBarReducer,
  isHideAdvObjSearchBlock: hideAdvObjSearchBlockReducer,
});

export function createStore() {
  return configureStore({
    reducer: rootReducer,
  });
}
