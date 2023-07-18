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

import React, { useEffect } from "react";
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
  console.log(pathlink);
  useEffect(() => {
    dispatch(updateLink(link));
  }, [link, dispatch]);

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

  // console.log(link);
  console.log(pathlink2);
  console.log(pathlink);

  return (
    <div>
      <Header />
      <Outlet />
      <AudioPlayer
        className={`${
          link === "" ? "hidden" : "player-music fixed bottom-0 left-0 z-50"
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
          </div>,
        ]}
      >
        <div className="rhap_main-controls" />
      </AudioPlayer>
    </div>
  );
};

export default Public;
