import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import AudioPlayer from "react-h5-audio-player";
import "react-h5-audio-player/lib/styles.css";
import { useParams } from "react-router-dom";
import { AppContext } from "../../Context/AppContext";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import { updateLink } from "../../redux/toggleLink";
import { useDispatch } from "react-redux";
export default function Playing() {
  const { link1 } = useContext(AppContext);
  const number = useSelector((state: RootState) => state.toggle.number);
  const number1 = useSelector((state: RootState) => state.toggle1.number1);
  const number2 = useSelector((state: RootState) => state.toggle2.number2);
  const link = useSelector((state: RootState) => state.toggleLink.link);
  console.log(number);
  console.log(number1);
  console.log(number2);
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
        response.data?.data?.data?.items?.[number]?.items?.[number2]?.[number1]
          ?.artists || []
      );

      setDatatitle(
        response.data?.data?.data?.items?.[number]?.items?.[number2]?.[number1]
          ?.title
      );
      setDataImg(
        response.data?.data?.data?.items?.[number]?.items?.[number2]?.[number1]
          ?.thumbnail
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
  const dispatch = useDispatch();

  useEffect(() => {
    fetchData1();
  }, []);
  useEffect(() => {
    fetchData();
  }, []);
  useEffect(() => {
    dispatch(updateLink(datalink));
    console.log(datalink);
  }, [datalink]);
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
    </div>
  );
}
