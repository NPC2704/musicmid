import { googleLoginService } from "../../services/loginService";
import { setUser } from "./setUser";

import { setLoginModalShow } from "../../redux/toggelUI";
import initDataUser from "./DataUser";

import { useGoogleOneTapLogin } from "@react-oauth/google";
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

export const handleLoginSuccessGG = (codeResponse: any) => {
  googleLoginService(codeResponse).then((fb) => {
    const data = fb?.data;
    if (fb?.result == 1) {
      setUser({ isLogin: true, ...data });
      initDataUser();
    } else {
    }
    ui.hiddenLoginModal();
  });
};

export const handleLoginFalseGG = () => {
  storage.remove("token");
  store.dispatch(setIsLogin(false));
};

export const ui = {
  hiddenLoginModal: function () {
    store?.dispatch(setLoginModalShow(false));
  },
};
