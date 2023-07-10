import routesConfig from "../configs/routes";

//import Layout
import DefaultLayout from "../layouts/DefaultLayout";

//import Pages
import Home from "../pages/Home/Home";
//import Login
import Login from "../components/Login";

// Vào được khi chưa đăng nhập
const publicRoutes = [
  {
    path: routesConfig.home,
    component: Home,
    layout: DefaultLayout,
    sidebar: null,
  },
  {
    path: routesConfig.login,
    component: Login,
    layout: DefaultLayout,
    sidebar: null,
  },
];

// Cần đăng nhập mới có thể vào được routes

export { publicRoutes };
