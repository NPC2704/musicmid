import React from "react";
import dataComponents from "../data/dataComponents";
import {
  ControlOutlined,
  LogoutOutlined,
  UserOutlined,
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
const Header = () => {
  const {
    user: { displayName, photoURL },
  } = React.useContext(AuthContext);
  const { clearState } = React.useContext(AppContext);
  const { t, i18n } = useTranslation();

  const handleLanguageChange = (lang: string) => {
    i18n.changeLanguage(lang);
  };

  return (
    <div className="fixed top-0 left-0 z-10 w-full h-12 bg-black">
      <div className="h-full w-full flex justify-between items-center	">
        <Link to="/">
          <div className="ml-2">
            <img
              src="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iODAiIGhlaWdodD0iMjQiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGVsbGlwc2UgY3g9IjEyLjE4IiBjeT0iMTIiIHJ4PSIxMi4xOCIgcnk9IjEyIiBmaWxsPSJyZWQiLz48ZWxsaXBzZSBjeD0iMTIuMTgiIGN5PSIxMiIgcng9IjcuMzA4IiByeT0iNy4yIiBmaWxsPSJyZWQiIHN0cm9rZT0iI2ZmZiIgc3Ryb2tlLXdpZHRoPSIxLjIiLz48cGF0aCBkPSJNOS43NDQgMTUuNTQ1bDYuMzI3LTMuNTQ0LTYuMzI3LTMuNTQ2djcuMDl6TTM3LjQzMyA5LjY0MmMtLjU3OSAyLjg1My0xLjAxOSA2LjMzNi0xLjI1IDcuNzc0aC0uMTYzYy0uMTg3LTEuNDgyLS42MjctNC45NDItMS4yMjctNy43NUwzMy4zMSAyLjY3N2gtNC41MnYxOC44NWgyLjgwM1Y1Ljk4N2wuMjc3IDEuNDUxIDIuODUgMTQuMDg2aDIuODA0bDIuODAzLTE0LjA4Ni4zLTEuNDU5djE1LjU0N2gyLjgwNFYyLjY3NmgtNC41NjNsLTEuNDM1IDYuOTY2ek01MS4wMSAxOC42OTZjLS4yNTYuNTE3LS44MS44NzYtMS4zNjguODc2LS42NDggMC0uOTA0LS40OTQtLjkwNC0xLjcwNlY3Ljc1NEg0NS41NHYxMC4yOWMwIDIuNTQuODU2IDMuNzA2IDIuNzU4IDMuNzA2IDEuMjk2IDAgMi4zMzgtLjU2MiAzLjA1OC0xLjkwOWguMDdsLjI3NyAxLjY4NGgyLjUwMlY3Ljc1NWgtMy4xOTh2MTAuOTRoLjAwM3pNNjAuMzkyIDEzLjE5Yy0xLjA0My0uNzQyLTEuNjkxLTEuMjM2LTEuNjkxLTIuMzE0IDAtLjc2My4zNy0xLjE5IDEuMjUtMS4xOS45MDUgMCAxLjIwNi42MDUgMS4yMjcgMi42NzRsMi42ODktLjExMWMuMjA4LTMuMzQ2LS45MjgtNC43NC0zLjg3LTQuNzQtMi43MzMgMC00LjA3OCAxLjE5LTQuMDc4IDMuNjM4IDAgMi4yMjQgMS4xMTMgMy4yMzUgMi45MiA0LjU2MiAxLjU1MyAxLjE2OSAyLjQ1NyAxLjgyIDIuNDU3IDIuNzY0IDAgLjcyLS40NjQgMS4yMTMtMS4yNzUgMS4yMTMtLjk1IDAtMS41MDctLjg3Ny0xLjM2NS0yLjQwNWwtMi43MS4wNDRjLS40MTkgMi44NTIuNzY2IDQuNTE1IDMuOTE1IDQuNTE1IDIuNzU4IDAgNC4xOTUtMS4yMzYgNC4xOTUtMy43MDYtLjAwMy0yLjI0Ny0xLjE2LTMuMTQ3LTMuNjY0LTQuOTQ0ek02OC44NzIgNy43NTRoLTMuMDU5djEzLjc3aDMuMDZWNy43NTV6TTY3LjM2NSAyLjMxNmMtMS4xOCAwLTEuNzM4LjQyNy0xLjczOCAxLjkxMSAwIDEuNTI4LjU1NCAxLjkwOSAxLjczOSAxLjkwOSAxLjIwNSAwIDEuNzM4LS4zODMgMS43MzgtMS45MDkgMC0xLjQxNC0uNTMzLTEuOTExLTEuNzM5LTEuOTExek03OS4xNTggMTYuNTZsLTIuODAzLS4xMzVjMCAyLjQyNi0uMjc3IDMuMjEyLTEuMjI2IDMuMjEyLS45NSAwLTEuMTEzLS44NzctMS4xMTMtMy43M3YtMi42N2MwLTIuNzY1LjE4Ny0zLjYzOSAxLjEzNy0zLjYzOS44OCAwIDEuMTEyLjgzIDEuMTEyIDMuMzkzbDIuNzc4LS4xNzhjLjE4Ny0yLjEzNC0uMDkzLTMuNTk1LS45NDktNC40MjUtLjYyNy0uNjA4LTEuNTc2LS44OTctMi44OTYtLjg5Ny0zLjEwNCAwLTQuMzc5IDEuNjE4LTQuMzc5IDYuMTU0djEuOTMyYzAgNC42NzMgMS4wODggNi4xNzggNC4yNjQgNi4xNzggMS4zNDQgMCAyLjI3LS4yNyAyLjg5Ni0uODU0LjkwMi0uODE0IDEuMjQ5LTIuMjA1IDEuMTgtNC4zNDF6IiBmaWxsPSIjZmZmIi8+PC9zdmc+"
              alt=""
            />
          </div>
        </Link>
        <div className="ml-52">
          <Link to="/" className="text-white mx-5 font-semibold text-xl">
            {t("header.home")}
          </Link>
          <Link
            to="/kham-pha"
            className="text-[rgba(255,255,255,0.5)] mx-5 font-semibold text-xl hover:text-white"
          >
            {t("header.discover")}
          </Link>
          <Link
            to="/thu-vien"
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

        <div className="flex items-center mr-2 w-30 ">
          {/* <ControlOutlined className="text-lg text-white" /> */}
          <div className="flex items-center bg-transparent rounded-lg overflow-hidden border-solid border-spacing-1 border-inherit">
            <input
              type="text"
              placeholder={t("header.search")}
              className="py-1 px-4 bg-transparent text-white focus:outline-none focus:outline focus:outline-offset-2 focus:outline-1 flex-grow"
            />
            <button className="bg-black hover:bg-[white] hover:text-black text-white py-1 px-4 flex justify-center items-center ">
              <SearchOutlined />
            </button>
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
          {photoURL == undefined ? (
            <Link to="/login" className="w-10 h-4 text-white">
              {t("header.login")}
            </Link>
          ) : (
            <LogoutOutlined
              className="w-10 h-4 text-white"
              onClick={() => {
                // clear state in App Provider when logout
                clearState();
                auth.signOut();
              }}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default Header;
