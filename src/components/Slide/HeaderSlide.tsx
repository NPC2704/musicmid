import React from "react";
import dataSlide from "../../data/dataSlide";
const HeaderSlide = () => {
  return (
    <div className="w-full h-40 flex justify-start items-center mt-8">
      <div className="h-full  w-full flex justify-start items-center">
        {dataSlide.map((item) => (
          <div className="mr-6 bg-[#475056] px-4 py-1 rounded-md hover:bg-[#3a575f] cursor-pointer">
            <p className="text-white">{item.title}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HeaderSlide;
