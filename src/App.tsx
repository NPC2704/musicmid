import "./App.css";

import React, { Fragment } from "react";
import AuthProvider from "./Context/AuthProvider";
import AppProvider from "./Context/AppProvider";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { publicRoutes } from "./routes";
import Home from "./pages/Home/Home";
import Khampha from "./pages/Khampha/Khampha";
import Login from "./components/Login";
import PlayMusic from "./pages/PlayMusic/PlayMusic";
import PlayPlaylistMusic from "./pages/PlayPlaylistMusic/PlayPlaylistMusic";
import PlayPlaylistMusic1 from "./pages/PlayListMusic1.tsx/PlayPlaylistMusic";
import MusicChart from "./pages/MusicChart/MusicChart";
import PlayingMusic from "./components/BodyPlay/PlayingMusic";
import PlayingMusic0 from "./components/BodyPlay/PlayingMusic0";
import Public from "./pages/Public";
function App() {
  console.log(<Public />);
  return (
    <>
      <div className="">
        {/* <AuthProvider>
          <AppProvider> */}

        <Routes>
          <Route path="/" element={<Public />}>
            <Route path="" element={<Home />} />
            <Route path="/kham-pha" element={<Khampha />} />

            <Route path="/play/:id" element={<PlayMusic />} />
            <Route path="/playlist/:id" element={<PlayPlaylistMusic />}>
              <Route path="/playlist/:id/:idmusic" element={<PlayingMusic />} />
              <Route path="/playlist/:id" element={<PlayingMusic0 />} />
            </Route>
            <Route path="/playlist1/:id" element={<PlayPlaylistMusic1 />} />
            <Route path="/musicchart" element={<MusicChart />} />
          </Route>{" "}
          <Route path="/login" element={<Login />} />
        </Routes>
        {/* </AppProvider>
        </AuthProvider> */}
      </div>
    </>
  );
}

export default App;
