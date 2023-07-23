// import "./App.css";
// import React, { Fragment, useMemo, useEffect } from "react";
// import AuthProvider from "./Context/AuthProvider";
// import AppProvider from "./Context/AppProvider";
// import {
//   BrowserRouter as Router,
//   Routes,
//   Route,
//   Outlet,
// } from "react-router-dom";
// import { publicRoutes } from "./routes";
// import Home from "./pages/Home/Home";
// import Khampha from "./pages/Khampha/Khampha";
// import Login from "./components/Login";
// import PlayMusic from "./pages/PlayMusic/PlayMusic";
// import PlayPlaylistMusic from "./pages/PlayPlaylistMusic/PlayPlaylistMusic";
// import PlayPlaylistMusic1 from "./pages/PlayListMusic1.tsx/PlayPlaylistMusic";
// import MusicChart from "./pages/MusicChart/MusicChart";
// import PlayingMusic from "./components/BodyPlay/PlayingMusic";
// import PlayingMusic0 from "./components/BodyPlay/PlayingMusic0";
// import { useSelector, useDispatch } from "react-redux";
// import { RootState } from "./redux/store";
// import { toggleHomeContent } from "./redux/togglePathlink/togglePathLinkHome";
// import Public from "./pages/Public";
// function App() {
//   const dispatch = useDispatch();

//   const showHomeContent = useSelector(
//     (state: RootState) => state.togglePathLinkHome.showHomeContent
//   );

//   const homeComponent = useMemo(() => <Home />, []);
//   return (
//     <>
//       <div className="">
//         {/* <AuthProvider>
//           <AppProvider> */}

//         <Routes>
//           <Route path="/" element={<Public />}>
//             <Route path="" element={<Home />}></Route>
//             <Route path="/kham-pha" element={<Khampha />} />
//             {/* <Route path="/kham-pha" element={<Home />} /> */}
//             <Route path="/play/:id" element={<PlayMusic />} />
//             <Route
//               path="/playlistmusic/:id"
//               element={<PlayPlaylistMusic />}
//             ></Route>{" "}
//             <Route path="/playlist/:id/:idmusic" element={<PlayingMusic />} />
//             <Route path="/playlist1/:id" element={<PlayPlaylistMusic1 />} />
//             <Route path="/musicchart" element={<MusicChart />} />
//           </Route>{" "}
//           <Route path="/login" element={<Login />} />
//         </Routes>
//         {/* </AppProvider>
//         </AuthProvider> */}
//       </div>
//     </>
//   );
// }

// export default App;

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
  console.log(currentPath);
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
              //    const pathName = currentPath.pathname;

              // const route = publicRoutes.find(
              //   (route) => route.path == pathName
              // );
              //   Page = route?.component || Home;
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
