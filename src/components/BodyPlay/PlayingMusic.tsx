import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import { updateLink } from "../../redux/toggleLink";
import { useParams, useNavigate, Outlet } from "react-router-dom";
import Logo from "../../assets/logo.jpg";
import { useLocation, Link } from "react-router-dom";
import { updatepathLink2 } from "../../redux/togglePathlink/togglePathLink2";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../../redux/store";
import { updatesendLink } from "../../redux/toggleSendLink";
import { updatepathLinknumber } from "../../redux/togglePathLinkNumber";
import { motion } from "framer-motion";
import { updateimgMusic } from "../../redux/toggleImg";
import { updatetitleMusic } from "../../redux/toggleTitle";
import { updateiddMusic } from "../../redux/toggelIDMusic";
import { updateartisMusic } from "../../redux/toggleArtis";
import { updatecurrentTrackIndex } from "../../redux/togglecurrentTrackIndex";
import getTime from "../../utils/getTime";
import { CloudDownloadOutlined } from "@ant-design/icons";
const PlayingMusic = () => {
  const dispatch = useDispatch();
  const params = useParams();
  const userId = params.id;
  const idmusic: any = params.idmusic;

  const [datalink, setDatalink] = useState("");
  const [isPlaying, setIsPlaying] = useState(false);
  const [imgMusic, setImgMusic] = useState(
    "https://yt3.googleusercontent.com/nOwpUI4-9dJLMVZjxUbsghJ-8qBRsGZWthz4cXSSNjuSsBFLw7Zq4iH2awp-Hk3m4milTxAQng=s900-c-k-c0x00ffffff-no-rj"
  );
  const [titleMusic, setTitleMusic] = useState("Tên bài hát");
  const [artistsNames, setArtistsNames] = useState("Tác giả");
  const [currentTrackIndex, setCurrentTrackIndex] = useState(0);
  const history = useNavigate();
  const location = useLocation();
  const storedLinkHistory = localStorage.getItem("linkHistory");
  const linkHistory = storedLinkHistory ? JSON.parse(storedLinkHistory) : [];
  const [isDataLoaded, setIsDataLoaded] = useState(false);
  const [dataFetched, setDataFetched] = useState(false);
  const [previousPathname, setPreviousPathname] = useState("");

  const pathlink2 = useSelector(
    (state: RootState) => state.togglePathLink2.pathLink2
  );
  const sendLink = useSelector(
    (state: RootState) => state.toggleSendLink.sendLink
  );
  const pathLinkNumber = useSelector(
    (state: RootState) => state.togglePathLinkNumber.pathLinknumber
  );
  // const pathlinkRender = useSelector(
  //   (state: RootState) => state.togglePathLinkRender.pathLinkRender
  // );
  const titleMusicRedux = useSelector(
    (state: RootState) => state.toggleTitle.titleMusic
  );
  const idMusic11 = useSelector(
    (state: RootState) => state.toggelIDdMusic.iddMusic
  );
  // const pathLinkRender = useSelector(
  //   (state: RootState) => state.togglePathLinkRender.pathLinkRender
  // );
  const imgMuic = useSelector((state: RootState) => state.toggleImg.imgMusic);
  useEffect(() => {
    linkHistory.push(location.pathname);
    localStorage.setItem("linkHistory", JSON.stringify(linkHistory));
    setPreviousPathname(location.pathname);
  }, [location]);

  const [isLoaded, setIsLoaded] = useState(false);
  const [idMusic, setIdMusic] = useState("");

  useEffect(() => {
    // Fetch data and update state

    setIsLoaded(true);
  }, []);
  useEffect(() => {
    // Lấy giá trị idmusic từ localStorage khi trang được load lại
    const storedIdmusic = localStorage.getItem("idmusic");
    if (storedIdmusic) {
      // Kiểm tra nếu giá trị idmusic hợp lệ (không phải undefined) thì tiếp tục xử lý
      const validIdmusic: string = storedIdmusic; // Ép kiểu để TypeScript biết đây là kiểu string
      dispatch(updateiddMusic(validIdmusic));
      console.log(validIdmusic);
      console.log(idMusic);
      console.log(typeof idMusic);
      console.log(typeof idmusic);
    }
  }, []);
  useEffect(() => {
    const fetchData1 = async () => {
      try {
        const response = await axios.get(
          `https://apisolfive.app.tranviet.site/api/get/song/sound?id=${idmusic}`
        );
        setDatalink(response?.data?.data?.data?.[128]);
        if (idmusic) {
          localStorage.setItem("idmusic", idmusic);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    if (window.location.pathname.split("/")[1] === "playlist") {
      dispatch(updatepathLink2(window.location.pathname));
    }

    fetchData1();
  }, [idmusic]);

  useEffect(() => {
    if (pathLinkNumber === 0) {
      if (datalink && pathlink2) {
        dispatch(updateLink(datalink));
        dispatch(updatepathLinknumber(1));
      }
    } else {
      if (sendLink) {
        dispatch(updateLink(datalink));
        dispatch(updatesendLink(false));
      }
    }
  }, [datalink, pathlink2, sendLink]);

  useEffect(() => {
    if (!dataFetched && location.pathname !== previousPathname) {
      fetchData();
      console.log("Bi Reload 3");
    }
  }, [dataFetched, location.pathname, previousPathname]);

  const isInitialMount = useRef(true);
  const currentTimeRedux = useSelector(
    (state: RootState) => state.toggleCurrentTime.currentTime
  );
  console.log(currentTimeRedux);
  useEffect(() => {
    // Kiểm tra nếu component đã được mount lần đầu tiên, không cần thực hiện các tác vụ trong này
    if (isInitialMount.current) {
      isInitialMount.current = false;
    } else {
      // Xử lý các tác vụ khi component được truy cập lại (không cần re-rendering)
      console.log("Component được truy cập lại");
    }
  }, [location]);
  const [tableTitle, setTableTitle] = useState(true);
  // time lyric
  const convertMsToSeconds = (timeInMs: any) => {
    return timeInMs / 10000;
  };
  const [showLyric, setShowLyric] = useState(false);
  const [datalyric, setDataLyric] = useState<any[]>([]);
  const fetchDataLyric = async () => {
    const storedIdmusic = localStorage.getItem("idmusic");
    try {
      let response;
      if (idmusic !== "") {
        response = await axios.get(
          `https://apisolfive.app.tranviet.site/api/get/song/lyric?id=${idmusic}`
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
  const [data1, setData] = useState<any[]>([]);
  const fetchData = async () => {
    try {
      const response = await axios.get(
        `https://apisolfive.app.tranviet.site/api/get/playlist/info?id=${userId}`
      );
      setData(response?.data?.data?.data?.song?.items);
      //  setData(response?.data?.data?.data?.sections?.[0]?.items);
      //  setDatatitle(response?.data?.data?.data?.title);

      setIsDataLoaded(true);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };
  useEffect(() => {
    fetchDataLyric();
  }, [idmusic]);
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
  console.log(currentTimeRedux);
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
    <motion.div
      initial={{ y: "100%" }}
      animate={{ scaleY: 1, y: 0 }}
      exit={{ y: "-100%" }}
      transition={{ duration: 0.8 }}
    >
      <>
        <div className="w-full h-130 bg-transparent flex items-end">
          <div className="w-full h-110  flex justify-around">
            <div className="w-110">
              {" "}
              <h1 className="text-white font-semibold text-2xl">
                <span className="text-[#9ca3af]">Tên bài hát:</span>{" "}
                {titleMusicRedux}
              </h1>
              <div className="flex justify-center items-center mt-10">
                <img
                  src={imgMuic}
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
                  <tbody>
                    {data1.map((item, index) => (
                      <tr
                        className="bg-transparent h-12 text-gray-500 hover:bg-[#1d1d1d] bg-slate-600 text-white"
                        key={index}
                        onMouseOver={() => {
                          setIsPlaying(true);
                          dispatch(updatesendLink(true));

                          dispatch(updatecurrentTrackIndex(index));
                          setCurrentTrackIndex(index);
                          setTitleMusic(data1?.[index]?.title);
                          setImgMusic(data1?.[index]?.thumbnail);
                          setIdMusic(data1?.[index]?.encodeId);
                        }}
                      >
                        <td className="w-1/10 text-center ">
                          <Link
                            to={`/playlist/${userId}/${idMusic}`}
                            onClick={() => {
                              dispatch(
                                updateartisMusic(
                                  data1?.[index]?.artists?.[0]?.name
                                )
                              );
                              dispatch(
                                updateimgMusic(data1?.[index]?.thumbnail)
                              );
                              dispatch(updatetitleMusic(data1?.[index]?.title));
                            }}
                          >
                            <img
                              src={data1?.[index]?.thumbnail}
                              alt=""
                              className="h-8 w-8 ml-2"
                            />
                          </Link>{" "}
                        </td>
                        <td className="w-1/10">
                          {" "}
                          <Link
                            to={`/playlist/${userId}/${idMusic}`}
                            onClick={() => {
                              dispatch(
                                updateartisMusic(
                                  data1?.[index]?.artists?.[0]?.name
                                )
                              );
                              dispatch(
                                updateimgMusic(data1?.[index]?.thumbnail)
                              );
                              dispatch(updatetitleMusic(data1?.[index]?.title));
                            }}
                          >
                            {data1?.[index]?.title}
                          </Link>
                        </td>{" "}
                        <td className="w-1/10">
                          {" "}
                          <Link to={`/playlist/${userId}/${idMusic}`}>
                            {getTime.caculateTimeFM(data1?.[index]?.duration)}
                          </Link>
                        </td>{" "}
                        <td className="w-1/10 text-center">
                          <a
                            href={datalink}
                            download="song.mp3"
                            className="text-blue-500"
                          >
                            <CloudDownloadOutlined />
                          </a>
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
      </>
    </motion.div>
  );
};

export default PlayingMusic;
