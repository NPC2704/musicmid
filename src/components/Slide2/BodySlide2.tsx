import React, { useEffect, useState } from "react";
import logo from "../../assets/logo.jpg";
import axios from "axios";
const BodySlide2 = () => {
  const [data1, setData] = useState<any[]>([]);
  const [datatitle, setDatatitle] = useState("");
  const fetchData = async () => {
    try {
      const response = await axios.get(
        "https://apisolfive.app.tranviet.site/api/get/home"
      );
      setData(response.data?.data?.data?.items?.[2] || []);
      console.log(response.data?.data?.data?.items?.[2]?.items);
      setDatatitle(response.data?.data?.data?.items?.[2]?.title);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };
  useEffect(() => {
    fetchData();
  }, []);
  return (
    <div className="w-full h-100">
      <div className="w-full h-20 flex items-center justify-start">
        <h1 className="text-white text-4xl font-bold">{datatitle}</h1>
      </div>
      <div className="w-full h-90 ">
        <div className="flex justify-around w-full h-80 ">
          <div className="h-12 w-60  mr-4 mt-2 flex items-center border-4  border-${#fff} border-solid rounded">
            <div className="ml-4 ">
              <div className="flex justify-start">
                <p className="text-white text-lg">All</p>
              </div>
            </div>
          </div>
          <div className="h-12 w-60  mr-4 mt-2 flex items-center border-4  border-${#fff} border-solid rounded">
            <div className="ml-4 ">
              <div className="flex justify-start">
                <p className="text-white text-lg">Others</p>
              </div>
            </div>
          </div>
          <div className="h-12 w-60  mr-4 mt-2 flex items-center border-4  border-${#fff} border-solid rounded">
            <div className="ml-4 ">
              <div className="flex justify-start">
                <p className="text-white text-lg">vPops</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BodySlide2;
