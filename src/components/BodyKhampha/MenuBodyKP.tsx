import React, { useEffect, useState } from "react";
import { CaretLeftOutlined, CaretRightOutlined } from "@ant-design/icons";
import axios from "axios";
const MenuBodyKP = () => {
  const [data1, setData] = useState<any[]>([]);
  const [datatitle, setDatatitle] = useState("");
  const randomColor = "#" + Math.floor(Math.random() * 16777215).toString(16);
  const fetchData = async () => {
    try {
      const response = await axios.get(
        "https://apisolfive.app.tranviet.site/api/get/home"
      );
      setData(response.data?.data?.data?.items?.[12]?.items || []);
      setDatatitle(response.data?.data?.data?.items?.[12]?.title);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };
  useEffect(() => {
    fetchData();
  }, []);
  return (
    <div className="w-full h-full">
      <div className="w-full h-20 flex items-center justify-start">
        <h1 className="text-white text-4xl font-bold">Tâm trạng và thể loại</h1>
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
        <div className="flex flex-col flex-wrap  w-full h-60">
          {data1.map((item: any, index) => (
            <div
              className={`h-10 w-60  mr-4 mt-2 flex items-center bg-[rgba(255,255,255,0.15)] border-l-4  border-${randomColor} border-solid rounded hover:bg-[#212121] cursor-pointer`}
            >
              <div className="ml-4 ">
                <p className="text-white text-sm">{item.title}</p>
              </div>
            </div>
          ))}
          {data1.map((item: any, index) => (
            <div
              className={`h-10 w-60  mr-4 mt-2 flex items-center bg-[rgba(255,255,255,0.15)] border-l-4  border-${randomColor} border-solid rounded hover:bg-[#212121]  cursor-pointer`}
            >
              <div className="ml-4 ">
                <p className="text-white text-sm">{item.title}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MenuBodyKP;
