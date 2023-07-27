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
import { GoogleOAuthProvider } from "@react-oauth/google";
// const { store, persistor } = reduxConfig();
const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <GoogleOAuthProvider clientId="60783848892-451bnh6u5i95b3spgkqlot33rhrte5ji.apps.googleusercontent.com">
    {" "}
    <Provider store={store}>
      {/* <BrowserRouter> */}
      <App />
      {/* </BrowserRouter> */}
    </Provider>
  </GoogleOAuthProvider>
);
i18n.init();
