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
// import { updatepathLinknumber } from "../redux/togglePathLinkNumber";
// import Header from "../components/Header";
// // import "./public.css";
// const Public = () => {
//   const link = useSelector((state: RootState) => state.toggleLink.link);
//   const pathlink = useSelector(
//     (state: RootState) => state.togglePathLink.pathLink
//   );
//   const pathlink2 = useSelector(
//     (state: RootState) => state.togglePathLink2.pathLink2
//   );
//   const pathlinknumber = useSelector(
//     (state: RootState) => state.togglePathLinkNumber.pathLinknumber
//   );
//   const dispatch = useDispatch();
//   const history = useNavigate();

//   useEffect(() => {
//     // Cập nhật link nhạc trong Redux khi nó thay đổi
//     dispatch(updateLink(link));
//   }, [link, dispatch]);
//   console.log(link);
//   // Các biến state từ component "PlayingList"
//   const currentTrackIndex = useSelector(
//     (state: RootState) => state.togglecurrentTrackIndex.currentTrackIndexRedux
//   );
//   const data1 = useSelector((state: RootState) => state.toggleData1.data1Redux);
//   console.log(currentTrackIndex);
//   console.log(data1);
//   const handleClickNext = () => {
//     const nextIndex = currentTrackIndex + 1;
//     if (nextIndex < data1.length) {
//       dispatch(updatecurrentTrackIndex(nextIndex));
//     }
//   };
//   console.log(pathlink);
//   const handleClickPre = () => {
//     const previousIndex = currentTrackIndex - 1;
//     if (previousIndex >= 0) {
//       dispatch(updatecurrentTrackIndex(previousIndex));
//     }
//   };

//   return (
//     <div>
//       <Header />
//       <Outlet />
//       <AudioPlayer
//         className={
//           link === "" ? "hidden" : "player-music fixed bottom-0 left-0 z-50"
//         }
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
//             {/* <img src={imgMusic} alt="Music Cover" className="h-8 w-8" />
//                     <p className="ml-4 text-white text-lg font-bold w-60">
//                       {titleMusic} <br /> (
//                       <span className="text-sm font-medium">{artistsNames}</span>)
//                     </p> */}
//             <p onClick={() => {}}>NExt</p>
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
import { updatepathLinknumber } from "../redux/togglePathLinkNumber";
import Header from "../components/Header";

const Public = () => {
  const link = useSelector((state: RootState) => state.toggleLink.link);
  const pathlink = useSelector(
    (state: RootState) => state.togglePathLink.pathLink
  );
  const pathlink2 = useSelector(
    (state: RootState) => state.togglePathLink2.pathLink2
  );
  const pathlinknumber = useSelector(
    (state: RootState) => state.togglePathLinkNumber.pathLinknumber
  );
  const dispatch = useDispatch();
  const history = useNavigate();

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
  console.log(window.location);
  const handleAudioClick = () => {
    history(pathlink2);
  };

  // if (pathlinknumber === 0) {
  dispatch(updatepathLink(window.location.pathname));
  // }

  // dispatch(updatepathLinknumber(pathlinknumber + 1));

  const toggle1 = () => {
    dispatch(updatepathLink2(pathlink));
    dispatch(updatepathLink(window.location.pathname));
  };
  console.log(pathlink);
  console.log(pathlink2);
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
