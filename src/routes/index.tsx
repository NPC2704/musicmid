import routesConfig from "../configs/routes";

//import Layout
import DefaultLayout from "../layouts/DefaultLayout";

//import Pages
import Home from "../pages/Home/Home";

// Vào được khi chưa đăng nhập
const publicRoutes = [
  {
    path: routesConfig.home,
    component: Home,
    layout: DefaultLayout,
    sidebar: null,
  },
];

// Cần đăng nhập mới có thể vào được routes

export { publicRoutes };
