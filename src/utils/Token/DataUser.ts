import { setIsLogin } from "../../redux/toggerUser";
import { initData } from "../../services/userServices";
import getToken from "./token";
import { handleLoginFalseGG, handleLoginSuccessGG } from "./login";
// import { setUser, setUserFavoriteListID } from "./setUser";
import { setUser } from "./setUser";
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

const DataUser = () => {
  const token = getToken();
  if (!token) {
    handleLoginFalseGG();
  }
  return initData().then((res) => {
    if (res?.result == 1) {
      if (res?.data?.user?.id) {
        setUser(res?.data?.user);
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
export default DataUser;
