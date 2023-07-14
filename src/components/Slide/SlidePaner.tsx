import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./SlidePaner.css";

const SlidePaner = () => {
  const [data1, setData] = useState<any[]>([]);
  const [datatitle, setDatatitle] = useState("");
  const [currentSlide, setCurrentSlide] = useState(0);
  const sliderRef = useRef<Slider | null>(null);
  const fetchData = async () => {
    try {
      const response = await axios.get(
        "https://apisolfive.app.tranviet.site/api/get/home"
      );
      setData(response.data?.data?.data?.items?.[0]?.items || []);
      console.log(response.data?.data?.data?.items);
      setDatatitle(response.data?.data?.data?.items?.[2]?.title);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };
  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      if (sliderRef.current) {
        const nextSlide = (currentSlide + 1) % data1.length;
        setCurrentSlide(nextSlide);
        sliderRef.current.slickNext();
      }
    }, 5000);

    return () => {
      clearInterval(interval);
    };
  }, [currentSlide, data1]);

  const settings = {
    dots: true,
    infinite: true,
    speed: 700,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: false,
    beforeChange: (current: number, next: number) => setCurrentSlide(next),
  };
  return (
    <div className="w-full h-52 mt-4">
      {/* <style>
        {`
        .slick-next {
            height:10px;
            width:auto!important;
        }
        `}
      </style> */}
      <div className="w-full h-52 ">
        <Slider {...settings} ref={sliderRef} className="flex justify-around">
          {data1.map((item, index) => (
            <div
              className={`h-16 w-44 mt-2 flex items-center rounded ${
                index === currentSlide ? "slide-active" : ""
              }`}
              key={index}
            >
              <div className="flex justify-start w-84">
                <img src={item?.banner} alt="" className="h-40 w-80" />
              </div>
            </div>
          ))}
        </Slider>
      </div>
    </div>
  );
};

export default SlidePaner;
