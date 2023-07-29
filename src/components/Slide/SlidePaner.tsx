import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./SlidePaner.css";
import { Avatar, List, Skeleton, Switch } from "antd";
import { API } from "../../LinkAPI";
const SlidePaner = () => {
  const [data1, setData] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const fetchData = async () => {
    try {
      const response = await axios.get(API.GET_DISCOVER_API);
      setData(response.data?.data?.data?.items?.[0]?.items || []);
      setIsLoading(false);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };
  const getArrSlider = (start: number, end: number, number: number) => {
    const limit = start > end ? number : end;
    let output = [];
    for (let i = start; i <= limit; i++) {
      output.push(i);
    }
    if (start > end) {
      for (let i = 0; i <= end; i++) {
        output.push(i);
      }
    }
    return output;
  };
  useEffect(() => {
    fetchData();
    const sliderEls = document.getElementsByClassName("slider-item");
    let min = 0;
    let max = 2;
    const intervalId = setInterval(() => {
      const list = getArrSlider(min, max, sliderEls.length - 1);
      for (let i = 0; i < sliderEls.length; i++) {
        // Delete classnames (css)
        sliderEls[i]?.classList?.remove(
          "animate-slide-right",
          "order-last",
          "z-20"
        );
        sliderEls[i]?.classList?.remove(
          "animate-slide-left",
          "order-first",
          "z-10"
        );
        sliderEls[i]?.classList?.remove(
          "animate-slide-left2",
          "order-2",
          "z-10"
        );
      }
      // Add animation by adding classnames
      list.forEach((item) => {
        if (item === max) {
          sliderEls[item]?.classList?.add(
            "animate-slide-right",
            "order-last",
            "z-20"
          );
        } else if (item === min) {
          sliderEls[item]?.classList?.add(
            "animate-slide-left",
            "order-first",
            "z-10"
          );
        } else {
          sliderEls[item]?.classList?.add(
            "animate-slide-left2",
            "order-2",
            "z-10"
          );
        }
      });
      min = min === sliderEls.length - 1 ? 0 : min + 1;
      max = max === sliderEls.length - 1 ? 0 : max + 1;
    }, 2000);
    return () => {
      intervalId && clearInterval(intervalId);
    };
  }, []);
  const whiteSkeletonStyle = {
    backgroundColor: "#242526",
    color: "#18191a",
    height: "40%",
    width: "40%",
    marginLeft: "10px",
    borderRadius: "10px",
  };
  return isLoading ? (
    <div className="w-full h-86 flex justify-center  ">
      {" "}
      <Skeleton active style={whiteSkeletonStyle} />
      <Skeleton active style={whiteSkeletonStyle} />
      <Skeleton active style={whiteSkeletonStyle} />
    </div>
  ) : (
    <div className="w-full overflow-hidden px-[59px]">
      <div className="flex w-full gap-8 pt-8">
        {data1?.map((item, index) => (
          <img
            key={item.encodeId}
            src={item.banner}
            className={`slider-item flex-1 object-contain w-[30%] rounded-lg ${
              index <= 2 ? "block" : "hidden"
            }`}
          />
        ))}
      </div>
    </div>
  );
};

export default SlidePaner;
