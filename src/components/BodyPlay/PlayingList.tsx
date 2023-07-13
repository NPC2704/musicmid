// import React, { useContext, useEffect, useState } from "react";
// import axios from "axios";
// import AudioPlayer from "react-h5-audio-player";
// import "react-h5-audio-player/lib/styles.css";
// import { useParams } from "react-router-dom";

// import { useSelector } from "react-redux";
// import { RootState } from "../../redux/store";
// export default function PlayingList() {
//   const number = useSelector((state: RootState) => state.toggle.number);
//   const number1 = useSelector((state: RootState) => state.toggle1.number1);

//   const [data1, setData] = useState<any[]>([]);
//   const [datatitle, setDatatitle] = useState("");
//   const [dataImg, setDataImg] = useState("");
//   const [datalink, setDatalink] = useState("");
//   const [idMusic, setIdMusic] = useState("");
//   const params = useParams();
//   const userId = params.id;
//   const handleClickNext = () => {};
//   const handleClickPre = () => {};
//   const fetchData = async () => {
//     try {
//       const response = await axios.get(
//         `https://apisolfive.app.tranviet.site/api/get/playlist/info?id=${userId}`
//       );
//       setData(response?.data?.data?.data?.song?.items);
//       console.log(response?.data?.data?.data?.song?.items);
//       console.log(response?.data?.data?.data?.song?.items?.[0]?.title);

//       setDatatitle(response?.data?.data?.data?.title);
//       setDataImg(response?.data?.data?.data?.thumbnail);
//     } catch (error) {
//       console.error("Error fetching data:", error);
//     }
//   };
//   const fetchData1 = async () => {
//     try {
//       const response = await axios.get(
//         `https://apisolfive.app.tranviet.site/api/get/song/sound?id=${idMusic}`
//       );
//       setDatalink(response?.data?.data?.data?.[128]);
//       console.log(response?.data?.data?.data?.[128]);
//     } catch (error) {
//       console.error("Error fetching data:", error);
//     }
//   };
//   console.log(idMusic);
//   useEffect(() => {
//     fetchData();
//     fetchData1();
//   }, [idMusic]);
//   return (
//     <div className=" w-full h-130 bg-transparent flex items-end">
//       <div className="w-full h-110  flex justify-around">
//         <div className="w-80 h-110 ">
//           {" "}
//           <h1 className="text-white font-semibold text-2xl">
//             Title: {datatitle}
//           </h1>
//           <div className=" flex justify-center items-center mt-10">
//             {" "}
//             <img src={dataImg} alt="" className="w-80 h-80 " />
//           </div>
//         </div>
//         <div className="w-110 h-110 bg-transparent overflow-y-auto scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-gray-200 rounded-md">
//           <table className="table-auto w-full  mb-1">
//             <thead className="bg-slate-800 h-12 text-gray-500 hover:bg-slate-600 bg-slate-600 text-teal-400">
//               <tr>
//                 <th className="w-1/10">#</th>
//                 <th className="w-1/10">Tên bài hát</th>
//                 <th className="w-1/10">
//                   <i className="fa fa-download"></i>
//                 </th>
//               </tr>
//             </thead>
//             <tbody>
//               {data1.map((item, index) => (
//                 <tr
//                   className="bg-slate-800 h-12 text-gray-500 hover:bg-slate-600 bg-slate-600 text-teal-400"
//                   key={index}
//                   onClick={() => {
//                     setIdMusic(data1?.[index]?.encodeId);
//                   }}
//                 >
//                   <td className="w-1/10 text-center">{index}</td>
//                   <td className="w-1/10">{data1?.[index]?.title}</td>
//                   <td className="w-1/10 text-center">
//                     <a>
//                       <i className="fa fa-download"></i>
//                     </a>
//                   </td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         </div>
//       </div>

//       <AudioPlayer
//         className="player-music absolute bottom-0 left-0 z-50 bg-[#475569]"
//         src={datalink}
//         layout="stacked-reverse"
//         showSkipControls={true}
//         showJumpControls={false}
//         onClickNext={handleClickNext}
//         onClickPrevious={handleClickPre}
//       />
//     </div>
//   );
// }
import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import AudioPlayer from "react-h5-audio-player";
import "react-h5-audio-player/lib/styles.css";
import { useParams } from "react-router-dom";

import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";

export default function PlayingList() {
  const number = useSelector((state: RootState) => state.toggle.number);
  const number1 = useSelector((state: RootState) => state.toggle1.number1);

  const [data1, setData] = useState<any[]>([]);
  const [datatitle, setDatatitle] = useState("");
  const [dataImg, setDataImg] = useState("");
  const [datalink, setDatalink] = useState("");
  const [idMusic, setIdMusic] = useState("");
  const [currentTrackIndex, setCurrentTrackIndex] = useState(0); // Thêm state để lưu index của bài hát hiện tại
  const params = useParams();
  const userId = params.id;

  const handleClickNext = () => {
    const nextIndex = currentTrackIndex + 1;
    if (nextIndex < data1.length) {
      setCurrentTrackIndex(nextIndex);
      setIdMusic(data1[nextIndex]?.encodeId);
    }
  };

  const handleClickPre = () => {
    const previousIndex = currentTrackIndex - 1;
    if (previousIndex >= 0) {
      setCurrentTrackIndex(previousIndex);
      setIdMusic(data1[previousIndex]?.encodeId);
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
        <div className="w-80 h-110 ">
          <h1 className="text-white font-semibold text-2xl">
            Title: {datatitle}
          </h1>
          <div className="flex justify-center items-center mt-10">
            <img src={dataImg} alt="" className="w-80 h-80 " />
          </div>
        </div>
        <div className="w-110 h-110 bg-transparent overflow-y-auto scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-gray-200 rounded-md">
          <table className="table-auto w-full  mb-1">
            <thead className="bg-slate-800 h-12 text-gray-500 hover:bg-slate-600 bg-slate-600 text-teal-400">
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
                  className="bg-slate-800 h-12 text-gray-500 hover:bg-slate-600 bg-slate-600 text-teal-400"
                  key={index}
                  onClick={() => {
                    setCurrentTrackIndex(index);
                    setIdMusic(data1?.[index]?.encodeId);
                  }}
                >
                  <td className="w-1/10 text-center">{index}</td>
                  <td className="w-1/10">{data1?.[index]?.title}</td>
                  <td className="w-1/10 text-center">
                    <a>
                      <i className="fa fa-download"></i>
                    </a>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <AudioPlayer
        className="player-music absolute bottom-0 left-0 z-50 bg-[#406b69]"
        src={datalink}
        layout="stacked-reverse"
        showSkipControls={true}
        showJumpControls={false}
        onClickNext={handleClickNext}
        onClickPrevious={handleClickPre}
      />
    </div>
  );
}
