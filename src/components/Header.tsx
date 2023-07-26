import React, { useState } from "react";
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
const clientId =
  "60783848892-451bnh6u5i95b3spgkqlot33rhrte5ji.apps.googleusercontent.com";
const Header = () => {
  const {
    user: { displayName, photoURL },
  } = React.useContext(AuthContext);
  const { clearState } = React.useContext(AppContext);
  const { t, i18n } = useTranslation();

  const handleLanguageChange = (lang: string) => {
    i18n.changeLanguage(lang);
  };
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
          {photoURL == undefined ? (
            <UserOutlined className="w-10 h-4 text-white" />
          ) : (
            <img
              src={photoURL}
              alt=""
              className="w-10 h-10 rounded-full ml-4"
            />
          )}
          {/* {photoURL == undefined ? (
            <Link to="/login" className="w-10 h-4 text-white flex items-center">
              {t("header.login")}
            </Link>
          ) : ( */}
          {/* // <LogoutOutlined
            //   className="w-10 h-4 text-white"
            //   onClick={() => {
            //     // clear state in App Provider when logout
            //     clearState();
            //     auth.signOut();
            //   }}
            // /> */}
          <GoogleLogout
            clientId={clientId}
            buttonText="Logout"
            onLogoutSuccess={() => {
              console.log("Logout thanh cong");
            }}
          />
          {/* )} */}
        </div>
      </div>
    </div>
  );
};

export default Header;
