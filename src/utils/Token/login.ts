import { googleLogin } from "../../services/loginService";
import { setUser } from "./setUser";
import { setLoginModalShow } from "../../redux/toggelUI";
import DataUser from "./DataUser";
import store from "../../redux/store";
import { setIsLogin } from "../../redux/toggerUser";
const storage = {
  getItem: function (key: string) {
    const token: string | null = localStorage.getItem(`${key}`);

    if (!token) return false;

    return JSON.parse(token);
  },
  setItem: function (key: string, items: object | string) {
    localStorage.setItem(`${key}`, JSON.stringify(items));
  },
  remove: function (key: string) {
    localStorage.removeItem(`${key}`);
  },
};

export const handleLoginSuccessGG = (Response: any) => {
  googleLogin(Response).then((res) => {
    const data = res?.data;
    if (res?.result == 1) {
      setUser({ isLogin: true, ...data });
      DataUser();
    } else {
    }
    store?.dispatch(setLoginModalShow(false));
  });
};

export const handleLoginFalseGG = () => {
  storage.remove("token");
  store.dispatch(setIsLogin(false));
};
