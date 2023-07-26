import React, { useEffect, useRef, useState, memo, ReactNode } from "react";
import {
  InteractionOutlined,
  CaretUpOutlined,
  InteractionTwoTone,
  UpCircleTwoTone,
} from "@ant-design/icons";
import AudioPlayer from "react-h5-audio-player";
import "react-h5-audio-player/lib/styles.css";
import { Outlet, useNavigate, Route } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../redux/store";
import { updateLink } from "../redux/toggleLink";
import { updatecurrentTrackIndex } from "../redux/togglecurrentTrackIndex";
import { updatepathLink } from "../redux/togglePathlink/togglePathLink";
import { updatepathLink2 } from "../redux/togglePathlink/togglePathLink2";
import { updatecurrentTime } from "../redux/toggleCurrentTime";
import Header from "../components/Header";
import PlayingList from "../components/BodyPlay/PlayingList";
import Home from "./Home/Home";
import "./public.css";
import PlayingMusic from "../components/BodyPlay/PlayingMusic";
import Khampha from "./Khampha/Khampha";
import { useAppSelector } from "../app/hooks";
import { ISongInfo } from "../types/item";
import { createPlayerHref } from "../utils/createHref";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
  CiShuffle,
  CiRedo,
  CiCircleChevUp,
  CiCircleChevDown,
  CiRepeat,
  CiTurnR1,
} from "react-icons/ci";
import { FaExchangeAlt } from "react-icons/fa";
interface IProps {
  children: ReactNode;
}
const Public: React.FC<IProps> = ({ children }) => {
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
    console.log(nextIndex);
    console.log(data1.length);
    if (nextIndex < 100) {
      dispatch(updatecurrentTrackIndex(nextIndex));
    }
  };
  const pathLinkNumber = useSelector(
    (state: RootState) => state.togglePathLinkNumber.pathLinknumber
  );
  const handleClickPre = () => {
    const previousIndex = currentTrackIndex - 1;
    if (previousIndex >= 0) {
      dispatch(updatecurrentTrackIndex(previousIndex));
    }
  };
  const getRandomNumberInRange = (min: any, max: any) => {
    return Math.random() * (max - min) + min;
  };
  const handleRandom = () => {
    const randomNumber = getRandomNumberInRange(-3, 10);
    const roundedNumber = Math.round(randomNumber);
    console.log(roundedNumber);
    const previousIndex = currentTrackIndex + roundedNumber;
    if (previousIndex >= 0 || previousIndex < 100 || previousIndex <= 0) {
      dispatch(updatecurrentTrackIndex(previousIndex));
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

  const handleReplayClick = () => {
    audioPlayerRef.current.audio.current.currentTime = 0;
    audioPlayerRef.current.audio.current.play();
  };
  const [isShuffle, setIsShuffle] = useState(false);
  const handleShuffleClick = () => {
    setIsShuffle((prev) => !prev);
  };

  const handleAudioClick = () => {
    setDownUp(!downup);

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

  ///
  const [downup, setDownUp] = useState(true);
  const [autoPlay, setAutoPlay] = useState(0);

  function handleEnd() {
    // Tăng chỉ số của bài hát hiện tại để chuyển sang bài hát tiếp theo

    if (autoPlay == 0) {
      audioPlayerRef.current.audio.current.currentTime = 0;
      audioPlayerRef.current.audio.current.play();
    } else if (autoPlay == 1) {
      handleClickNext();
    } else if (autoPlay == 2) {
      handleRandom();
    }
  }
  return (
    <div>
      {/* <div className="w-full h-full bg-gradient-to-r from-teal-900 via-cyan-950 to-sky-900 absolute top-0 left-0 -z-20"></div> */}
      <Header />
      <>{children}</>

      <AudioPlayer
        ref={audioPlayerRef}
        className="player-music fixed bottom-0 left-0 z-50 hidden"
        src={link}
        layout="stacked-reverse"
        showSkipControls={true}
        showJumpControls={false}
        onClickNext={handleClickNext}
        onClickPrevious={handleClickPre}
        onEnded={handleEnd}
        // autoPlay={autoPlay} // Tự động phát nhạc khi hết bài
        customAdditionalControls={[
          <div
            className="flex items-center justify-center w-62 absolute top-4 right-28 transition ease-in-out delay-150"
            key="music-controls"
          >
            <p
              onClick={() => {
                toggle1();
                handleAudioClick();
              }}
              className="cursor-pointer font-normal mr-3 text-2xl text-blue-500 hover:text-blue-700 transition-colors"
            >
              {downup === true ? <CiCircleChevDown /> : <CiCircleChevUp />}
            </p>
          </div>,

          <div className="flex absolute z-10">
            {autoPlay === 0 ? (
              <div className="flex items-center">
                <button
                  aria-label="Disable loop"
                  type="button"
                  className="cursor-pointer font-normal mr-3 text-2xl text-blue-500 hover:text-blue-700 transition-colors"
                  onClick={() => setAutoPlay(1)}
                >
                  {/* Hiển thị trạng thái tự động phát/tắt tự động phát khi hết bài */}
                  <CiRepeat />
                </button>
              </div>
            ) : autoPlay === 1 ? (
              <div className="flex items-center">
                <button
                  aria-label="Enable loop"
                  type="button"
                  className="cursor-pointer font-normal mr-3 text-2xl text-blue-500 hover:text-blue-700 transition-colors"
                  onClick={() => {
                    setAutoPlay(2);
                  }}
                >
                  <CiTurnR1 />
                </button>
              </div>
            ) : (
              <div className="flex items-center">
                <p
                  onClick={() => {
                    setAutoPlay(0);
                  }}
                  className="cursor-pointer font-normal mr-3 text-2xl text-blue-500 hover:text-blue-700 transition-colors"
                >
                  <CiShuffle />
                </p>
              </div>
            )}
            <div className="flex">
              <img
                src={imgMuic}
                alt=""
                className="h-10 w-10 rotating-image rounded-full"
              />
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

export default memo(Public);
