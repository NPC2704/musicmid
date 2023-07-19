// import React, { useEffect } from "react";
// import AudioPlayer from "react-h5-audio-player";
// import "react-h5-audio-player/lib/styles.css";
// import { Outlet, useNavigate } from "react-router-dom";
// import { useSelector, useDispatch } from "react-redux";
// import { RootState } from "../redux/store";
// import { updateLink } from "../redux/toggleLink";
// import { updatecurrentTrackIndex } from "../redux/togglecurrentTrackIndex";
// import { updatepathLink } from "../redux/togglePathLink";
// import { updatepathLink2 } from "../redux/togglePathLink2";
// import Header from "../components/Header";
// const Public = () => {
//   const link = useSelector((state: RootState) => state.toggleLink.link);
//   const pathlink = useSelector(
//     (state: RootState) => state.togglePathLink.pathLink
//   );
//   const pathlink2 = useSelector(
//     (state: RootState) => state.togglePathLink2.pathLink2
//   );
//   const dispatch = useDispatch();
//   const history = useNavigate();

//   useEffect(() => {
//     dispatch(updateLink(link));
//   }, [link, dispatch]);

//   const currentTrackIndex = useSelector(
//     (state: RootState) => state.togglecurrentTrackIndex.currentTrackIndexRedux
//   );
//   const data1 = useSelector((state: RootState) => state.toggleData1.data1Redux);

//   const handleClickNext = () => {
//     const nextIndex = currentTrackIndex + 1;
//     if (nextIndex < data1.length) {
//       dispatch(updatecurrentTrackIndex(nextIndex));
//     }
//   };
//   const handleClickPre = () => {
//     const previousIndex = currentTrackIndex - 1;
//     if (previousIndex >= 0) {
//       dispatch(updatecurrentTrackIndex(previousIndex));
//     }
//   };
//   const handleAudioClick = () => {
//     history(pathlink2);
//   };
//   dispatch(updatepathLink(window.location.pathname));
//   const toggle1 = () => {
//     dispatch(updatepathLink2(pathlink));
//     dispatch(updatepathLink(window.location.pathname));
//   };
//   // console.log(link);

//   return (
//     <div>
//       <Header />
//       <Outlet />
//       <AudioPlayer
//         className={`${
//           link === "" ? "hidden" : "player-music fixed bottom-0 left-0 z-50"
//         }`}
//         src={link}
//         layout="stacked-reverse"
//         showSkipControls={true}
//         showJumpControls={false}
//         onClickNext={handleClickNext}
//         onClickPrevious={handleClickPre}
//         customAdditionalControls={[
//           <div
//             className="flex items-center justify-center w-62"
//             key="music-controls"
//           >
//             <p
//               onClick={() => {
//                 toggle1();
//                 handleAudioClick();
//               }}
//             >
//               Next
//             </p>
//           </div>,
//         ]}
//       >
//         <div className="rhap_main-controls" />
//       </AudioPlayer>
//     </div>
//   );
// };

// export default Public;

import React, { useEffect, useRef, useState } from "react";
import AudioPlayer from "react-h5-audio-player";
import "react-h5-audio-player/lib/styles.css";
import { Outlet, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../redux/store";
import { updateLink } from "../redux/toggleLink";
import { updatecurrentTrackIndex } from "../redux/togglecurrentTrackIndex";
import { updatepathLink } from "../redux/togglePathLink";
import { updatepathLink2 } from "../redux/togglePathLink2";
import Header from "../components/Header";
const Public = () => {
  const link = useSelector((state: RootState) => state.toggleLink.link);
  const pathlink = useSelector(
    (state: RootState) => state.togglePathLink.pathLink
  );
  const pathlink2 = useSelector(
    (state: RootState) => state.togglePathLink2.pathLink2
  );
  const dispatch = useDispatch();
  const history = useNavigate();

  const currentTrackIndex = useSelector(
    (state: RootState) => state.togglecurrentTrackIndex.currentTrackIndexRedux
  );
  const data1 = useSelector((state: RootState) => state.toggleData1.data1Redux);

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
      console.log(window.location.pathname);
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
    }
  };
  const a = [
    {
      words: [
        {
          startTime: 0,
          endTime: 1000,
          data: "Một",
        },
        {
          startTime: 1000,
          endTime: 1300,
          data: "tình",
        },
        {
          startTime: 1300,
          endTime: 2000,
          data: "yêu",
        },
      ],
    },
    {
      words: [
        {
          startTime: 5630,
          endTime: 6170,
          data: "Chúng",
        },
        {
          startTime: 6170,
          endTime: 6690,
          data: "ta",
        },
        {
          startTime: 6690,
          endTime: 7250,
          data: "chẳng",
        },
        {
          startTime: 7250,
          endTime: 7250,
          data: "thể",
        },
        {
          startTime: 7250,
          endTime: 8320,
          data: "dừng",
        },
        {
          startTime: 8320,
          endTime: 8830,
          data: "chẳng",
        },
        {
          startTime: 8830,
          endTime: 9360,
          data: "thể",
        },
        {
          startTime: 9360,
          endTime: 12360,
          data: "đến",
        },
      ],
    },
  ];
  const convertMsToSeconds = (timeInMs: any) => {
    return timeInMs / 1000;
  };
  const formatTime = (timeInSeconds: any) => {
    const minutes = Math.floor(timeInSeconds / 60);
    const seconds = timeInSeconds % 60;

    for (let i = 0; i < a.length; i++) {
      if (
        timeInSeconds >= convertMsToSeconds(a[i]?.words?.[0]?.startTime) &&
        timeInSeconds <=
          convertMsToSeconds(a[i]?.words?.[a.length - 1]?.endTime)
      ) {
        const newArray = [];

        const b = a[i]?.words.map((item, index) => {
          // console.log(item);
          return item.data;
        });

        newArray.push(b);

        console.log(newArray.join(" "));
        return newArray.join("");
      }
    }

    return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
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
            className="flex items-center justify-center w-62"
            key="music-controls"
          >
            <p
              onClick={() => {
                toggle1();
                handleAudioClick();
              }}
            >
              Next
            </p>
            <p>Current Time: {formatTime(currentTime)}</p>
          </div>,
        ]}
      >
        <div className="rhap_main-controls" />
      </AudioPlayer>
    </div>
  );
};

export default Public;
