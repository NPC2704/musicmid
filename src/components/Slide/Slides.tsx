import React from "react";
import HeaderSlide from "./HeaderSlide";
import BodySlide from "./BodySlide";
const Slides = () => {
  return (
    <div className=" w-full h-128 bg-black">
      <div className="max-w-7xl h-full mx-auto">
        <HeaderSlide />
        <BodySlide />
      </div>
    </div>
  );
};

export default Slides;
