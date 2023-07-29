import store from "../../redux/store";
import {
  setFavoriteListID,
  setIsLogin,
  setUserData,
} from "../../redux/toggerUser";
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

interface setUSer {
  isLogin: boolean;
  name: string;
  email: string;
  picture?: string;
  token?: string;
}

export const setUser = ({ isLogin, name, email, picture, token }: setUSer) => {
  store.dispatch(setIsLogin(true));

  token && storage?.setItem("token", token);

  store.dispatch(
    setUserData({
      name,
      email,
      picture,
    })
  );
};
