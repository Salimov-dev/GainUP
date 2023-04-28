import React from "react";
// Styles
import "react-toastify/dist/ReactToastify.css";
import "./styles/main.css";
// Librares
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";
// Utils
import ScrollToTop from "./utils/scrollToTop";
// Layouts
import ManagersLayout from "./layouts/outlets/ManagersLayout";
import MeetingsLayout from "./layouts/outlets/MeetingsLayout";
import ObjectsLayout from "./layouts/outlets/ObjectsLayout";
import Presentations from "./layouts/Presentations";
import ObjectsOnMap from "./layouts/ObjectsOnMap";
import AuthLayout from "./layouts/AuthLayout";
import FeedBack from "./layouts/FeedBack";
import Managers from "./layouts/Managers";
import Meetings from "./layouts/Meetings";
import Objects from "./layouts/Objects";
import Login from "./layouts/Login";
// Components
import ProtectedRoute from "./components/common/ProtectedRoute";
import ElementsLoader from "./components/UI/hoc/ElementsLoader";
import AddNewManager from "./components/page/AddNewManager";
import AddNewMeeting from "./components/page/AddNewMeeting";
import AddNewObject from "./components/page/AddNewObject";
import EditMeeting from "./components/page/EditMeeting";
import EditManager from "./components/page/EditManager";
import EditObject from "./components/page/EditObject";
import AppLoader from "./components/UI/hoc/AppLoader";
import ObjectsTable from "./components/page/ObjectsTable";
import ObjectPage from "./components/page/ObjectPage/ObjectPage";

const App = () => {
  return (
    <div className="App">

        <AppLoader>
          <ElementsLoader>
            <BrowserRouter>
              <ScrollToTop />
              <Routes>
                <Route index path="" element={<ObjectsTable />} />

                <Route path="auth" element={<AuthLayout />}>
                  <Route index element={<Navigate to="/auth/login" />} />
                  <Route path={"login"} element={<Login />} />
                  <Route path="*" element={<Navigate to="/auth/login" />} />
                </Route>

                <Route
                  path="/objects"
                  element={
                    <ProtectedRoute>
                      <ObjectsLayout />
                    </ProtectedRoute>
                  }
                >
                  <Route path="" element={<ObjectsTable />} />
                  <Route path=":objectId?" element={<ObjectPage />} />
                  <Route path="create" element={<AddNewObject />} />
                  <Route path=":objectId?/edit" element={<EditObject />} />
                  <Route path="*" element={<Navigate to="/objects" />} />
                </Route>
                {/* <Route
                path="/objects"
                element={
                  <ProtectedRoute>
                    <ObjectsLayout />
                  </ProtectedRoute>
                }
              >
                <Route path=":objectId?" element={<Objects />} />
                <Route path="create" element={<AddNewObject />} />
                <Route path=":objectId?/edit" element={<EditObject />} />
              </Route> */}

                <Route
                  path="/meetings"
                  element={
                    <ProtectedRoute>
                      <MeetingsLayout />
                    </ProtectedRoute>
                  }
                >
                  {/* <Route index element={<Navigate to="/meetings" />} /> */}
                  <Route path="" element={<Meetings />} />
                  <Route path="create" element={<AddNewMeeting />} />
                  <Route path=":meetingId?/edit" element={<EditMeeting />} />
                  <Route path="*" element={<Navigate to="/meetings" />} />
                </Route>

                <Route
                  path="managers"
                  element={
                    <ProtectedRoute>
                      <ManagersLayout />
                    </ProtectedRoute>
                  }
                >
                  {/* <Route index element={<Navigate to="/managers" />}/> */}
                  <Route path="" element={<Managers />} />
                  <Route path="create" element={<AddNewManager />} />
                  <Route path=":userId?/edit" element={<EditManager />} />
                  <Route path="*" element={<Navigate to="/managers" />} />
                </Route>

                <Route
                  path="/objectsonmap"
                  element={
                    <ProtectedRoute>
                      <ObjectsOnMap />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/presentations"
                  element={
                    <ProtectedRoute>
                      <Presentations />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/feedback"
                  element={
                    <ProtectedRoute>
                      <FeedBack />
                    </ProtectedRoute>
                  }
                />

                <Route path="*" element={<Navigate to="" />} />
              </Routes>
            </BrowserRouter>
          </ElementsLoader>
          <ToastContainer />
        </AppLoader>

    </div>
  );
};

export default App;
