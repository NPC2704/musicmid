import React, { useEffect, useState } from "react";
import logo from "../../assets/logo.jpg";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { updateNumber } from "../../redux/toggleSlice";
import { updateNumber1 } from "../../redux/toggleSlice1";
import { updateNumber2 } from "../../redux/toggleSlice2";
import { RootState } from "../../redux/store";
import { updateLink } from "../../redux/toggleLink";
import { Link } from "react-router-dom";
const BodySlide2 = () => {
  const dispatch = useDispatch();
  const [data1, setData] = useState<any[]>([]);
  const [datatitle, setDatatitle] = useState("");
  const [datalink, setDatalink] = useState("");
  const [title, setTitle] = useState("all");
  const [dataChild, setDataChild] = useState(1);
  const link = useSelector((state: RootState) => state.toggleLink.link);

  const fetchData = async () => {
    try {
      const response = await axios.get(
        "https://apisolfive.app.tranviet.site/api/get/home"
      );
      setData(response.data?.data?.data?.items?.[2]?.items[title] || []);
      console.log(response.data?.data?.data?.items?.[2]?.items[title]);
      console.log(response.data?.data?.data?.items[2]?.items?.vPop);
      console.log(response.data?.data?.data?.items[2]?.items?.others);
      setDatatitle(response.data?.data?.data?.items?.[2]?.title);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };
  console.log(dataChild);
  const toggle = () => {
    dispatch(updateNumber(2));
    dispatch(updateNumber2(title));
    dispatch(updateNumber1(dataChild));
  };
  useEffect(() => {
    fetchData();
  }, [dataChild]);
  useEffect(() => {
    fetchData();
  }, [title]);
  console.log(title);
  return (
    <div className="w-full h-100">
      <div className="w-full h-20 flex items-center justify-start">
        <h1 className="text-white text-4xl font-bold">{datatitle}</h1>
      </div>
      <div className="w-full h-24 ">
        <div className="flex justify-around w-full h-80 ">
          <div
            className="h-12 w-60  mr-4 mt-2 flex items-center border-4  border-${#fff} border-solid rounded cursor-pointer hover:bg-[#e9ebec] group"
            onClick={() => setTitle("all")}
          >
            <div className="ml-4 ">
              <div className="flex justify-start">
                <p className="text-white text-lg group-hover:text-black">All</p>
              </div>
            </div>
          </div>
          <div
            className="h-12 w-60  mr-4 mt-2 flex items-center border-4  border-${#fff} border-solid rounded  cursor-pointer  hover:bg-[#e9ebec] group"
            onClick={() => setTitle("vPop")}
          >
            <div className="ml-4 ">
              <div className="flex justify-start">
                <p className="text-white text-lg group-hover:text-black">
                  Others
                </p>
              </div>
            </div>
          </div>
          <div
            className="h-12 w-60  mr-4 mt-2 flex items-center border-4  border-${#fff} border-solid rounded  cursor-pointer  hover:bg-[#e9ebec] group"
            onClick={() => setTitle("others")}
          >
            <div className="ml-4 ">
              <div className="flex justify-start">
                <p className="text-white text-lg group-hover:text-black">
                  vPops
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="h-101 w-90  flex flex-col flex-wrap">
        {data1.map((item, index) => (
          <div
            className="h-16 w-60 mb-4 ml-16 flex items-center"
            key={index}
            onMouseOver={() => setDataChild(index)}
          >
            <Link
              to={`/play/${item?.encodeId}`}
              onClick={() => {
                toggle();
              }}
            >
              {" "}
              <img
                src={item.thumbnail}
                alt=""
                className="h-12 w-12 cursor-pointer"
              />
            </Link>
            <div className="flex justify-center items-center ml-4">
              {" "}
              <p className="text-white" onMouseOver={() => setDataChild(index)}>
                {item.title}{" "}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BodySlide2;
