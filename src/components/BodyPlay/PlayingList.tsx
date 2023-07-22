import React, { useContext, useEffect, useState, useMemo } from "react";
import axios from "axios";
import "react-h5-audio-player/lib/styles.css";
import { CloudDownloadOutlined } from "@ant-design/icons";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import { useDispatch } from "react-redux";
import { updateLink } from "../../redux/toggleLink";
import { updatecurrentTrackIndex } from "../../redux/togglecurrentTrackIndex";
import { updatedata1Redux } from "../../redux/toggleData1";
import { updatepathLink } from "../../redux/togglePathlink/togglePathLink";
import { useLocation } from "react-router-dom";
import { useParams, useNavigate, Outlet, Link } from "react-router-dom";
import { updatesendLink } from "../../redux/toggleSendLink";
import { updateimgMusic } from "../../redux/toggleImg";
import { updatetitleMusic } from "../../redux/toggleTitle";
import { updateartisMusic } from "../../redux/toggleArtis";
import "./Play.css";

export default function PlayingList() {
  const dispatch = useDispatch();
  const number = useSelector((state: RootState) => state.toggle.number);
  const number1 = useSelector((state: RootState) => state.toggle1.number1);
  const link = useSelector((state: RootState) => state.toggleLink.link);
  const sendLink = useSelector(
    (state: RootState) => state.toggleSendLink.sendLink
  );
  const pathlink = useSelector(
    (state: RootState) => state.togglePathLink.pathLink
  );
  const currentTrackIndexRedux = useSelector(
    (state: RootState) => state.togglecurrentTrackIndex.currentTrackIndexRedux
  );

  const dataRedux = useSelector(
    (state: RootState) => state.toggleData1.data1Redux
  );
  const currentTimeRedux = useSelector(
    (state: RootState) => state.toggleCurrentTime.currentTime
  );
  const idMusic11 = useSelector(
    (state: RootState) => state.toggelIDdMusic.iddMusic
  );

  const history = useNavigate();
  const location = useLocation();
  const storedLinkHistory = localStorage.getItem("linkHistory");
  const linkHistory = storedLinkHistory ? JSON.parse(storedLinkHistory) : [];
  const [previousPathname, setPreviousPathname] = useState("");
  useEffect(() => {
    linkHistory.push(location.pathname);
    localStorage.setItem("linkHistory", JSON.stringify(linkHistory));
    setPreviousPathname(location.pathname);

    //  console.log("Bi Reload 4");
  }, [location]);

  const [data1, setData] = useState<any[]>([]);
  const [datatitle, setDatatitle] = useState("");
  const [dataImg, setDataImg] = useState("");
  const [datalink, setDatalink] = useState("");
  const [idMusic, setIdMusic] = useState("");
  const [isDataLoaded, setIsDataLoaded] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [imgMusic, setImgMusic] = useState(
    "https://yt3.googleusercontent.com/nOwpUI4-9dJLMVZjxUbsghJ-8qBRsGZWthz4cXSSNjuSsBFLw7Zq4iH2awp-Hk3m4milTxAQng=s900-c-k-c0x00ffffff-no-rj"
  );
  const [titleMusic, setTitleMusic] = useState("Tên bài hát");
  const [artistsNames, setArtistsNames] = useState("Tác giả");
  const [currentTrackIndex, setCurrentTrackIndex] = useState(0); // Thêm state để lưu index của bài hát hiện tại
  const params = useParams();
  const userId = params.id;

  const fetchData = async () => {
    try {
      const response = await axios.get(
        `https://apisolfive.app.tranviet.site/api/get/playlist/info?id=${userId}`
      );
      setData(response?.data?.data?.data?.song?.items);
      //  setData(response?.data?.data?.data?.sections?.[0]?.items);
      setDatatitle(response?.data?.data?.data?.title);
      setImgMusic(response?.data?.data?.data?.thumbnail);
      console.log(response?.data?.data?.data?.thumbnail);
      setIsDataLoaded(true);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };
  const [time, setTime] = useState(0);
  const fetchData1 = async () => {
    try {
      const response = await axios.get(
        `https://apisolfive.app.tranviet.site/api/get/song/sound?id=${idMusic}`
      );
      setDatalink(response?.data?.data?.data?.[128]);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    if (!isDataLoaded) {
      fetchData();
    }
  }, [isDataLoaded]);
  useEffect(() => {
    if (!isDataLoaded) {
      fetchData();
    }
  }, [isDataLoaded]);
  useEffect(() => {
    fetchData1();
    console.log(currentTimeRedux);
  }, [idMusic]);

  useEffect(() => {
    if (dataRedux.length > 0) {
      setIdMusic(dataRedux[currentTrackIndexRedux]?.encodeId);
    }
  }, [currentTrackIndexRedux, dataRedux]);

  const [datalyric, setDataLyric] = useState<any[]>([]);
  const fetchDataLyric = async () => {
    const storedIdmusic = localStorage.getItem("idmusic");
    try {
      console.log(idMusic11);
      let response;
      if (idMusic !== "") {
        response = await axios.get(
          `https://apisolfive.app.tranviet.site/api/get/song/lyric?id=${idMusic}`
        );
      } else {
        response = await axios.get(
          `https://apisolfive.app.tranviet.site/api/get/song/lyric?id=${storedIdmusic}`
        );
      }
      setDataLyric(response?.data?.data?.data?.sentences);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchDataLyric();
  }, [idMusic]);
  const toggle = () => {
    setIsPlaying(true);
    dispatch(updatesendLink(true));
  };
  useEffect(() => {
    if (isPlaying) {
      //  dispatch(updateLink(datalink));
      //  console.log("Link 1");
      dispatch(updatedata1Redux(data1));
      dispatch(updatesendLink(false));
    }
  }, [isPlaying, datalink]);
  const [tableTitle, setTableTitle] = useState(true);
  // time lyric
  const convertMsToSeconds = (timeInMs: any) => {
    return timeInMs / 10000;
  };
  const [showLyric, setShowLyric] = useState(false);

  const formatTimeEarly = (timeInSeconds: any) => {
    // Tính thời gian hiện tại tính bằng mili-giây
    const timeInMs = timeInSeconds * 1000;
    // Kiểm tra từng câu lyric trong mảng datalyric
    for (let i = 0; i < datalyric.length; i++) {
      const startTimeInMs = datalyric[i]?.words?.[0]?.startTime;

      const endTimeInMs =
        datalyric[i]?.words?.[datalyric[i]?.words.length - 1]?.endTime;

      // Nếu thời gian hiện tại nằm trong khoảng thời gian của câu lyric hiện tại
      if (timeInMs >= startTimeInMs - 2000 && timeInMs <= endTimeInMs + 2000) {
        const wordsArray = datalyric[i]?.words?.map((item: any) => item.data);
        // Nối các từ thành chuỗi lyric và trả về
        return wordsArray.join(" ");
      }
    }

    return "";
  };

  const [lyricText, setLyricText] = useState("");
  const [lyricText2, setLyricText2] = useState("");
  const formatTimeDelay = (timeInSeconds: any) => {
    const timeInMs = timeInSeconds * 1000;
    let foundLyric = ""; // Biến để lưu trữ lyric nếu tìm thấy

    for (let i = 0; i < datalyric.length; i++) {
      const startTimeInMs = datalyric[i]?.words?.[0]?.startTime;
      const endTimeInMs =
        datalyric[i]?.words?.[datalyric[i]?.words.length - 1]?.endTime;
      if (timeInMs + 2500 >= startTimeInMs && timeInMs + 2500 <= endTimeInMs) {
        const wordsArray = datalyric[i]?.words?.map((item: any) => item.data);
        foundLyric = wordsArray.join(" ");
        break; // Tìm thấy lyric thích hợp, thoát khỏi vòng lặp
      }
    }

    if (foundLyric !== "") {
      setLyricText(foundLyric);
    }
  };

  const formatTime = (timeInSeconds: any) => {
    const timeInMs = timeInSeconds * 1000;
    let foundLyric = "";
    for (let i = 0; i < datalyric.length; i++) {
      const startTimeInMs = datalyric[i]?.words?.[0]?.startTime;
      const endTimeInMs =
        datalyric[i]?.words?.[datalyric[i]?.words.length - 1]?.endTime;
      if (timeInMs >= startTimeInMs - 1000 && timeInMs <= endTimeInMs - 800) {
        const wordsArray = datalyric[i]?.words?.map((item: any) => item.data);
        foundLyric = wordsArray.join(" ");
        break;
      }
    }
    if (foundLyric !== "") {
      setLyricText2(foundLyric);
    }
  };
  useEffect(() => {
    formatTimeDelay(currentTimeRedux);
    formatTime(currentTimeRedux);
  }, [currentTimeRedux]);
  return (
    <div className="w-full h-130 bg-transparent flex items-end">
      <div className="w-full h-110  flex justify-around">
        <div>
          {" "}
          <h1 className="text-white font-semibold text-2xl">
            <span className="text-[#9ca3af]">Tên bài hát:</span> {datatitle}
          </h1>
          <div className="flex justify-center items-center mt-10">
            <img
              src={imgMusic}
              alt=""
              className="w-80 h-80 rotating-image rounded-full"
            />
          </div>
        </div>
        <div className="w-110 h-110 bg-transparent overflow-y-auto scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-gray-200 rounded-md">
          <div className="w-full h-8 bg-black flex justify-around">
            <p
              className="text-white text-center cursor-pointer"
              onClick={() => setTableTitle(true)}
            >
              List Music
            </p>
            <p
              className="text-white cursor-pointer"
              onClick={() => setTableTitle(false)}
            >
              Lyric
            </p>
          </div>
          {tableTitle === true ? (
            <table className="table-auto w-full  mb-1">
              <thead className="bg-transparent h-12 text-gray-500 hover:bg-slate-600 bg-slate-600 text-white">
                <tr>
                  <th className="w-1/10">#</th>
                  <th className="w-1/10">Tên bài hát</th>

                  <th className="w-1/10">
                    <i className="fa fa-download"></i>
                  </th>
                </tr>
              </thead>
              <tbody>
                {data1.map((item, index) => (
                  <tr
                    className="bg-transparent h-12 text-gray-500 hover:bg-[#1d1d1d] bg-slate-600 text-white"
                    key={index}
                    onMouseOver={() => {
                      toggle();
                      // dispatch(
                      //   updateartisMusic(data1?.[index]?.artists?.[0]?.name)
                      // );
                      // dispatch(updateimgMusic(data1?.[index]?.thumbnail));
                      // dispatch(updatetitleMusic(data1?.[index]?.title));
                      dispatch(updatecurrentTrackIndex(index));
                      setCurrentTrackIndex(index);
                      setIdMusic(data1?.[index]?.encodeId);
                    }}
                  >
                    <td className="w-1/10 text-center ">
                      <Link to={`/playlist/${userId}/${idMusic}`}>
                        {" "}
                        <img
                          src={data1?.[index]?.thumbnail}
                          alt=""
                          className="h-8 w-8 ml-2"
                        />{" "}
                      </Link>
                    </td>
                    <Link to={`/playlist/${userId}/${idMusic}`}>
                      <td className="w-1/10">{data1?.[index]?.title}</td>{" "}
                    </Link>{" "}
                    <td className="w-1/10 text-center">
                      <Link
                        to={`/playlist/${userId}/${idMusic}`}
                        className="link"
                      >
                        <a
                          href={datalink}
                          download="song.mp3"
                          className="text-blue-500"
                        >
                          <CloudDownloadOutlined />
                        </a>
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <div className="w-full h-100 mb-1  flex justify-center">
              <div className=" w-100 h-100 mt-3  flex justify-center items-center  border-2 border-solid border-2 rounded-md">
                <div className="">
                  <div className="flex justify-center items-center">
                    <p
                      className={`text-[#d9d9db] text-center ${
                        showLyric
                          ? "opacity-0 translate-y-5"
                          : "opacity-100 translate-y-0"
                      } transition-opacity transition-transform duration-900 ease-in-out mb-5 pb-3`}
                    >
                      {formatTimeEarly(currentTimeRedux)}
                    </p>
                  </div>

                  <div className="flex justify-center items-center">
                    <p
                      className={`text-[#d9d9db] text-center ${
                        showLyric
                          ? "opacity-0 translate-y-5"
                          : "opacity-100 translate-y-0"
                      } transition-opacity transition-transform text-2xl text-white duration-900 ease-in-out mb-5 pb-3`}
                    >
                      {lyricText2}
                    </p>
                  </div>

                  <div className="flex justify-center items-center">
                    <p
                      className={`text-[#d9d9db] text-center ${
                        showLyric
                          ? "opacity-0 translate-y-5"
                          : "opacity-100 translate-y-0"
                      } transition-opacity transition-transform duration-900 ease-in-out mb-5 pb-3`}
                    >
                      {lyricText}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
