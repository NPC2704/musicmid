import React from "react";
import { SoundOutlined, RiseOutlined, SmileOutlined } from "@ant-design/icons";
const HeaderBodyKP = () => {
  return (
    <div className="w-full h-40 flex justify-between items-center ">
      <div className="w-full h-40 flex justify-between items-center mt-10">
        {" "}
        <div className="bg-[rgba(255,255,255,0.15)] w-96 h-14 flex items-center justify-center rounded hover:bg-[#212121] cursor-pointer">
          <SoundOutlined className="mr-5 text-white text-lg" />
          <h1 className="text-white text-2xl font-medium">Bản phát hành mới</h1>
        </div>
        <div className="bg-[rgba(255,255,255,0.15)] w-96 h-14 flex items-center justify-center rounded hover:bg-[#212121] cursor-pointer">
          <RiseOutlined className="mr-5 text-white text-lg" />
          <h1 className="text-white text-2xl font-medium">Bản xếp </h1>
        </div>
        <div className="bg-[rgba(255,255,255,0.15)] w-96 h-14 flex items-center justify-center rounded hover:bg-[#212121] cursor-pointer">
          <SmileOutlined className="mr-5 text-white text-lg" />
          <h1 className="text-white text-2xl font-medium">
            Tâm trạng và thể loại
          </h1>
        </div>
      </div>
    </div>
  );
};

export default HeaderBodyKP;
