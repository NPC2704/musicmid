import React, { useEffect, useState, useContext } from "react";
import { Line } from "react-chartjs-3";
import Logo from "../../assets/logo.jpg";
import axios from "axios";
import { Link } from "react-router-dom";
import "./ChartLine.css";
const chartStyle = {
  width: "800px",
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
const ChartLine: React.FC = () => {
  const [data0, setData0] = useState<any[]>([]);
  const [data1, setData1] = useState<any[]>([]);
  const [data2, setData2] = useState<any[]>([]);
  const [data3, setData3] = useState<any[]>([]);
  const [data4, setData4] = useState<any[]>([]);
  const [titleMusic1, setTitleMusic1] = useState("");
  const [titleMusic2, setTitleMusic2] = useState("");
  const [titleMusic3, setTitleMusic3] = useState("");
  const fetchData = async () => {
    try {
      const response = await axios.get(
        "https://apisolfive.app.tranviet.site/api/get/home"
      );
      setData0(response.data?.data?.data?.items?.[9]?.items || []);
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
      setTitleMusic1(response.data?.data?.data?.items?.[9]?.items?.[0]?.title);
      setTitleMusic2(response.data?.data?.data?.items?.[9]?.items?.[1]?.title);
      setTitleMusic3(response.data?.data?.data?.items?.[9]?.items?.[2]?.title);
      console.log(response.data?.data?.data?.items?.[9]);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };
  useEffect(() => {
    fetchData();
  }, []);
  const labels1 = data2.map((item, index) => ` ${data2?.[index]?.counter}`);
  console.log(labels1);
  const options = {
    responsive: true,
    // Các tùy chọn khác của biểu đồ
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

  return (
    <div className="w-full h-110 flex justify-normal items-center mb-10">
      <div className="w-120 h-100 bg-[#221a2d] mx-auto rounded-md px-3">
        {" "}
        <div className="w-full h-4 ">
          <p style={paragraphStyle}>#Music Chart</p>
        </div>
        <div className="w-full h-100 flex justify-center items-center mt-5">
          <div className=" w-100 h-80 block ">
            {data0.map((item, index) => {
              if (index <= 2) {
                return (
                  <div
                    className="bg-[#745887] w-80 h-20 mb-3 mx-auto flex rounded-md"
                    key={index}
                  >
                    <div className="h-full w-10 flex justify-center items-center">
                      <p className="text-3xl font-medium text-[#4bc0c0]">
                        {index + 1}
                      </p>
                    </div>
                    <div className="h-full w-10 flex justify-center items-center">
                      <img
                        src={data0?.[index]?.thumbnail}
                        alt=""
                        className="rounded h-14 w-12"
                      />
                    </div>
                    <div className="flex items-center justify-center ml-3">
                      <div className="block text-white font-normal">
                        <div className="flex justify-start">
                          <p>{data0?.[index]?.title}</p>
                        </div>
                        <div className="flex justify-start">
                          <p>{data0?.[index]?.artistsNames}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              }
            })}
            <Link to="/musicchart">
              <div className="mx-auto h-8 w-32 border-solid border-2 flex justify-center items-center rounded-full text-white cursor-pointer hover:bg-[#b366da]">
                <p>Xem thêm</p>
              </div>
            </Link>
          </div>
          <div className="chart-container" style={chartStyle}>
            <Line data={data} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChartLine;
