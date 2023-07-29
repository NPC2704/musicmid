import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import "react-h5-audio-player/lib/styles.css";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import { updateLink } from "../../redux/toggleLink";
import { useDispatch } from "react-redux";
import { color, motion } from "framer-motion";

import { updatesendLink } from "../../redux/toggleSendLink";

import { Avatar, List, Skeleton, Switch } from "antd";
import getTime from "../../utils/convertTime";
import { CiHeart } from "react-icons/ci";
import { API } from "../../LinkAPI";
export default function Playing() {
  const number = useSelector((state: RootState) => state.toggle.number);
  const number1 = useSelector((state: RootState) => state.toggle1.number1);
  const number2 = useSelector((state: RootState) => state.toggle2.number2);
  const link = useSelector((state: RootState) => state.toggleLink.link);

  const handleClickNext = () => {};
  const handleClickPre = () => {};
  const [data1, setData] = useState<any[]>([]);
  const [datatitle, setDatatitle] = useState("");
  const [dataImg, setDataImg] = useState("");
  const [datalink, setDatalink] = useState("");
  const [dataduration, setDataduration] = useState(0);
  const [showLyric, setShowLyric] = useState(false);
  const [datalyric, setDataLyric] = useState<any[]>([]);
  const params = useParams();
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const userId = params.idmusic;
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
  const imgMusicRedux = useSelector(
    (state: RootState) => state.toggleImg.imgMusic
  );
  const currentTimeRedux = useSelector(
    (state: RootState) => state.toggleCurrentTime.currentTime
  );
  console.log(userId);
  const fetchData = async () => {
    try {
      const response = await axios.get(API.GET_DISCOVER_API);
      setData(
        response.data?.data?.data?.items?.[number]?.items?.[number2]?.[number1]
          ?.artists || []
      );

      setDatatitle(
        response.data?.data?.data?.items?.[number]?.items?.[number2]?.[number1]
          ?.title
      );
      setDataImg(
        response.data?.data?.data?.items?.[number]?.items?.[number2]?.[number1]
          ?.thumbnail
      );
      setDataduration(
        response.data?.data?.data?.items?.[number]?.items?.[number2]?.[number1]
          ?.duration
      );
      setIsLoading(false);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };
  const fetchData1 = async () => {
    console.log(userId);
    try {
      const response = await axios.get(
        `https://apisolfive.app.tranviet.site/api/get/song/sound?id=${userId}`
      );

      setDatalink(response?.data?.data?.data?.[128]);
      console.log(response?.data?.data?.data?.[128]);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };
  const dispatch = useDispatch();

  useEffect(() => {
    fetchData1();
  }, []);
  useEffect(() => {
    fetchData();
  }, []);
  useEffect(() => {
    console.log(datalink);
    dispatch(updateLink(datalink));
    // console.log(datalink);
  }, [datalink]);
  const whiteSkeletonStyle = {
    backgroundColor: "#242526",
    color: "#18191a",
    height: "600px",
    width: "600px",
    borderRadius: "10px",
  };
  const [tableTitle, setTableTitle] = useState(0);
  const onDragEnd = (result: any, data: any, setData: any) => {
    if (!result.destination) return; // Kéo thả ngoài khu vực hợp lệ

    const sourceIndex = result.source.index;
    const destinationIndex = result.destination.index;

    // Tạo một bản sao mới của mảng dữ liệu
    const newData = Array.from(data);
    const [movedItem] = newData.splice(sourceIndex, 1);
    newData.splice(destinationIndex, 0, movedItem);

    setData(newData);
  };
  const fetchDataLyric = async () => {
    const storedIdmusic = localStorage.getItem("idmusic");
    try {
      let response;
      if (userId !== "") {
        response = await axios.get(
          `https://apisolfive.app.tranviet.site/api/get/song/lyric?id=${userId}`
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
  }, [userId]);
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
              <div className="flex justify-center items-center mt-10  relative">
                <img
                  src={imgMusicRedux}
                  alt=""
                  className="w-100 h-100 relative blur-sm z-1 brightness-75"
                />
                <img
                  src={imgMusicRedux}
                  alt=""
                  className="w-44 h-44 absolute top-1/2 left-1/2 z-2 transform -translate-x-1/2 -translate-y-1/2"
                />
              </div>
            </div>
            {isLoading ? (
              <div className="w-110 h-110 py-5 flex justify-center items-center ">
                <Skeleton active style={whiteSkeletonStyle} />
              </div>
            ) : (
              <div className="w-110 h-110 bg-transparent overflow-y-auto scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-gray-200 rounded-md">
                <div className="w-full h-8 bg-black flex justify-around">
                  {tableTitle === 0 ? (
                    <div className="  w-32 h-full border-b-2 border-cyan-50 border-solid">
                      {" "}
                      <p
                        className="text-white text-center cursor-pointer font-bold"
                        onClick={() => setTableTitle(0)}
                      >
                        TIẾP THEO
                      </p>
                    </div>
                  ) : (
                    <div className="  w-32 h-full ">
                      {" "}
                      <p
                        className="text-[#4f4f4f] text-center cursor-pointer font-bold"
                        onClick={() => setTableTitle(0)}
                      >
                        TIẾP THEO
                      </p>
                    </div>
                  )}
                  {tableTitle === 1 ? (
                    <div className="  w-32 h-full border-b-2 border-cyan-50 border-solid">
                      <p
                        className="text-white text-center cursor-pointer font-bold"
                        onClick={() => setTableTitle(1)}
                      >
                        LỜI NHẠC
                      </p>
                    </div>
                  ) : (
                    <div className="  w-32 h-full ">
                      <p
                        className="text-[#4f4f4f] text-center cursor-pointer font-bold"
                        onClick={() => setTableTitle(1)}
                      >
                        LỜI NHẠC
                      </p>
                    </div>
                  )}
                  {tableTitle === 2 ? (
                    <div className="  w-32 h-full border-b-2 border-cyan-50 border-solid">
                      <p
                        className="text-white text-center cursor-pointer font-bold"
                        onClick={() => setTableTitle(2)}
                      >
                        LIÊN QUAN
                      </p>
                    </div>
                  ) : (
                    <div className="  w-32 h-full ">
                      <p
                        className="text-[#4f4f4f] text-center cursor-pointer font-bold"
                        onClick={() => setTableTitle(2)}
                      >
                        LIÊN QUAN
                      </p>
                    </div>
                  )}
                </div>
                {tableTitle === 0 ? (
                  <table className="table-auto w-full mb-1">
                    <tbody>
                      <tr
                        className={
                          "bg-[#b7e1e4] h-12 text-gray-500 hover:bg-[#1d1d1d] bg-slate-600 text-white"
                        }
                        onMouseOver={() => {
                          dispatch(updatesendLink(true));
                          // dispatch(
                          //   updateartisMusic(
                          //     data1?.[index]?.artists?.[0]?.name
                          //   )
                          //  );
                          // dispatch(
                          //   updateimgMusic(
                          //     data1?.[index]?.thumbnail
                          //   )
                          // );
                          // dispatch(
                          //   updatetitleMusic(data1?.[index]?.title)
                          // );
                        }}
                      >
                        <td className="w-1/10 text-center">
                          <img src={dataImg} alt="" className="h-8 w-8 ml-2" />
                        </td>
                        <td className="w-1/10">{datatitle}</td>
                        <td className="w-1/10">
                          {getTime.caculateTimeFM(dataduration)}
                        </td>
                        <td className="w-1/10 text-center">
                          <a href={datalink} className="text-blue-500">
                            <CiHeart />
                          </a>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                ) : tableTitle === 1 ? (
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
                ) : (
                  <table className="table-auto w-full mb-1">
                    <tbody>
                      <tr
                        className={
                          "bg-[#b7e1e4] h-12 text-gray-500 hover:bg-[#1d1d1d] bg-slate-600 text-white"
                        }
                        onMouseOver={() => {
                          dispatch(updatesendLink(true));
                          // dispatch(
                          //   updateartisMusic(
                          //     data1?.[index]?.artists?.[0]?.name
                          //   )
                          //  );
                          // dispatch(
                          //   updateimgMusic(
                          //     data1?.[index]?.thumbnail
                          //   )
                          // );
                          // dispatch(
                          //   updatetitleMusic(data1?.[index]?.title)
                          // );
                        }}
                      >
                        <td className="w-1/10 text-center">
                          <img src={dataImg} alt="" className="h-8 w-8 ml-2" />
                        </td>
                        <td className="w-1/10">{datatitle}</td>
                        <td className="w-1/10">
                          {getTime.caculateTimeFM(dataduration)}
                        </td>
                        <td className="w-1/10 text-center">
                          <a href={datalink} className="text-blue-500">
                            <CiHeart />
                          </a>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                )}
              </div>
            )}
          </div>
        </div>
      </>
    </motion.div>
  );
}
