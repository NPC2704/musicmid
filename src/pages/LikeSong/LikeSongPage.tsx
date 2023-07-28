import React, { useContext, useEffect, useState, useMemo } from "react";
import axios from "axios";
import "react-h5-audio-player/lib/styles.css";

import { useDispatch } from "react-redux";

import getTime from "../../utils/convertTime";
import Box from "@mui/material/Box";
import { Avatar, List, Skeleton, Switch } from "antd";
import "./Play.css";
import getHeaderToken from "../../utils/Token/getToken";
export default function LikeSongPage() {
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(false);
  const [data1, setData] = useState<any[]>([]);
  const [dataImg, setDataImg] = useState("");
  const [dataTitle, setDataTitle] = useState("");
  const [dataTotal, setDataTotal] = useState(0);
  const [dataTime, setDataTime] = useState(0);
  const [dataDes, setDataDes] = useState("");
  useEffect(() => {
    const fetchData3 = async () => {
      try {
        const response = await axios.get(
          `https://apisolfive.app.tranviet.site/v2/user/get/playlist/favorite`,

          {
            headers: {
              ...getHeaderToken(),
            },
          }
        );
        setData(response?.data?.data?.data?.song?.items);
        setDataImg(response?.data?.data?.data?.thumbnail);
        setDataTitle(response?.data?.data?.data?.title);
        setDataTotal(response?.data?.data?.data?.song?.total);
        setDataTime(response?.data?.data?.data?.song?.totalDuration);
        setDataDes(response?.data?.data?.data?.sortDescription);
        console.log(response?.data?.data?.data?.song);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData3();
  }, []);
  const whiteSkeletonStyle = {
    backgroundColor: "#242526",
    color: "#18191a",
    height: "600px",
    width: "600px",
    borderRadius: "10px",
  };
  return isLoading ? (
    <div className="w-full h-full py-5 flex justify-center items-center ">
      <Skeleton active style={whiteSkeletonStyle} />
    </div>
  ) : (
    <div className="w-full h-130 bg-transparent flex items-end">
      <div className="w-full h-110  ">
        <div className="flex  w-121 mx-auto">
          <div>
            <div className="h-64 w-64 rounded">
              <img
                className="h-full w-full rounded"
                alt="playlist-thumbnail"
                src={dataImg}
              />
            </div>
          </div>
          <div className="ml-9">
            <div className="py-5">
              <h1 className="text-white font-semibold text-4xl">{dataTitle}</h1>
            </div>
            <div className="text-[#dee1e6]">
              <div className="">
                <div className="py-1">Danh sách phát • Music</div>
                <div className="py-1">
                  {`${dataTotal} song • 
            ${dataTime ? getTime.caculateTime(dataTime) : ""}`}
                </div>
              </div>
              <div className="mt-3 text-sm">{dataDes}</div>
            </div>
          </div>
        </div>
        <div className="mt-0 mt-12 pb-32">
          {data1.map((item, index) => (
            <div
              className={`group border-b border-neutral-900 h-14 px-2 flex items-center justify-between text-white w-121 mx-auto`}
            >
              <div
                className="flex items-center overflow-hidden mr-4 w-72"
                onMouseOver={() => {}}
              >
                <div className="flex items-center">
                  <div className="h-9 w-9 mr-4 relative cursor-pointer">
                    <img
                      loading="lazy"
                      src={data1?.[index]?.thumbnailM}
                      alt="song-thumbnail"
                      className="rounded-sm h-full object-cover"
                    />{" "}
                    {/* <InfoThumb isFocus={isFocus} isPlaying={isPlaying} /> */}
                  </div>

                  <div>
                    <div className="font-semibold whitespace-nowrap cursor-pointer">
                      <div>{data1?.[index]?.title}</div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="w-32">
                <div className="text-whiteT1 text-sm flex items-center whitespace-nowrap ">
                  {data1?.[index]?.artists.map((item: any, indexx: any) => (
                    <p className="text-white">
                      {data1?.[index]?.artists?.[indexx]?.name} {}
                    </p>
                  ))}
                </div>
              </div>
              <div className="flex justify-between">
                <div className="text-whiteT1 flex items-center">
                  <div className="text-sm ">
                    {getTime.caculateTimeFM(data1?.[index]?.duration)}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
