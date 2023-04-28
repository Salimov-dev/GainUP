import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import logger from "./services/log.servise";
import { createStore } from "./store/create.store";
import { Provider } from "react-redux";
import "bootstrap/dist/css/bootstrap.css";
import "./fonts/BebasNeue/stylesheet.css";
import "./styles/main.css";

const store = createStore();
logger.init();

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <Provider store={store}>
    <App />
  </Provider>
);
