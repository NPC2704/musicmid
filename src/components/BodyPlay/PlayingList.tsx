import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import AudioPlayer from "react-h5-audio-player";
import "react-h5-audio-player/lib/styles.css";
import { useParams, Outlet, Link } from "react-router-dom";
import { CloudDownloadOutlined } from "@ant-design/icons";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import { useDispatch } from "react-redux";
import { updateLink } from "../../redux/toggleLink";
import { updatecurrentTrackIndex } from "../../redux/togglecurrentTrackIndex";
import { updatedata1Redux } from "../../redux/toggleData1";
import { updatepathLink } from "../../redux/togglePathLink";
import "./Play.css";
export default function PlayingList() {
  const dispatch = useDispatch();
  const number = useSelector((state: RootState) => state.toggle.number);
  const number1 = useSelector((state: RootState) => state.toggle1.number1);
  const link = useSelector((state: RootState) => state.toggleLink.link);
  const pathlink = useSelector(
    (state: RootState) => state.togglePathLink.pathLink
  );
  const currentTrackIndexRedux = useSelector(
    (state: RootState) => state.togglecurrentTrackIndex.currentTrackIndexRedux
  );

  const dataRedux = useSelector(
    (state: RootState) => state.toggleData1.data1Redux
  );

  // dispatch(updatepathLink(window.location.pathname));
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
      setDataImg(response?.data?.data?.data?.thumbnail);
      setDataImg(response?.data?.data?.data?.thumbnail);
      setIsDataLoaded(true);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };
  // const fetchData1 = async () => {
  //   try {
  //     const response = await axios.get(
  //       `https://apisolfive.app.tranviet.site/api/get/song/sound?id=${idMusic}`
  //     );
  //     setDatalink(response?.data?.data?.data?.[128]);
  //   } catch (error) {
  //     console.error("Error fetching data:", error);
  //   }
  // };

  useEffect(() => {
    if (!isDataLoaded) {
      fetchData();
    }
  }, [isDataLoaded]);
  // useEffect(() => {
  //   fetchData1();
  // }, [idMusic]);

  useEffect(() => {
    if (dataRedux.length > 0) {
      setIdMusic(dataRedux[currentTrackIndexRedux]?.encodeId);
    }
  }, [currentTrackIndexRedux, dataRedux]);
  const toggle = () => {
    setIsPlaying(true);
  };
  // console.log(datalink);
  // useEffect(() => {
  //   if (isPlaying) {
  //     dispatch(updateLink(datalink));
  //     dispatch(updatedata1Redux(data1));
  //   }
  // }, [isPlaying, datalink]);

  return (
    <div className="w-full h-130 bg-transparent flex items-end">
      <div className="w-full h-110  flex justify-around">
        {/* <div className="w-100 h-110 ">
          <h1 className="text-white font-semibold text-2xl">
            Title: {datatitle}
          </h1>
          <div className="flex justify-center items-center mt-10">
            <img
              src={imgMusic}
              alt=""
              className="w-80 h-80 rotating-image rounded-full"
            />
          </div>
        </div> */}
        <Outlet />
        <div className="w-110 h-110 bg-transparent overflow-y-auto scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-gray-200 rounded-md">
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
                  onClick={() => {
                    toggle();
                    dispatch(updatecurrentTrackIndex(index));
                    setCurrentTrackIndex(index);
                    setIdMusic(data1?.[index]?.encodeId);
                    setImgMusic(data1?.[index]?.thumbnail);
                    setTitleMusic(data1?.[index]?.title);
                    setArtistsNames(data1?.[index]?.artistsNames);
                  }}
                >
                  <td className="w-1/10 text-center">
                    <Link
                      to={`/playlist/${userId}/${idMusic}`}
                      className="link"
                    >
                      {" "}
                      <img
                        src={data1?.[index]?.thumbnail}
                        alt=""
                        className="h-8 w-8 ml-2"
                      />
                    </Link>
                  </td>
                  <td className="w-1/10">
                    <Link
                      to={`/playlist/${userId}/${idMusic}`}
                      className="link"
                    >
                      {data1?.[index]?.title}
                    </Link>
                  </td>
                  <td className="w-1/10 text-center">
                    <Link
                      to={`/playlist/${userId}/${idMusic}`}
                      className="link"
                    >
                      {" "}
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
        </div>
      </div>
    </div>
  );
}
