import "./App.css";
import React, { Fragment, useMemo, useEffect, useState } from "react";
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
import Login from "./components/Login";
import { RingLoader } from "react-spinners"; // Import thanh loading từ react-spinners
import styled from "styled-components";
import { gapi } from "gapi-script";
import token from "./utils/Token/token";
import initDataUser from "./utils/Token/initData";
const clientId =
  "60783848892-451bnh6u5i95b3spgkqlot33rhrte5ji.apps.googleusercontent.com";
function App() {
  const currentPath = useAppSelector((state) => state.routes?.pay?.currentPath);
  const [loading, setLoading] = useState(true); // State để kiểm soát trạng thái loading
  // useEffect(() => {
  //   function start() {
  //     gapi.client.init({
  //       clientId: clientId,
  //       scope: "",
  //     });
  //   }
  //   gapi.load("client:auth2", start);
  // });
  useEffect(() => {
    // Giả lập một thời gian tải, bạn có thể thay đổi giá trị 2000 thành thời gian tải thực tế
    setTimeout(() => {
      setLoading(false); // Kết thúc trạng thái loading
    }, 2000);
  }, []);

  useEffect(() => {
    initDataUser();
  }, []);
  return (
    <>
      {loading ? ( // Kiểm tra nếu đang trong trạng thái loading thì hiển thị thanh loading
        <LoadingContainer>
          <RingLoader color="#007bff" size={80} />{" "}
          {/* Sử dụng RingLoader từ react-spinners */}
        </LoadingContainer>
      ) : (
        <>
          {!token() && <Login />}
          <Router>
            <div className="App">
              <Routes>
                {publicRoutes.map((publicRoute, index) => {
                  let Layout = publicRoute.layout;
                  let Page;
                  if (publicRoute.path === "/") {
                    Page = publicRoute.component || Khampha;
                  } else {
                    Page = publicRoute.component;
                  }
                  return (
                    <Route
                      key={index}
                      path={publicRoute.path}
                      element={
                        <Layout>
                          <Page />
                        </Layout>
                      }
                    />
                  );
                })}
              </Routes>{" "}
            </div>
          </Router>
        </>
      )}
    </>
  );
}
const LoadingContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
`;
export default App;
