import React, { useEffect, useRef, useState } from "react";
import {
  InteractionOutlined,
  CaretUpOutlined,
  InteractionTwoTone,
  UpCircleTwoTone,
} from "@ant-design/icons";
import AudioPlayer from "react-h5-audio-player";
import "react-h5-audio-player/lib/styles.css";
import { Outlet, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../redux/store";
import { updateLink } from "../redux/toggleLink";
import { updatecurrentTrackIndex } from "../redux/togglecurrentTrackIndex";
import { updatepathLink } from "../redux/togglePathLink";
import { updatepathLink2 } from "../redux/togglePathLink2";
import { updatecurrentTime } from "../redux/toggleCurrentTime";
import Header from "../components/Header";
import "./public.css";
const Public = () => {
  const link = useSelector((state: RootState) => state.toggleLink.link);
  const pathlink = useSelector(
    (state: RootState) => state.togglePathLink.pathLink
  );
  const pathlink2 = useSelector(
    (state: RootState) => state.togglePathLink2.pathLink2
  );
  const currentTimeRedux = useSelector(
    (state: RootState) => state.toggleCurrentTime.currentTime
  );
  const imgMuic = useSelector((state: RootState) => state.toggleImg.imgMusic);
  const dispatch = useDispatch();
  const history = useNavigate();

  const currentTrackIndex = useSelector(
    (state: RootState) => state.togglecurrentTrackIndex.currentTrackIndexRedux
  );
  const data1 = useSelector((state: RootState) => state.toggleData1.data1Redux);
  const titleMusicRedux = useSelector(
    (state: RootState) => state.toggleTitle.titleMusic
  );
  const artisMusicRedux = useSelector(
    (state: RootState) => state.toggleArtis.artisMusic
  );
  const handleClickNext = () => {
    const nextIndex = currentTrackIndex + 1;
    if (nextIndex < data1.length) {
      dispatch(updatecurrentTrackIndex(nextIndex));
    }
  };
  const handleClickPre = () => {
    const previousIndex = currentTrackIndex - 1;
    if (previousIndex >= 0) {
      dispatch(updatecurrentTrackIndex(previousIndex));
    }
  };
  const handleAudioClick = () => {
    if (window.location.pathname.split("/")[1] === "playlist") {
      history(pathlink);
    } else {
      history(pathlink2);
    }
  };
  //dispatch(updatepathLink(window.location.pathname));
  const toggle1 = () => {
    const firstPath = window.location.pathname.split("/")[1];

    if (firstPath === "playlist") {
      dispatch(updatepathLink2(window.location.pathname));
    } else {
      dispatch(updatepathLink(window.location.pathname));
    }
  };

  // Lấy thời gian hiện tại từ AudioPlayer
  const audioPlayerRef = useRef<any>(null);
  const [currentTime, setCurrentTime] = useState(0);
  useEffect(() => {
    const audio = audioPlayerRef.current?.audio?.current;
    if (audio) {
      audio.addEventListener("timeupdate", handleTimeUpdate);
    }
    return () => {
      if (audio) {
        audio.removeEventListener("timeupdate", handleTimeUpdate);
      }
    };
  }, []);
  const handleTimeUpdate = () => {
    const audio = audioPlayerRef.current?.audio?.current;
    if (audio) {
      const currentTimeInSeconds = Math.floor(audio.currentTime);
      setCurrentTime(currentTimeInSeconds);
      dispatch(updatecurrentTime(currentTimeInSeconds));
    }
  };
  const [isShuffle, setIsShuffle] = useState(false);
  const handleReplayClick = () => {
    audioPlayerRef.current.audio.current.currentTime = 0;
    audioPlayerRef.current.audio.current.play();
  };
  const handleShuffleClick = () => {
    setIsShuffle((prev) => !prev);
  };
  return (
    <div>
      <Header />
      <Outlet />
      <AudioPlayer
        ref={audioPlayerRef}
        className={`${
          link === ""
            ? "player-music hidden"
            : "player-music fixed bottom-0 left-0 z-50"
        }`}
        src={link}
        layout="stacked-reverse"
        showSkipControls={true}
        showJumpControls={false}
        onClickNext={handleClickNext}
        onClickPrevious={handleClickPre}
        customAdditionalControls={[
          <div
            className="flex items-center justify-center w-62 absolute top-3 right-28"
            key="music-controls"
          >
            <p
              onClick={() => {
                toggle1();
                handleAudioClick();
              }}
              className="cursor-pointer font-normal mr-3 text-2xl text-blue-500 hover:text-blue-700 transition-colors"
            >
              <UpCircleTwoTone />
            </p>
          </div>,
          <div className="flex absolute z-10">
            <button
              onClick={handleReplayClick}
              className="cursor-pointer font-normal mr-3 text-2xl text-blue-500 hover:text-blue-700 transition-colors"
            >
              <InteractionTwoTone />
            </button>
            <div className="flex">
              <img src={imgMuic} alt="" className="h-10 w-10" />
              <div className="block items-center ml-4">
                {" "}
                <div>
                  {" "}
                  <p className="text-white">{titleMusicRedux}</p>
                </div>
                <p className="text-white mt-1">( {artisMusicRedux} )</p>
              </div>
            </div>
          </div>,
        ]}
      ></AudioPlayer>
    </div>
  );
};

export default Public;
