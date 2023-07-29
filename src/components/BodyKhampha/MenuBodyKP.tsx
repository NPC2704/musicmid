import React, { useEffect, useState } from "react";
import { CaretLeftOutlined, CaretRightOutlined } from "@ant-design/icons";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../../redux/store";
import { updateNumber } from "../../redux/toggleSlice";
import { Avatar, List, Skeleton, Switch } from "antd";
import { updateNumber1 } from "../../redux/toggleSlice1";
import { Link } from "react-router-dom";
import { API } from "../../LinkAPI";
const MenuBodyKP = () => {
  const dispatch = useDispatch();

  const [data1, setData] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [datatitle, setDatatitle] = useState("");
  const randomColor = "#" + Math.floor(Math.random() * 16777215).toString(16);
  const [dataChild, setDataChild] = useState(0);
  const fetchData = async () => {
    try {
      const response = await axios.get(API.GET_DISCOVER_API);
      setData(response.data?.data?.data?.items?.[13]?.items || []);
      setDatatitle(response.data?.data?.data?.items?.[13]?.title);
      setIsLoading(false);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };
  const toggle = () => {
    dispatch(updateNumber(13));
    dispatch(updateNumber1(dataChild));
  };
  useEffect(() => {
    fetchData();
  }, []);
  const whiteSkeletonStyle = {
    backgroundColor: "#242526",
    color: "#18191a",
    height: "40%",
    width: "40%",
    marginLeft: "10px",
    borderRadius: "10px",
  };
  return (
    <div className="w-full h-full">
      <div className="w-full h-20 flex items-center justify-start">
        <h1 className="text-white text-4xl font-bold">{datatitle}</h1>
      </div>
      <div className="w-full h-90">
        <div className="w-full h-20 flex justify-end items-center">
          <div className="w-40 border border-solid boder-white p-1 rounded-sm cursor-pointer">
            <h2 className="text-white">Xem thêm</h2>
          </div>
          <div className="w-full h-10 flex justify-end items-center">
            <div className="border-solid p-2 border-[#4f4f50] border flex items-center rounded-full mx-2 cursor-pointer">
              <CaretLeftOutlined className="text-white" />
            </div>
            <div className="border-solid p-2 border-[#4f4f50] border flex items-center rounded-full cursor-pointer">
              <CaretRightOutlined className="text-white" />
            </div>
          </div>
        </div>
        {isLoading ? (
          <div className="w-full h-100   ">
            {" "}
            <div className="w-full h-60 flex justify-center  ">
              {" "}
              <Skeleton active style={whiteSkeletonStyle} />
              <Skeleton active style={whiteSkeletonStyle} />
              <Skeleton active style={whiteSkeletonStyle} />
            </div>
          </div>
        ) : (
          <div className="flex flex-col flex-wrap  w-full h-80">
            {data1.map((item: any, index) => (
              <Link
                to={`/playlistmusic/${item?.encodeId}`}
                onClick={() => {
                  toggle();
                  setDataChild(index);
                }}
              >
                {" "}
                <div
                  className={`h-16 w-66  mr-4 mt-2 flex items-center bg-[rgba(255,255,255,0.15)] border-l-4  border-${randomColor} border-solid rounded hover:bg-[#212121]  cursor-pointer`}
                  onMouseOver={() => setDataChild(index)}
                >
                  <div className="ml-4 ">
                    <p className="text-white text-sm">{data1?.[index].title}</p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default MenuBodyKP;
