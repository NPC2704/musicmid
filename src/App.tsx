import "./App.css";

import React, { Fragment } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { publicRoutes } from "./routes";
function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          {publicRoutes.map((publicRoute, index) => {
            const Layout =
              publicRoute.layout === null ? Fragment : publicRoute.layout;
            const Page = publicRoute.component;

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
        </Routes>
      </div>
    </Router>
  );
}

export default App;
