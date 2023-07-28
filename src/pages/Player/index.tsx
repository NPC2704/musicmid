// import { useCallback, useContext, useEffect, useState } from "react";
// import { useSearchParams } from "react-router-dom";
// import { useLocation } from "react-router-dom";
// import { RouteContext } from "../../providers/RouteProvider";
// import { publicRoutes } from "../../routes";
// import Home from "../Home/Home";

// interface IProps {}

// const Player: React.FC<IProps> = ({}) => {
//   const prePath = useContext(RouteContext);

//   const pathName = prePath.pathname;

//   const route = publicRoutes.find((route) => route.path == pathName);

//   const Component = route?.component || Home;

//   const [searchParams, setSearchParams] = useSearchParams();
//   const location = useLocation();

//   useEffect(() => {}, []);
//   return <Component />;
// };

// export default Player;
import React from "react";

const index = () => {
  return <div></div>;
};

export default index;
