import React, { useContext, useEffect, useState, useMemo } from "react";
import axios from "axios";
import "react-h5-audio-player/lib/styles.css";
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
import Logo from "../../assets/logo.jpg";
import { use } from "i18next";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { BiPlay } from "react-icons/bi";
import "./SlidePaner.css";
const Search = () => {
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const whiteSkeletonStyle = {
    backgroundColor: "#242526",
    color: "#18191a",
    height: "600px",
    width: "600px",
    borderRadius: "10px",
  };
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const nameSOng = queryParams.get("id");
  // const nameSOng = params.name;

  const [dataSong, setDataSong] = useState<any[]>([]);
  const [dataArtists, setDataArtists] = useState<any[]>([]);
  const [dataPlayList, setDataPlayList] = useState<any[]>([]);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTrackIndex, setCurrentTrackIndex] = useState(0);
  const [idMusic, setIdMusic] = useState("");
  const fetchData = async () => {
    try {
      const response = await axios.get(
        `https://apisolfive.app.tranviet.site/v2/api/get/song/search?id=${nameSOng}`
      );
      console.log(response?.data?.data?.data?.playlists);
      setDataSong(response?.data?.data?.data?.songs);
      setDataArtists(response?.data?.data?.data?.artists);
      setDataPlayList(response?.data?.data?.data?.playlists);
      console.log(response?.data?.data?.data);
      setIsLoading(false);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };
  const [idMusicList, setIdMusicList] = useState("");
  const [idMusicTitle, setIdMusicTitle] = useState("");
  const [idMusicImg, setIdMusicImg] = useState("");
  const [idMusicArti, setIdMusicArti] = useState("");
  const [idMusicListBig, setIdMusicListBig] = useState("");
  const fetchData1 = async () => {
    try {
      console.log(idMusicListBig);
      const response = await axios.get(
        `https://apisolfive.app.tranviet.site/v2/api/get/playlist/info?id=${idMusicListBig}`
      );
      console.log(response?.data?.data?.data);

      setIdMusicList(response?.data?.data?.data?.song?.items[0]?.encodeId);
      setIdMusicTitle(response?.data?.data?.data?.song?.items[0]?.title);
      setIdMusicImg(response?.data?.data?.data?.song?.items[0]?.thumbnail);
      setIdMusicArti(response?.data?.data?.data?.song?.items[0]?.artistsNames);
      // setIsLoading(false);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };
  useEffect(() => {
    fetchData1();
  }, [idMusicListBig]);
  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    //  slidesToShow: data1.length >= 6 ? 5 : 5,
    slidesToShow: 5,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 4,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        },
      },
    ],
  };
  useEffect(() => {
    fetchData();
  }, [nameSOng]);
  const toggle = () => {
    setIsPlaying(true);
    dispatch(updatesendLink(true));
  };
  return isLoading ? (
    <div className="w-full h-full flex justify-center items-center ">
      <Skeleton active style={whiteSkeletonStyle} />
    </div>
  ) : (
    <div className="w-full h-130 bg-transparent flex items-end">
      <div className="w-full h-110  ">
        <div className="w-121 mx-auto mb-6">
          <p className="text-white text-2xl font-extrabold">Nghệ sỹ</p>
        </div>
        <div className="flex  w-121 mx-auto">
          {dataArtists.map((item, index) => (
            <div className="h-36 w-36 rounded-full mx-5">
              <img
                className="h-full w-full rounded-full"
                alt="playlist-thumbnail"
                src={dataArtists?.[index]?.thumbnail}
              />
              <div className="flex justify-center items-center mt-2">
                <p className="text-white text-xl font-medium	">
                  {dataArtists?.[index]?.name}
                </p>
              </div>
              <div className="flex justify-center items-center mt-2">
                <p className="text-white text-sm font-medium	">
                  {dataArtists?.[index]?.totalFollow} follower
                </p>
              </div>
            </div>
          ))}
        </div>
        <div className="mt-24">
          <div className="w-121 mx-auto mb-6">
            <p className="text-white text-2xl font-extrabold">Bài hát</p>
          </div>
          {dataSong.map((item, index) => (
            <div
              className={`group song-playlist-item-player-${dataSong?.[index]?.encodeId} border-b border-neutral-900 h-14 px-2 flex items-center justify-between text-white w-121 mx-auto`}
            >
              <div
                className="flex items-center overflow-hidden mr-4 w-72"
                // onMouseOver={() => {
                //   toggle();

                //   dispatch(updatecurrentTrackIndex(index));
                //   setCurrentTrackIndex(index);
                //   setIdMusic(dataSong?.[index]?.encodeId);
                // }}
              >
                <div className="flex items-center">
                  <div className="h-9 w-9 mr-4 relative cursor-pointer">
                    <Link
                      to={`/play/${dataSong?.[index]?.encodeId}`}
                      onClick={() => {
                        dispatch(updateimgMusic(dataSong?.[index]?.thumbnail));
                        dispatch(updatetitleMusic(dataSong?.[index]?.title));
                        {
                          dataSong?.[index]?.artists.map(
                            (item: any, indexx: any) => {
                              dispatch(
                                updateartisMusic(
                                  dataSong?.[index]?.artists?.[indexx]?.name
                                )
                              );
                            }
                          );
                        }
                      }}
                    >
                      <img
                        loading="lazy"
                        src={dataSong?.[index]?.thumbnail}
                        alt="song-thumbnail"
                        className="rounded-sm h-full object-cover"
                      />{" "}
                    </Link>
                  </div>

                  <div>
                    <Link
                      to={`/play/${dataSong?.[index]?.encodeId}`}
                      onClick={() => {
                        dispatch(updateimgMusic(dataSong?.[index]?.thumbnail));
                        dispatch(updatetitleMusic(dataSong?.[index]?.title));
                        {
                          dataSong?.[index]?.artists.map(
                            (item: any, indexx: any) => {
                              dispatch(
                                updateartisMusic(
                                  dataSong?.[index]?.artists?.[indexx]?.name
                                )
                              );
                            }
                          );
                        }
                      }}
                    >
                      <div className="font-semibold whitespace-nowrap cursor-pointer">
                        <div>{dataSong?.[index]?.title}</div>
                      </div>
                    </Link>
                  </div>
                </div>
              </div>
              <div className="w-32">
                <div className="text-whiteT1 text-sm flex items-center whitespace-nowrap ">
                  {dataSong?.[index]?.artists.map((item: any, indexx: any) => (
                    <p className="text-white">
                      {dataSong?.[index]?.artists?.[indexx]?.name}
                      {","}
                    </p>
                  ))}
                </div>
              </div>
              <div className="flex justify-between">
                <div className="text-whiteT1 flex items-center">
                  <div className="text-sm ">
                    {getTime.caculateTimeFM(dataSong?.[index]?.duration)}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="w-full h-90">
          <div className="w-121 mx-auto mb-6 mt-10">
            <p className="text-white text-2xl font-extrabold">Danh sách phát</p>
          </div>
          <Slider {...settings} className="w-121 h-85 space-x-1 mx-auto">
            {dataPlayList.map((item: any, index) => (
              <div
                //   onMouseOver={() => setDataChild(index)}
                className="w-52 h-80 bg-transparent rounded-lg mx-10 gap-1 space-x-1"
                key={index}
              >
                {isLoading ? (
                  <div className="flex justify-center relative group cursor-pointer">
                    {" "}
                    <Skeleton active style={whiteSkeletonStyle} />
                    <Skeleton active style={whiteSkeletonStyle} />
                    <Skeleton active style={whiteSkeletonStyle} />
                    <Skeleton active style={whiteSkeletonStyle} />
                    <Skeleton active style={whiteSkeletonStyle} />
                  </div>
                ) : (
                  <div className="flex justify-center relative group cursor-pointer">
                    {" "}
                    <img
                      src={item?.thumbnail}
                      alt=""
                      className="rounded-lg"
                    />{" "}
                    <div
                      className="bg-[#linear-gradient(rgba(0,0,0,0.502),rgba(0,0,0,0.000),rgba(0,0,0,0.000))] absolute bottom-3 right-14 w-fit h-fit z-10  justify-center items-center hidden group-hover:flex"
                      onMouseOver={() => setIdMusicListBig(item?.encodeId)}
                    >
                      <Link
                        to={`/playlist/${idMusicListBig}/${idMusicList}`}
                        onClick={() => {
                          toggle();
                          dispatch(updateartisMusic(idMusicArti));
                          dispatch(updateimgMusic(idMusicImg));
                          dispatch(updatetitleMusic(idMusicTitle));
                        }}
                      >
                        {" "}
                        *
                        <div className="rounded-full hover:scale-125 bg-[#020202] p-1 hover:scale-125 flex items-center justify-center">
                          <BiPlay className="text-[#3e4140] font-medium text-3xl	 hover:text-white transition-all m-auto" />
                        </div>
                      </Link>
                    </div>
                  </div>
                )}

                <div className="flex justify-center h-14 mb-5">
                  {" "}
                  <div className="flex items-center">
                    {" "}
                    <div>
                      {" "}
                      <div className="flex justify-start my-1 mx-2">
                        <div className="flex justify-start">
                          <p className="text-white">{item?.title}</p>{" "}
                        </div>
                      </div>
                    </div>
                  </div>{" "}
                </div>
              </div>
            ))}
          </Slider>
        </div>
      </div>
    </div>
  );
};

export default Search;
