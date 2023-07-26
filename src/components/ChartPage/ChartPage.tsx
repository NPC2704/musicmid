import React, { useEffect, useState, useContext } from "react";
import { Line } from "react-chartjs-3";
import { useDispatch, useSelector } from "react-redux";
import Logo from "../../assets/logo.jpg";
import axios from "axios";
import { Link } from "react-router-dom";
import getTime from "../../utils/convertTime";
import "./ChartLine.css";
import { updateNumber } from "../../redux/toggleSlice";
import { updateNumber1 } from "../../redux/toggleSlice1";
import { updateNumber2 } from "../../redux/toggleSlice2";
const chartStyle = {
  width: "1000px",
  height: "400px",
};
const paragraphStyle = {
  background:
    "radial-gradient(50% 124.93% at 95.86% -10%,#3efad9 0,hsla(0,0%,100%,0) 100%),linear-gradient(91.56deg,#ff9357 1.54%,#9100ff 98.71%)",
  WebkitBackgroundClip: "text",
  WebkitTextFillColor: "transparent",
  fontSize: "3rem",
  fontWeight: "bold",
};
const ChartPage: React.FC = () => {
  const dispatch = useDispatch();
  const [showCount, setShowCount] = useState(3);
  const handleShowMore = () => {
    setShowCount((prevCount) => prevCount + 10);
  };
  const [data0, setData0] = useState<any[]>([]);
  const [data1, setData1] = useState<any[]>([]);
  const [data2, setData2] = useState<any[]>([]);
  const [data3, setData3] = useState<any[]>([]);
  const [data4, setData4] = useState<any[]>([]);
  const [titleMusic1, setTitleMusic1] = useState("");
  const [titleMusic2, setTitleMusic2] = useState("");
  const [titleMusic3, setTitleMusic3] = useState("");
  const [dataChild, setDataChild] = useState(1);
  const [datatitle, setDatatitle] = useState("");
  const [title, setTitle] = useState("all");
  const fetchData = async () => {
    try {
      const response = await axios.get(
        "https://apisolfive.app.tranviet.site/v2/api/get/home"
      );
      const response1 = await axios.get(
        "https://apisolfive.app.tranviet.site/v2/api/get/charthome"
      );

      setData0(response1?.data?.data?.data?.RTChart?.items || []);
      setData1(response.data?.data?.data?.items?.[9]?.chart?.times || []);
      setData2(
        response.data?.data?.data?.items?.[9]?.chart?.items?.Z6AABFU6 || []
      );
      setData3(
        response.data?.data?.data?.items?.[9]?.chart?.items?.Z6CUFFZA || []
      );
      setData4(
        response.data?.data?.data?.items?.[9]?.chart?.items?.Z6BADFAZ || []
      );
      console.log(
        response.data?.data?.data?.items?.[9]?.chart?.items?.values[0]
      );
      setTitleMusic1(response.data?.data?.data?.items?.[9]?.items?.[0]?.title);
      setTitleMusic2(response.data?.data?.data?.items?.[9]?.items?.[1]?.title);
      setTitleMusic3(response.data?.data?.data?.items?.[9]?.items?.[2]?.title);
      //    setDatatitle(response.data?.data?.data?.items?.[2]?.title);
      console.log(response.data?.data?.data?.items?.[9]);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };
  useEffect(() => {
    fetchData();
  }, []);

  const options = {
    responsive: true,
    // Các tùy chọn khác của biểu đồ
    scales: {
      y: {
        display: false, // Ẩn thanh Y
      },
    },
  };

  const data = {
    labels: data1.map((item, index) => ` ${item.hour}`),

    datasets: [
      {
        label: titleMusic1,
        data: data3.map((item, index) => ` ${data3?.[index]?.counter}`),
        fill: false,
        borderColor: "rgba(192, 75, 192, 1)",
      },
      {
        label: titleMusic2,
        data: data2.map((item, index) => ` ${data2?.[index]?.counter}`),
        fill: false,
        borderColor: "rgba(75, 192, 192, 1)",
      },

      {
        label: titleMusic3,
        data: data4.map((item, index) => ` ${data4?.[index]?.counter}`),
        fill: false,
        borderColor: "rgba(192, 192, 75, 1)",
      },
    ],
  };

  const toggle = () => {
    dispatch(updateNumber(2));
    dispatch(updateNumber2(title));
    dispatch(updateNumber1(dataChild));
  };
  return (
    <div className="w-full h-auto bg-[#221a2d] mx-auto rounded-md px-3 pt-9 ">
      {" "}
      <div className="w-full h-4 ">
        <p style={paragraphStyle}>#Music Chart</p>
      </div>
      <div className="w-full h-auto  mt-5 block mt-24">
        <div className="chart-container mx-auto" style={chartStyle}>
          <Line data={data} />
        </div>
        <div className="w-full h-auto flex ">
          {" "}
          <div className=" w-100 h-auto block mt-10 mb-10">
            {data0.slice(0, showCount).map((item, index) => (
              <div
                className={`group  border-b border-neutral-900 h-14 px-2 flex items-center justify-between text-white w-121 mx-auto`}
                key={index}
              >
                <p className="text-3xl font-medium text-[#4bc0c0]">
                  {index + 1}
                </p>

                <div className="flex items-center overflow-hidden mr-4 w-72">
                  <div className="flex items-center">
                    <div className="h-9 w-9 mr-4 relative cursor-pointer">
                      {" "}
                      <Link
                        to={`/play/${item?.encodeId}`}
                        onClick={() => {
                          toggle();
                        }}
                      >
                        {" "}
                        <img
                          loading="lazy"
                          src={data0?.[index]?.thumbnail}
                          alt="song-thumbnail"
                          className="rounded-sm h-full object-cover"
                        />
                      </Link>
                    </div>

                    <div>
                      <div className="font-semibold whitespace-nowrap cursor-pointer">
                        <div>{data0?.[index]?.title}</div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="w-32">
                  <div className="text-whiteT1 text-sm flex items-center whitespace-nowrap ">
                    <p>{data0?.[index]?.artistsNames}</p>
                  </div>
                </div>
                <div className="flex justify-between">
                  <div className="text-whiteT1 flex items-center">
                    <div className="text-sm ">
                      {getTime.caculateTimeFM(data0?.[index]?.duration)}
                    </div>
                  </div>
                </div>
              </div>
            ))}
            {showCount < data0.length && (
              <div
                className="mx-auto h-8 w-32 border-solid border-2 flex justify-center items-center rounded-full text-white cursor-pointer hover:bg-[#b366da]"
                onClick={handleShowMore}
              >
                <p>Xem top 100</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChartPage;
