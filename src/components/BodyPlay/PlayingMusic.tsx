// import React, { useContext, useEffect, useState } from "react";
// import axios from "axios";
// import { updateLink } from "../../redux/toggleLink";
// import { useParams } from "react-router-dom";
// import { useSelector } from "react-redux";
// import { RootState } from "../../redux/store";
// import { useDispatch } from "react-redux";
// import Logo from "../../assets/logo.jpg";
// const PlayingMusic = () => {
//   const dispatch = useDispatch();
//   const number = useSelector((state: RootState) => state.toggle.number);
//   const number1 = useSelector((state: RootState) => state.toggle1.number1);
//   const link = useSelector((state: RootState) => state.toggleLink.link);
//   const pathlink = useSelector(
//     (state: RootState) => state.togglePathLink.pathLink
//   );
//   const currentTrackIndexRedux = useSelector(
//     (state: RootState) => state.togglecurrentTrackIndex.currentTrackIndexRedux
//   );

//   const dataRedux = useSelector(
//     (state: RootState) => state.toggleData1.data1Redux
//   );
//   const [datalink, setDatalink] = useState("");
//   const params = useParams();
//   const idmusic = params.idmusic;
//   const [isPlaying, setIsPlaying] = useState(false);
//   const fetchData1 = async () => {
//     try {
//       const response = await axios.get(
//         `https://apisolfive.app.tranviet.site/api/get/song/sound?id=${idmusic}`
//       );
//       setDatalink(response?.data?.data?.data?.[128]);
//     } catch (error) {
//       console.error("Error fetching data:", error);
//     }
//   };
//   useEffect(() => {
//     fetchData1();
//   }, [idmusic]);
//   useEffect(() => {
//     dispatch(updateLink(datalink));
//   }, [idmusic, datalink]);

//   return (
//     <div className="w-100 h-110 ">
//       <h1 className="text-white font-semibold text-2xl">Title: tt</h1>
//       <div className="flex justify-center items-center mt-10">
//         <img
//           src={Logo}
//           alt=""
//           className="w-80 h-80 rotating-image rounded-full"
//         />
//       </div>
//     </div>
//   );
// };

// export default PlayingMusic;

// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import { updateLink } from "../../redux/toggleLink";
// import { useParams, useNavigate } from "react-router-dom";
// import { useDispatch } from "react-redux";
// import Logo from "../../assets/logo.jpg";
// import { useLocation } from "react-router-dom";
// const PlayingMusic = () => {
//   const dispatch = useDispatch();
//   const params = useParams();
//   const userId = params.id;
//   const idmusic = params.idmusic;
//   const [datalink, setDatalink] = useState("");
//   const [isPlaying, setIsPlaying] = useState(false);
//   const [imgMusic, setImgMusic] = useState(
//     "https://yt3.googleusercontent.com/nOwpUI4-9dJLMVZjxUbsghJ-8qBRsGZWthz4cXSSNjuSsBFLw7Zq4iH2awp-Hk3m4milTxAQng=s900-c-k-c0x00ffffff-no-rj"
//   );
//   const [titleMusic, setTitleMusic] = useState("Tên bài hát");
//   const [artistsNames, setArtistsNames] = useState("Tác giả");
//   const [currentTrackIndex, setCurrentTrackIndex] = useState(0);
//   const history = useNavigate();
//   const location = useLocation();
//   useEffect(() => {
//     const storedLinkHistory = localStorage.getItem("linkHistory");
//     const linkHistory = storedLinkHistory ? JSON.parse(storedLinkHistory) : [];
//     linkHistory.push(location.pathname);
//     localStorage.setItem("linkHistory", JSON.stringify(linkHistory));
//     console.log(linkHistory); // In ra lịch sử link đã lưu
//   }, [location]);
//   const fetchData = async () => {
//     try {
//       const response = await axios.get(
//         `https://apisolfive.app.tranviet.site/api/get/playlist/info?id=${userId}`
//       );
//       //  setData(response?.data?.data?.data?.song?.items);
//       //  setData(response?.data?.data?.data?.sections?.[0]?.items);
//       setTitleMusic(response?.data?.data?.data?.title);
//       setImgMusic(response?.data?.data?.data?.thumbnail);
//       console.log(response?.data?.data?.data?.title);
//       //   setIsDataLoaded(true);
//     } catch (error) {
//       console.error("Error fetching data:", error);
//     }
//   };
//   useEffect(() => {
//     fetchData();
//   }, [idmusic]);
//   useEffect(() => {
//     const fetchData1 = async () => {
//       try {
//         const response = await axios.get(
//           `https://apisolfive.app.tranviet.site/api/get/song/sound?id=${idmusic}`
//         );
//         setDatalink(response?.data?.data?.data?.[128]);
//       } catch (error) {
//         console.error("Error fetching data:", error);
//       }
//     };

//     fetchData1();
//   }, [idmusic]);

//   useEffect(() => {
//     dispatch(updateLink(datalink));
//   }, [datalink]);

//   return (
//     <div className="w-100 h-110 ">
//       <h1 className="text-white font-semibold text-2xl">Title: {titleMusic}</h1>
//       <div className="flex justify-center items-center mt-10">
//         <img
//           src={imgMusic}
//           alt=""
//           className="w-80 h-80 rotating-image rounded-full"
//         />
//       </div>
//     </div>
//   );
// };

// export default PlayingMusic;
import React, { useEffect, useState } from "react";
import axios from "axios";
import { updateLink } from "../../redux/toggleLink";
import { useParams, useNavigate } from "react-router-dom";
import Logo from "../../assets/logo.jpg";
import { useLocation } from "react-router-dom";
import { updatepathLink2 } from "../../redux/togglePathLink2";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../../redux/store";
import { updatesendLink } from "../../redux/toggleSendLink";
import { updatepathLinknumber } from "../../redux/togglePathLinkNumber";
const PlayingMusic = () => {
  const dispatch = useDispatch();
  const params = useParams();
  const userId = params.id;
  const idmusic = params.idmusic;
  const [datalink, setDatalink] = useState("");
  const [isPlaying, setIsPlaying] = useState(false);
  const [imgMusic, setImgMusic] = useState(
    "https://yt3.googleusercontent.com/nOwpUI4-9dJLMVZjxUbsghJ-8qBRsGZWthz4cXSSNjuSsBFLw7Zq4iH2awp-Hk3m4milTxAQng=s900-c-k-c0x00ffffff-no-rj"
  );
  const [titleMusic, setTitleMusic] = useState("Tên bài hát");
  const [artistsNames, setArtistsNames] = useState("Tác giả");
  const [currentTrackIndex, setCurrentTrackIndex] = useState(0);
  const history = useNavigate();
  const location = useLocation();
  const storedLinkHistory = localStorage.getItem("linkHistory");
  const linkHistory = storedLinkHistory ? JSON.parse(storedLinkHistory) : [];
  const [isDataLoaded, setIsDataLoaded] = useState(false);
  const [dataFetched, setDataFetched] = useState(false);
  const [previousPathname, setPreviousPathname] = useState("");
  const [numberLink, setNumberLink] = useState(1);
  const pathlink2 = useSelector(
    (state: RootState) => state.togglePathLink2.pathLink2
  );
  const sendLink = useSelector(
    (state: RootState) => state.toggleSendLink.sendLink
  );
  const pathLinkNumber = useSelector(
    (state: RootState) => state.togglePathLinkNumber.pathLinknumber
  );
  useEffect(() => {
    linkHistory.push(location.pathname);
    localStorage.setItem("linkHistory", JSON.stringify(linkHistory));
    setPreviousPathname(location.pathname);
    console.log(linkHistory); // In ra lịch sử link đã lưu
    console.log("Bi Reload 4");
  }, [location]);
  console.log(pathLinkNumber);
  const fetchData = async () => {
    try {
      const response = await axios.get(
        `https://apisolfive.app.tranviet.site/api/get/playlist/info?id=${userId}`
      );
      setTitleMusic(response?.data?.data?.data?.title);
      setImgMusic(response?.data?.data?.data?.thumbnail);
      console.log(response?.data?.data?.data?.title);
      setDataFetched(true);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `https://apisolfive.app.tranviet.site/api/get/song/sound?id=${idmusic}`
        );
        setDatalink(response?.data?.data?.data?.[128]);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
      console.log("Bi Reload 1");
    };
    if (window.location.pathname.split("/")[1] === "playlist") {
      dispatch(updatepathLink2(window.location.pathname));
    }
    fetchData();
  }, [idmusic]);

  useEffect(() => {
    if (pathLinkNumber === 0) {
      if (datalink && pathlink2) {
        dispatch(updateLink(datalink));
        console.log("Đã truyền 1");
        dispatch(updatepathLinknumber(1));
        console.log(pathLinkNumber);
      }
    } else {
      if (sendLink) {
        dispatch(updateLink(datalink));
        console.log("Đã truyền 2");
        dispatch(updatesendLink(false));
      }
    }
  }, [numberLink, datalink, pathlink2, sendLink]);

  useEffect(() => {
    if (!dataFetched && location.pathname !== previousPathname) {
      fetchData();
      console.log("Bi Reload 3");
    }
  }, [dataFetched, location.pathname, previousPathname]);

  return (
    <div className="w-100 h-110 ">
      <h1 className="text-white font-semibold text-2xl">Title: {titleMusic}</h1>
      <div className="flex justify-center items-center mt-10">
        <img
          src={imgMusic}
          alt=""
          className="w-80 h-80 rotating-image rounded-full"
        />
      </div>
    </div>
  );
};

export default PlayingMusic;
