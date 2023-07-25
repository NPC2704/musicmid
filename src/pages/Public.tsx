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
  const [autoPlay, setAutoPlay] = useState(false);

  function handleEnd() {
    // Tăng chỉ số của bài hát hiện tại để chuyển sang bài hát tiếp theo

    if (autoPlay == false) {
      console.log("Sw");
      handleClickNext();
    } else {
      audioPlayerRef.current.audio.current.currentTime = 0;
      audioPlayerRef.current.audio.current.play();
    }
    // Nếu đã phát hết danh sách bài hát, có thể thiết lập lại chỉ số về 0 để quay lại bài đầu tiên
    // Hoặc bạn có thể thiết lập autoPlay thành false để dừng phát khi hết danh sách bài hát
  }
  return (
    <div>
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
        autoPlay={autoPlay} // Tự động phát nhạc khi hết bài
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
          <div
            className="flex items-center justify-center w-62 absolute top-4 right-36"
            key="music-controls"
          >
            <p
              onClick={() => {
                handleRandom();
              }}
              className="cursor-pointer font-normal mr-3 text-2xl text-blue-500 hover:text-blue-700 transition-colors"
            >
              <CiShuffle />
            </p>
          </div>,
          <div className="flex absolute z-10">
            {autoPlay == true ? (
              <div className="flex items-center">
                {" "}
                <button
                  aria-label="Disable loop"
                  className="rhap_button-clear rhap_repeat-button ml-2"
                  type="button"
                  onClick={() => setAutoPlay(false)}
                >
                  {/* Hiển thị trạng thái tự động phát/tắt tự động phát khi hết bài */}
                  <FaExchangeAlt />
                </button>
              </div>
            ) : (
              <div className="flex items-center">
                <button
                  aria-label="Enable loop"
                  className="rhap_button-clear rhap_repeat-button ml-2 text-[#1b44b7]"
                  type="button"
                  onClick={() => {
                    setAutoPlay(true);
                  }}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    aria-hidden="true"
                    role="img"
                    width="1em"
                    height="1em"
                    preserveAspectRatio="xMidYMid meet"
                    viewBox="0 0 24 24"
                  >
                    <path
                      d="M2 5.27L3.28 4L20 20.72L18.73 22l-3-3H7v3l-4-4l4-4v3h6.73L7 10.27V11H5V8.27l-3-3M17 13h2v4.18l-2-2V13m0-8V2l4 4l-4 4V7H8.82l-2-2H17z"
                      fill="currentColor"
                    ></path>
                  </svg>
                </button>
              </div>
            )}
            {/* <button
              onClick={() => {
                handleReplayClick();
                //  handleToggleShowInfo();
              }}
              className="cursor-pointer font-normal mr-3 text-2xl text-blue-500 hover:text-blue-700 transition-colors"
            >
              <CiRedo />
            </button> */}
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
