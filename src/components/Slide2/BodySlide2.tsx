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
    <div className="w-full h-100">
      <div className="w-full h-20 flex items-center justify-start">
        <h1 className="text-white text-4xl font-bold">{datatitle}</h1>
      </div>
      <div className="w-full h-90">
        <div className="flex flex-col flex-wrap  w-full h-80">
          {data1.map((item: any, index) => (
            <div className="h-16 w-80  mr-4 mt-2 flex items-center">
              <img src={item.thumbnail} alt="" className="h-12 w-12" />
              <div className="ml-4">
                <p className="text-white text-lg">{item.title}</p>
                <p className="text-[#b4b4b4] text-lg">{item.artistsNames}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default BodySlide2;
