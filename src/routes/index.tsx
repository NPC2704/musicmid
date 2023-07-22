import routesConfig from "../configs/routes";

//import Layout
import DefaultLayout from "../layouts/DefaultLayout";

//import Pages
import Home from "../pages/Home/Home";
//import Login
import Login from "../components/Login";
import Khampha from "../pages/Khampha/Khampha";
import PlayPlaylistMusic from "../pages/PlayPlaylistMusic/PlayPlaylistMusic";
import Public from "../pages/Public";
import PlayingMusic from "../components/BodyPlay/PlayingMusic";
// Vào được khi chưa đăng nhập
const publicRoutes = [
  {
    path: "",
    component: Home,
    layout: Public,
    sidebar: null,
  },
  {
    path: "/kham-pha",
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
    path: routesConfig.login,
    component: Login,
    layout: Public,
    sidebar: null,
  },
];

// Cần đăng nhập mới có thể vào được routes

export { publicRoutes };
