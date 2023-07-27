import { googleLoginService } from "../../services/loginService";
import { setUser } from "./setUser";

import { setLoginModalShow } from "../../redux/uiSlice";
import initDataUser from "./initData";
import storage from "./storage";
import { useGoogleOneTapLogin } from "@react-oauth/google";
import store from "../../redux/store";
import { setIsLogin } from "../../redux/userSlice";

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
