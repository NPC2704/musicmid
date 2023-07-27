import store from "../../redux/store";
import {
  setFavoriteListID,
  setIsLogin,
  setUserData,
} from "../../redux/userSlice";
import storage from "./storage";

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

// export const pushFvPlaylist = (encodeId: string) => {
//   const arr = [...(store?.getState()?.user?.favoriteListID || [])];

//   if (!arr.includes(encodeId)) {
//     arr.push(encodeId);
//   }

//   setUserFavoriteListID(arr);
// };

// export const removeFvPlaylist = (encodeId: string) => {
//   const arr = [...(store?.getState()?.user?.favoriteListID || [])];

//   const index = arr.indexOf(encodeId);
//   if (index > -1) {
//     arr.splice(index, 1);
//   }

//   setUserFavoriteListID(arr);
// };

export const setUserFavoriteListID = (list: string[]) => {
  if (typeof list == "object" && list?.length) {
    store.dispatch(setFavoriteListID(list));
  }
};
