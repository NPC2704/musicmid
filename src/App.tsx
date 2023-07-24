import "./App.css";
import React, { Fragment, useMemo, useEffect } from "react";
import AuthProvider from "./Context/AuthProvider";
import AppProvider from "./Context/AppProvider";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Outlet,
} from "react-router-dom";
import { publicRoutes } from "./routes";
import Home from "./pages/Home/Home";
import { useAppSelector } from "./app/hooks";
import routesConfig from "./configs/routes";
import Khampha from "./pages/Khampha/Khampha";
function App() {
  const currentPath = useAppSelector((state) => state.routes?.pay?.currentPath);
  return (
    <>
      <div className="">
        {/* <AuthProvider>
          <AppProvider> */}

        <Routes>
          {publicRoutes.map((publicRoute, index) => {
            let Layout = publicRoute.layout;
            let Page;
            if (publicRoute.path == "/") {
              // const pathName = currentPath.pathname;

              // const route = publicRoutes.find(
              //   (route) => route.path == pathName
              // );
              // Page = route?.component || Home;
              Page = publicRoute.component || Khampha;
            } else {
              Page = publicRoute.component;
            }
            return (
              <Route>
                <Route
                  key={index}
                  path={publicRoute.path}
                  element={
                    <Layout>
                      <Page />
                    </Layout>
                  }
                />
              </Route>
            );
          })}
        </Routes>
        {/* </AppProvider>
        </AuthProvider> */}
      </div>
    </>
  );
}

export default App;
