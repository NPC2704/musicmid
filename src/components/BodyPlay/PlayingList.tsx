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
import getTime from "../../utils/convertTime";
import Box from "@mui/material/Box";
import { Avatar, List, Skeleton, Switch } from "antd";
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
  const imgMusicRedux = useSelector(
    (state: RootState) => state.toggleImg.imgMusic
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
  }, [location]);

  const [data1, setData] = useState<any[]>([]);
  const [datatitle, setDatatitle] = useState("");
  const [dataImg, setDataImg] = useState("");
  const [datalink, setDatalink] = useState("");
  const [idMusic, setIdMusic] = useState("");
  const [isDataLoaded, setIsDataLoaded] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [imgMusic, setImgMusic] = useState(
    "https://yt3.googleusercontent.com/nOwpUI4-9dJLMVZjxUbsghJ-8qBRsGZWthz4cXSSNjuSsBFLw7Zq4iH2awp-Hk3m4milTxAQng=s900-c-k-c0x00ffffff-no-rj"
  );
  const [titleMusic, setTitleMusic] = useState("Tên bài hát");
  const [artistsNames, setArtistsNames] = useState("Tác giả");
  const [currentTrackIndex, setCurrentTrackIndex] = useState(0); // Thêm state để lưu index của bài hát hiện tại
  const params = useParams();
  const userId = params.id;
  const [totalMusic, setTotalMusic] = useState("");
  const [totalDuration, setTotalDuration] = useState(0);
  const [sortDescription, setSortDescription] = useState("");
  const fetchData = async () => {
    try {
      const response = await axios.get(
        `https://apisolfive.app.tranviet.site/api/get/playlist/info?id=${userId}`
      );

      setData(response?.data?.data?.data?.song?.items);
      setTotalMusic(response?.data?.data?.data?.song?.total);
      setTotalDuration(response?.data?.data?.data?.song?.totalDuration);
      setDatatitle(response?.data?.data?.data?.title);
      setSortDescription(response?.data?.data?.data?.sortDescription);
      setImgMusic(response?.data?.data?.data?.thumbnail);
      setIsDataLoaded(true);
      setIsLoading(false);
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
      setIsLoading(false);
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
      dispatch(updatedata1Redux(data1));
      dispatch(updatesendLink(false));
    }
  }, [isPlaying, datalink]);
  const whiteSkeletonStyle = {
    backgroundColor: "#242526",
    color: "#18191a",
    height: "600px",
    width: "600px",
    borderRadius: "10px",
  };
  return isLoading ? (
    <div className="w-full h-full py-5 flex justify-center items-center ">
      <Skeleton active style={whiteSkeletonStyle} />
    </div>
  ) : (
    <div className="w-full h-130 bg-transparent flex items-end">
      <div className="w-full h-110  ">
        <div className="flex  w-121 mx-auto">
          <div>
            <div className="h-64 w-64 rounded">
              <img
                className="h-full w-full rounded"
                alt="playlist-thumbnail"
                src={imgMusic}
              />
            </div>
          </div>
          <div className="ml-9">
            <div className="py-5">
              <h1 className="text-white font-semibold text-4xl">{datatitle}</h1>
            </div>
            <div className="text-[#dee1e6]">
              <div className="">
                <div className="py-1">Danh sách phát • Music</div>
                <div className="py-1">
                  {`${totalMusic} song • 
            ${totalDuration ? getTime.caculateTime(totalDuration) : ""}`}
                </div>
              </div>
              <div className="mt-3 text-sm">{sortDescription}</div>
            </div>
          </div>
        </div>
        <div className="mt-0 mt-12">
          {data1.map((item, index) => (
            <div
              className={`group song-playlist-item-player-${data1?.[index]?.encodeId} border-b border-neutral-900 h-14 px-2 flex items-center justify-between text-white w-121 mx-auto`}
            >
              <div
                className="flex items-center overflow-hidden mr-4 w-72"
                onMouseOver={() => {
                  toggle();

                  dispatch(updatecurrentTrackIndex(index));
                  setCurrentTrackIndex(index);
                  setIdMusic(data1?.[index]?.encodeId);
                }}
              >
                <div className="flex items-center">
                  <div className="h-9 w-9 mr-4 relative cursor-pointer">
                    <Link
                      to={`/playlist/${userId}/${idMusic}`}
                      onClick={() => {
                        dispatch(updateimgMusic(data1?.[index]?.thumbnail));
                        dispatch(updatetitleMusic(data1?.[index]?.title));
                        {
                          data1?.[index]?.artists.map(
                            (item: any, indexx: any) => {
                              dispatch(
                                updateartisMusic(
                                  data1?.[index]?.artists?.[indexx]?.name
                                )
                              );
                            }
                          );
                        }
                      }}
                    >
                      {" "}
                      <img
                        loading="lazy"
                        src={data1?.[index]?.thumbnail}
                        alt="song-thumbnail"
                        className="rounded-sm h-full object-cover"
                      />{" "}
                    </Link>
                    {/* <InfoThumb isFocus={isFocus} isPlaying={isPlaying} /> */}
                  </div>

                  <div>
                    <Link
                      to={`/playlist/${userId}/${idMusic}`}
                      onClick={() => {
                        dispatch(updateimgMusic(data1?.[index]?.thumbnail));
                        dispatch(updatetitleMusic(data1?.[index]?.title));
                        {
                          data1?.[index]?.artists.map(
                            (item: any, indexx: any) => {
                              dispatch(
                                updateartisMusic(
                                  data1?.[index]?.artists?.[indexx]?.name
                                )
                              );
                            }
                          );
                        }
                      }}
                    >
                      <div className="font-semibold whitespace-nowrap cursor-pointer">
                        <div>{data1?.[index]?.title}</div>
                      </div>
                    </Link>
                  </div>
                </div>
              </div>
              <div className="w-32">
                <div className="text-whiteT1 text-sm flex items-center whitespace-nowrap ">
                  {data1?.[index]?.artists.map((item: any, indexx: any) => (
                    <p className="text-white">
                      {data1?.[index]?.artists?.[indexx]?.name}
                      {","}
                    </p>
                  ))}
                </div>
              </div>
              <div className="flex justify-between">
                <div className="text-whiteT1 flex items-center">
                  <div className="text-sm ">
                    {getTime.caculateTimeFM(data1?.[index]?.duration)}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
