import React, { useState } from "react";
import HeaderBodyKP from "./HeaderBodyKP";
import MenuBodyKP from "./MenuBodyKP";
const BodyKP = () => {
  const [myState, setMyState] = useState("initial value");
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
