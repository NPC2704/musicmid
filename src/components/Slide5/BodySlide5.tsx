import React, { useEffect, useState, useContext } from "react";
import {
  CaretLeftOutlined,
  CaretRightOutlined,
  PlayCircleOutlined,
} from "@ant-design/icons";
import axios from "axios";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Playing from "../BodyPlay/Playing";
import { Link } from "react-router-dom";
import { AppProvider2, AppContext } from "../../Context/AppContext";
import { useDispatch, useSelector } from "react-redux";
import { updateNumber } from "../../redux/toggleSlice";
import { updateNumber1 } from "../../redux/toggleSlice1";
const BodySlide5 = () => {
  const dispatch = useDispatch();
  const [data1, setData] = useState<any[]>([]);
  const [datatitle, setDatatitle] = useState("");
  const [currentIndex, setCurrentIndex] = useState(0);
  const { link1, setLink } = useContext(AppContext);
  const [dataChild, setDataChild] = useState(0);
  const fetchData = async () => {
    try {
      const response = await axios.get(
        "https://apisolfive.app.tranviet.site/api/get/home"
      );
      setData(response.data?.data?.data?.items?.[6]?.items || []);
      setDatatitle(response.data?.data?.data?.items?.[6]?.title);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const toggle = () => {
    setLink(7);
    dispatch(updateNumber(7));
    dispatch(updateNumber1(dataChild));
  };
  // console.log(dataChild);
  // console.log(link1);
  useEffect(() => {
    fetchData();
  }, []);

  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    //  slidesToShow: data1.length >= 6 ? 5 : 5,
    slidesToShow: 5,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 4,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        },
      },
    ],
  };

  return (
    <div className="w-full h-100">
      <div className="w-full h-20 flex items-center justify-start">
        <h1 className="text-white text-4xl font-bold">{datatitle}</h1>
      </div>
      <div className="w-full h-90">
        <Slider {...settings} className="w-full h-85 space-x-1">
          {data1.map((item: any, index) => (
            <div
              onMouseOver={() => setDataChild(index)}
              className="w-52 h-80 bg-black rounded-lg mx-10 gap-1 space-x-1"
              key={index}
            >
              <div className="flex justify-center relative group">
                {" "}
                <img
                  src={item?.thumbnail}
                  alt=""
                  className="rounded-lg h-52 w-52"
                />
                <div className="bg-transparent absolute bottom-3 right-10 w-fit h-fit z-10  justify-center items-center hidden group-hover:flex">
                  <Link to={`/playlist/${item?.encodeId}`} onClick={toggle}>
                    <PlayCircleOutlined className="text-[#3e4140] font-medium text-3xl	hover:scale-125 hover:text-white transition-all" />{" "}
                  </Link>
                </div>
              </div>

              <div className="flex justify-center h-14 mb-5">
                {" "}
                <div className="flex items-center">
                  {" "}
                  <div>
                    {" "}
                    <div className="flex justify-start my-1 mx-2">
                      <div className="flex justify-start">
                        <p className="text-white">{item?.title}</p>{" "}
                      </div>
                    </div>
                  </div>
                </div>{" "}
              </div>
            </div>
          ))}
        </Slider>
      </div>
    </div>
  );
};

export default BodySlide5;
