import React, { useEffect } from "react";
import AudioPlayer from "react-h5-audio-player";
import "react-h5-audio-player/lib/styles.css";
import { Outlet, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../redux/store";
import { updateLink } from "../redux/toggleLink";
import { updatecurrentTrackIndex } from "../redux/togglecurrentTrackIndex";
import "./public.css";
const Public = () => {
  const link = useSelector((state: RootState) => state.toggleLink.link);
  const dispatch = useDispatch();
  const history = useNavigate();
  useEffect(() => {
    // Cập nhật link nhạc trong Redux khi nó thay đổi
    dispatch(updateLink(link));
  }, [link, dispatch]);
  console.log(link);
  // Các biến state từ component "PlayingList"
  const currentTrackIndex = useSelector(
    (state: RootState) => state.togglecurrentTrackIndex.currentTrackIndexRedux
  );
  const data1 = useSelector((state: RootState) => state.toggleData1.data1Redux);
  console.log(currentTrackIndex);
  console.log(data1);
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
    history("/playlist/ZWZB969E");
  };
  return (
    <div>
      <Outlet />
      <AudioPlayer
        className={
          link === "" ? "hidden" : "player-music fixed bottom-0 left-0 z-50"
        }
        src={link}
        layout="stacked-reverse"
        showSkipControls={true}
        showJumpControls={false}
        onClickNext={handleClickNext}
        onClickPrevious={handleClickPre}
        // customAdditionalControls={[
        //         //   <div
        //         //     className="flex items-center justify-center w-62"
        //         //     key="music-controls"
        //         //   >
        //         //     <img src={imgMusic} alt="Music Cover" className="h-8 w-8" />
        //         //     <p className="ml-4 text-white text-lg font-bold w-60">
        //         //       {titleMusic} <br /> (
        //         //       <span className="text-sm font-medium">{artistsNames}</span>)
        //         //     </p>
        //         //   </div>,
        //         // ]}
      >
        <div className="rhap_main-controls" />
      </AudioPlayer>
    </div>
  );
};

export default Public;

// import React, { useContext, useEffect, useState } from "react";
// import AudioPlayer from "react-h5-audio-player";
// import "react-h5-audio-player/lib/styles.css";
// import { Outlet } from "react-router-dom";
// import { useSelector, useDispatch } from "react-redux";
// import { RootState } from "../redux/store";
// import { updateLink } from "../redux/toggleLink";
// import { updatecurrentTrackIndex } from "../redux/togglecurrentTrackIndex";

// import axios from "axios";
// const Public = () => {
//   const link = useSelector((state: RootState) => state.toggleLink.link);
//   const idlink = useSelector((state: RootState) => state.toggleidLink.idlink);
//   const dispatch = useDispatch();
//   useEffect(() => {
//     // Cập nhật link nhạc trong Redux khi nó thay đổi
//     dispatch(updateLink(link));
//   }, [link, dispatch]);
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

//   const handleClickPre = () => {
//     const previousIndex = currentTrackIndex - 1;
//     if (previousIndex >= 0) {
//       dispatch(updatecurrentTrackIndex(previousIndex));
//     }
//   };
//   const [datalink, setDatalink] = useState("");
//   const fetchData1 = async () => {
//     try {
//       const response = await axios.get(
//         `https://apisolfive.app.tranviet.site/api/get/song/sound?id=${idlink}`
//       );
//       setDatalink(response?.data?.data?.data?.[128]);
//     } catch (error) {
//       console.error("Error fetching data:", error);
//     }
//   };
//   useEffect(() => {
//     fetchData1();
//   }, [idlink]);
//   return (
//     <div>
//       <Outlet />
//       <AudioPlayer
//         className={
//           datalink === "" ? "hidden" : "player-music fixed bottom-0 left-0 z-50"
//         }
//         src={datalink}
//         layout="stacked-reverse"
//         showSkipControls={true}
//         showJumpControls={false}
//         onClickNext={handleClickNext}
//         onClickPrevious={handleClickPre}
//         // customAdditionalControls={[
//         //   <div
//         //     className="flex items-center justify-center w-62"
//         //     key="music-controls"
//         //   >
//         //     <img src={imgMusic} alt="Music Cover" className="h-8 w-8" />
//         //     <p className="ml-4 text-white text-lg font-bold w-60">
//         //       {titleMusic} <br /> (
//         //       <span className="text-sm font-medium">{artistsNames}</span>)
//         //     </p>
//         //   </div>,
//         // ]}
//       >
//         <div className="rhap_main-controls" />
//       </AudioPlayer>
//     </div>
//   );
// };

// export default Public;
