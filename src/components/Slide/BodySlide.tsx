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
const BodySlide = () => {
  const [data1, setData] = useState<any[]>([]);
  const [datatitle, setDatatitle] = useState("");
  const [currentIndex, setCurrentIndex] = useState(0);
  const { link1, setLink } = useContext(AppContext);
  const fetchData = async () => {
    try {
      const response = await axios.get(
        "https://apisolfive.app.tranviet.site/api/get/home"
      );
      setData(response.data?.data?.data?.items?.[7]?.items || []);
      setDatatitle(response.data?.data?.data?.items?.[7]?.title);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };
  const toggle = () => {
    setLink(7);
  };
  console.log(link1);
  useEffect(() => {
    fetchData();
  }, []);

  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: data1.length >= 6 ? 5 : 5,
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
              className="w-52 h-80 bg-black rounded-lg mx-10 gap-1 space-x-1"
              key={index}
            >
              <img src={item?.thumbnailM} alt="" className="rounded-lg" />

              <div className="flex items-center">
                {" "}
                <div>
                  {" "}
                  <div className="flex justify-start my-1 mx-2">
                    <div className="flex justify-start">
                      <p className="text-white">{item?.title}</p>{" "}
                    </div>
                  </div>
                  <div className="flex justify-start my-1 mx-2">
                    <div className="flex justify-start">
                      {" "}
                      <p className="text-white" onClick={toggle}>
                        {item?.artistsNames}
                      </p>
                    </div>
                  </div>
                </div>
                <div>
                  <Link to={`/play/${item?.encodeId}`}>
                    <div className="w-10 h-10 bg-white absolute z-20">
                      <PlayCircleOutlined />{" "}
                      {/* <AppProvider2>
                        {" "}
                        <div className="hidden">
                          <Playing />
                        </div>
                      </AppProvider2> */}
                    </div>
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </Slider>
      </div>
    </div>
  );
};

export default BodySlide;
