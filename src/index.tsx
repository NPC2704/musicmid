import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { Provider } from "react-redux";
import store from "./redux/store";
import reduxConfig from "./redux";
import i18n from "./i18n";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { PersistGate } from "redux-persist/integration/react";
// const { store, persistor } = reduxConfig();
const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <Provider store={store}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>
);
i18n.init();
