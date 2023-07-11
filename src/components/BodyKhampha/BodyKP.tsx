import React from "react";
import HeaderBodyKP from "./HeaderBodyKP";
import MenuBodyKP from "./MenuBodyKP";
const BodyKP = () => {
  return (
    <div className=" w-full h-full bg-black">
      <div className="max-w-7xl h-full mx-auto">
        <HeaderBodyKP />
        <MenuBodyKP />
      </div>
    </div>
  );
};

export default BodyKP;
