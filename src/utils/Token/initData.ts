import { setIsLogin } from "../../features/user/userSlice";
import { initData } from "../../services/userServices";
import { IPlayList } from "../../types/item";
import getToken from "./token";
import { handleLoginFalseGG, handleLoginSuccessGG } from "./login";
import { setUser, setUserFavoriteListID } from "./setUser";
import storage from "./storage";
import { useGoogleOneTapLogin } from "@react-oauth/google";

const initDataUser = () => {
  const token = getToken();
  if (!token) {
    handleLoginFalseGG();
  }
  return initData().then((fb) => {
    if (fb?.result == 1) {
      if (fb?.data?.user?.id) {
        const favoriteList: IPlayList = fb?.data?.favoriteList || [];
        const favoriteListIDList = favoriteList?.song?.items?.map(
          (song) => song?.encodeId
        );
        setUser(fb?.data?.user);
        favoriteListIDList?.length && setUserFavoriteListID(favoriteListIDList);
      } else {
        storage.remove("token");
        handleLoginFalseGG();
      }
    } else {
      setIsLogin(false);
      handleLoginFalseGG();
    }
  });
};
export default initDataUser;
