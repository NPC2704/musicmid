import routesConfig from "../configs/routes";

//import Layout

//import Pages
import Home from "../pages/Home/Home";
//import Login
import Login from "../components/Login";
import Khampha from "../pages/Khampha/Khampha";
import PlayPlaylistMusic from "../pages/PlayPlaylistMusic/PlayPlaylistMusic";
import Public from "../pages/Public";
import PlayingMusic from "../components/BodyPlay/PlayingMusic";
import Player from "../pages/Player";
import ChartPage from "../components/ChartPage/ChartPage";
import Playing from "../components/BodyPlay/Playing";
import SearchPage from "../pages/SearchPage/SearchPage";
// Vào được khi chưa đăng nhập
const publicRoutes = [
  {
    path: "/",
    component: Home,
    layout: Public,
    sidebar: null,
  },
  {
    path: "/khampha",
    component: Khampha,
    layout: Public,
    sidebar: null,
  },
  {
    path: "/playlistmusic/:id",
    component: PlayPlaylistMusic,
    layout: Public,
    sidebar: null,
  },
  {
    path: "/playlist/:id/:idmusic",
    component: PlayingMusic,
    layout: Public,
    sidebar: null,
  },
  {
    path: "/musicchart",
    component: ChartPage,
    layout: Public,
    sidebar: null,
  },
  {
    path: "/play/:idmusic",
    component: Playing,
    layout: Public,
    sidebar: null,
  },
  {
    path: "/search",
    component: SearchPage,
    layout: Public,
    sidebar: null,
  },
];

// Cần đăng nhập mới có thể vào được routes

export { publicRoutes };
