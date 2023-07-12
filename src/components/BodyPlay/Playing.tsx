import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import AudioPlayer from "react-h5-audio-player";
import "react-h5-audio-player/lib/styles.css";
import Logo from "../../assets/logo.jpg";
import { useParams } from "react-router-dom";
import { AppContext } from "../../Context/AppContext";
export default function Playing() {
  const { link1 } = useContext(AppContext);
  const handleClickNext = () => {};
  const handleClickPre = () => {};
  const [data1, setData] = useState<any[]>([]);
  const [datatitle, setDatatitle] = useState("");
  const [dataImg, setDataImg] = useState("");
  const [datalink, setDatalink] = useState("");
  const params = useParams();
  const userId = params.id;
  console.log(link1);

  const fetchData = async () => {
    try {
      const response = await axios.get(
        "https://apisolfive.app.tranviet.site/api/get/home"
      );
      setData(
        response.data?.data?.data?.items?.[link1]?.items?.[7]?.artists || []
      );
      console.log(response.data?.data?.data?.items);
      console.log(response.data?.data?.data?.items?.[link1]?.items?.[7]?.title);
      setDatatitle(
        response.data?.data?.data?.items?.[link1]?.items?.[7]?.title
      );
      setDataImg(
        response.data?.data?.data?.items?.[link1]?.items?.[7]?.thumbnail
      );
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };
  const fetchData1 = async () => {
    try {
      const response = await axios.get(
        `https://apisolfive.app.tranviet.site/api/get/song/sound?id=${userId}`
      );
      setDatalink(response?.data?.data?.data?.[128]);
      console.log(response?.data?.data?.data?.[128]);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };
  console.log(userId);
  console.log(datalink);
  useEffect(() => {
    fetchData();
    fetchData1();
  }, []);
  return (
    <div className=" w-full h-130 bg-transparent flex items-end">
      <div className="w-full h-110  flex justify-around">
        <div className="w-80 h-110 ">
          {" "}
          <h1 className="text-white font-semibold text-2xl">
            Title: {datatitle}
          </h1>
          <div className=" flex justify-center items-center mt-10">
            {" "}
            <img src={dataImg} alt="" className="w-80 h-80 " />
          </div>
        </div>
        <div className="w-110 h-110 bg-transparent">
          <table className="table-auto w-full">
            <thead className="bg-slate-800 h-12 text-gray-500 hover:bg-slate-600  bg-slate-600 text-teal-400">
              <tr>
                <th className="w-[10%]">#</th>
                <th className="w-[10%]">Author</th>
                <th className="w-[10%]">
                  <i className="fa fa-download"></i>
                </th>
              </tr>
            </thead>
            <tbody>
              {data1.map((item, index) => (
                <tr
                  className="bg-slate-800 h-12 text-gray-500 hover:bg-slate-600  bg-slate-600 text-teal-400"
                  key={index}
                >
                  <td className="text-center">{index}</td>
                  <td>{item.name}</td>

                  <td className="text-center">
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
        className="player-music absolute bottom-0 left-0 z-50"
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
