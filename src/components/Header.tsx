import React, { useEffect, useState } from "react";
import dataComponents from "../data/dataComponents";
import {
  ControlOutlined,
  LogoutOutlined,
  UserOutlined,
  HomeOutlined,
  CompassOutlined,
  AudioOutlined,
  PauseCircleOutlined,
} from "@ant-design/icons";
import { Link } from "react-router-dom";
import logo from "../assets/logo.jpg";
import { auth } from "../firebase/config";
import { AuthContext } from "../Context/AuthProvider";
import { AppContext } from "../Context/AppProvider";
import { useTranslation } from "react-i18next"; // Import hook useTranslation
import i18n from "../i18n"; // Import i18n configuration
import logoVN from "../assets/vi.png";
import { SearchOutlined } from "@ant-design/icons";
import { Button, Tooltip, Space } from "antd";
import LogoMusic from "../assets/LogoMusic.png";
import { GoogleLogout, useGoogleLogin } from "react-google-login";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../redux/store";
import Logo from "../assets/logo.jpg";
import { toggleSidebar } from "../redux/uiSlice";
import { googleLogout } from "@react-oauth/google";
import { setLoginModalShow } from "../redux/uiSlice";
const Header = () => {
  const dispatch = useDispatch();
  const isExpand = useSelector(
    (state: RootState) => state?.uiSlice?.sidebarExpand
  );
  const isLogin = useSelector((state: RootState) => state?.userSlice?.isLogin);
  const isUser = useSelector(
    (state: RootState) => state?.uiSlice?.isLoginModalShow
  );
  console.log(isUser);
  const handleToggleSidebar = () => {
    dispatch(toggleSidebar(!isExpand));
  };
  const { t, i18n } = useTranslation();

  const handleLanguageChange = (lang: string) => {
    i18n.changeLanguage(lang);
  };
  const clearToken = () => {
    localStorage.removeItem("token"); // Nếu dùng Local Storage
  };
  const handleLogoutClick = () => {
    // Gọi hàm googleLogout để đăng xuất khỏi tài khoản Google
    clearToken();
    window.location.reload();
  };

  const [uiLog, setuiLog] = useState(true);
  const [dataSearch, setDataSearch] = useState("");
  return (
    <div className="fixed top-0 left-0 z-10 w-full h-12 bg-black ">
      <div className="h-full w-full flex justify-between items-center	">
        <div className="ml-2 flex items-center">
          <Link to="/">
            {" "}
            <img src={LogoMusic} alt="" className="h-44 w-44" />{" "}
          </Link>
        </div>

        <div className="ml-52 hidden sm:block">
          <Link to="/" className="text-white mx-5 font-semibold text-xl">
            {t("header.home")}
          </Link>
          <Link
            to="/khampha"
            className="text-[rgba(255,255,255,0.5)] mx-5 font-semibold text-xl hover:text-white"
          >
            {t("header.discover")}
          </Link>
          <Link
            to=""
            className="text-[rgba(255,255,255,0.5)] mx-5 font-semibold text-xl hover:text-white"
          >
            {t("header.library")}
          </Link>
          <Link
            to=""
            className="text-[rgba(255,255,255,0.5)] mx-5 font-semibold text-xl hover:text-white"
          >
            {t("header.advance")}
          </Link>

          {/* {t("header.search")} */}
        </div>
        <div className="ml-52 block sm:hidden">
          <Link to="/" className="text-white mx-5 font-semibold text-xl">
            <HomeOutlined />
          </Link>
          <Link
            to="/khampha"
            className="text-[rgba(255,255,255,0.5)] mx-5 font-semibold text-xl hover:text-white"
          >
            <CompassOutlined />
          </Link>
          <Link
            to="/thu-vien"
            className="text-[rgba(255,255,255,0.5)] mx-5 font-semibold text-xl hover:text-white"
          >
            <AudioOutlined />
          </Link>
          <Link
            to=""
            className="text-[rgba(255,255,255,0.5)] mx-5 font-semibold text-xl hover:text-white"
          >
            <PauseCircleOutlined />
          </Link>

          {/* {t("header.search")} */}
        </div>
        <div className="flex items-center mr-2 w-30 ">
          {/* <ControlOutlined className="text-lg text-white" /> */}
          <div className="flex items-center bg-transparent rounded-lg overflow-hidden border-solid border-spacing-1 border-inherit hidden sm:flex">
            <input
              type="text"
              onChange={(e) => {
                setDataSearch(e.target.value);
              }}
              placeholder={t("header.search")}
              className="py-1 px-4 bg-transparent text-white focus:outline-none focus:outline focus:outline-offset-2 focus:outline-1 flex-grow"
            />
            <Link to={`/search?id=${dataSearch}`}>
              {" "}
              <button className="bg-black hover:bg-[white] hover:text-black text-white py-1 px-4 flex justify-center items-center ">
                <SearchOutlined />
              </button>
            </Link>
          </div>

          <div className="ml-2 ">
            <select
              className="text-white bg-transparent cursor-pointer outline-0"
              onChange={(e) => handleLanguageChange(e.target.value)}
            >
              <option value="en" className="bg-[#171810] cursor-pointer">
                English
              </option>
              <option value="vi" className="bg-[#171810] cursor-pointer">
                Việt Nam
                <img src={logoVN} alt="" className="text-white" />
              </option>
            </select>
          </div>

          <div
            className={`w-20 px-24 relative z-10 flex flex-col items-center ${
              isExpand ? "ml-sidebar-width-expand" : "ml-sidebar-width-narrow"
            }`}
          >
            <div className=" w-20 flex items-center justify-between">
              {isLogin ? (
                <div>
                  <img
                    src={Logo}
                    alt=""
                    className="w-10 h-10 rounded-full ml-4 cursor-pointer"
                    onClick={() => setuiLog(!uiLog)}
                  />
                  {uiLog === false ? (
                    <div className="w-16 h-8 absolute z-10 flex justify-center items-center border-solid border-inherit border-2 rounded-md mt-2">
                      <p className="text-white" onClick={handleLogoutClick}>
                        Logout
                      </p>
                    </div>
                  ) : (
                    <></>
                  )}
                </div>
              ) : (
                <div>
                  <button
                    className="h-8 bg-white text-black w-28 rounded-2xl hover:bg-black hover:text-white hover:border-solid hover:border-inherit  hover:border-2	duration-500"
                    onClick={() => {
                      handleToggleSidebar();
                      dispatch(setLoginModalShow(true));
                    }}
                  >
                    Đăng nhập
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
