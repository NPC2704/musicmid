import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import AudioPlayer from "react-h5-audio-player";
import "react-h5-audio-player/lib/styles.css";
import { useParams } from "react-router-dom";
import { CloudDownloadOutlined } from "@ant-design/icons";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import "./Play.css";
export default function PlayingList() {
  const number = useSelector((state: RootState) => state.toggle.number);
  const number1 = useSelector((state: RootState) => state.toggle1.number1);

  const [data1, setData] = useState<any[]>([]);
  const [datatitle, setDatatitle] = useState("");
  const [dataImg, setDataImg] = useState("");
  const [datalink, setDatalink] = useState("");
  const [idMusic, setIdMusic] = useState("");
  const [imgMusic, setImgMusic] = useState(
    "https://yt3.googleusercontent.com/nOwpUI4-9dJLMVZjxUbsghJ-8qBRsGZWthz4cXSSNjuSsBFLw7Zq4iH2awp-Hk3m4milTxAQng=s900-c-k-c0x00ffffff-no-rj"
  );
  const [titleMusic, setTitleMusic] = useState("Tên bài hát");
  const [artistsNames, setArtistsNames] = useState("Tác giả");
  const [currentTrackIndex, setCurrentTrackIndex] = useState(0); // Thêm state để lưu index của bài hát hiện tại
  const params = useParams();
  const userId = params.id;

  const handleClickNext = () => {
    const nextIndex = currentTrackIndex + 1;
    if (nextIndex < data1.length) {
      setCurrentTrackIndex(nextIndex);
      setIdMusic(data1[nextIndex]?.encodeId);
      setImgMusic(data1?.[nextIndex]?.thumbnailM);
      setTitleMusic(data1?.[nextIndex]?.title);
      setArtistsNames(data1?.[nextIndex]?.artistsNames);
    }
  };

  const handleClickPre = () => {
    const previousIndex = currentTrackIndex - 1;
    if (previousIndex >= 0) {
      setCurrentTrackIndex(previousIndex);
      setIdMusic(data1[previousIndex]?.encodeId);
      setImgMusic(data1?.[previousIndex]?.thumbnailM);
      setTitleMusic(data1?.[previousIndex]?.title);
      setArtistsNames(data1?.[previousIndex]?.artistsNames);
    }
  };

  const fetchData = async () => {
    try {
      const response = await axios.get(
        `https://apisolfive.app.tranviet.site/api/get/playlist/info?id=${userId}`
      );
      setData(response?.data?.data?.data?.song?.items);
      setDatatitle(response?.data?.data?.data?.title);
      setDataImg(response?.data?.data?.data?.thumbnail);
      setDataImg(response?.data?.data?.data?.thumbnail);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

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
    fetchData();
  }, []);

  useEffect(() => {
    if (data1.length > 0) {
      setIdMusic(data1[currentTrackIndex]?.encodeId);
    }
  }, [currentTrackIndex, data1]);

  useEffect(() => {
    fetchData1();
  }, [idMusic]);

  return (
    <div className="w-full h-130 bg-transparent flex items-end">
      <div className="w-full h-110  flex justify-around">
        <div className="w-100 h-110 ">
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
        </div>

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
                    setCurrentTrackIndex(index);
                    setIdMusic(data1?.[index]?.encodeId);
                    setImgMusic(data1?.[index]?.thumbnail);
                    setTitleMusic(data1?.[index]?.title);
                    setArtistsNames(data1?.[index]?.artistsNames);
                  }}
                >
                  <td className="w-1/10 text-center ">
                    <img
                      src={data1?.[index]?.thumbnail}
                      alt=""
                      className="h-8 w-8 ml-2"
                    />
                  </td>
                  <td className="w-1/10">{data1?.[index]?.title}</td>
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
        </div>
      </div>

      <AudioPlayer
        className="player-music absolute bottom-0 left-0 z-50"
        src={datalink}
        layout="stacked-reverse"
        showSkipControls={true}
        showJumpControls={false}
        onClickNext={handleClickNext}
        onClickPrevious={handleClickPre}
        customAdditionalControls={[
          <div
            className="flex items-center justify-center w-62"
            key="music-controls"
          >
            <img src={imgMusic} alt="Music Cover" className="h-8 w-8" />
            <p className="ml-4 text-white text-lg font-bold w-60">
              {titleMusic} <br /> (
              <span className="text-sm font-medium">{artistsNames}</span>)
            </p>
          </div>,
        ]}
      >
        <div className="rhap_main-controls" />
      </AudioPlayer>
    </div>
  );
}
