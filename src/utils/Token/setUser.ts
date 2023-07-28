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

interface ISetUSer {
  isLogin: boolean;
  name: string;
  email: string;
  picture?: string;
  token?: string;
}

export const setUser = ({ isLogin, name, email, picture, token }: ISetUSer) => {
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

export const pushFvPlaylist = (encodeId: string) => {
  const arr = [...(store?.getState()?.userSlice?.favoriteListID || [])];

  if (!arr.includes(encodeId)) {
    arr.push(encodeId);
  }

  setUserFavoriteListID(arr);
};

export const removeFvPlaylist = (encodeId: string) => {
  const arr = [...(store?.getState()?.userSlice?.favoriteListID || [])];
  console.log();
  const index = arr.indexOf(encodeId);
  if (index > -1) {
    arr.splice(index, 1);
  }

  setUserFavoriteListID(arr);
};

export const setUserFavoriteListID = (list: string[]) => {
  if (typeof list == "object" && list?.length) {
    store.dispatch(setFavoriteListID(list));
  }
};
