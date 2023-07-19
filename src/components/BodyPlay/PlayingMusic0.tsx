import React, { useState } from "react";
import { RootState } from "../../redux/store";
import { useSelector, useDispatch } from "react-redux";
const PlayingMusic0 = () => {
  const title = useSelector((state: RootState) => state.toggleTitle.titleMusic);
  const img = useSelector((state: RootState) => state.toggleImg.imgMusic);
  const [imgMusic, setImgMusic] = useState(
    "https://yt3.googleusercontent.com/nOwpUI4-9dJLMVZjxUbsghJ-8qBRsGZWthz4cXSSNjuSsBFLw7Zq4iH2awp-Hk3m4milTxAQng=s900-c-k-c0x00ffffff-no-rj"
  );
  return (
    <div className="w-100 h-110 ">
      <h1 className="text-white font-semibold text-2xl">Title: {title}</h1>
      <div className="flex justify-center items-center mt-10">
        <img
          src={img}
          alt=""
          className="w-80 h-80 rotating-image rounded-full"
        />
      </div>
    </div>
  );
};

export default PlayingMusic0;
