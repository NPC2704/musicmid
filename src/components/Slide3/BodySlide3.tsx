import React, { useEffect, useState } from "react";
import logo from "../../assets/logo.jpg";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { updateNumber } from "../../redux/toggleSlice";
import { updateNumber1 } from "../../redux/toggleSlice1";
import { Link } from "react-router-dom";
const BodySlide3 = () => {
  const dispatch = useDispatch();
  const [data1, setData] = useState<any[]>([]);
  const [datatitle, setDatatitle] = useState("");

  const [dataChild, setDataChild] = useState(0);
  const fetchData = async () => {
    try {
      const response = await axios.get(
        "https://apisolfive.app.tranviet.site/api/get/home"
      );
      setData(response.data?.data?.data?.items?.[3]?.items || []);
      console.log(response.data?.data?.data?.items?.[3]?.items);
      console.log(response.data?.data?.data?.items?.[3]?.title);
      setDatatitle(response.data?.data?.data?.items?.[3]?.title);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };
  const toggle = () => {
    dispatch(updateNumber(3));
    dispatch(updateNumber1(dataChild));
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
            <div
              className="h-16 w-100  mr-4 mt-2 flex items-center "
              onMouseOver={() => setDataChild(index)}
            >
              <Link to={`/play/${item?.encodeId}`} onClick={toggle}>
                <img src={item.thumbnail} alt="" className="h-12 w-12" />
              </Link>
              <div className="ml-4">
                <div className="flex justify-start">
                  {" "}
                  <p className="text-white text-lg">{item.title}</p>
                </div>
                <div className="flex justify-start">
                  {" "}
                  <p className="text-[#b4b4b4] text-lg">{item.artistsNames}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default BodySlide3;
