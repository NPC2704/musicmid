import React from "react";
import { Line } from "react-chartjs-2";

interface ChartLineProps {
  data: number[][];
}

const ChartLine: React.FC = () => {
  // Dữ liệu biểu đồ
  const chartData = {
    labels: [
      "Tháng 1",
      "Tháng 2",
      "Tháng 3",
      "Tháng 4",
      "Tháng 5",
      "Tháng 6",
      "Tháng 7",
      "Tháng 8",
      "Tháng 9",
      "Tháng 10",
      "Tháng 11",
      "Tháng 12",
    ],
    datasets: [
      {
        label: "Dòng 1",
        data: [10, 20, 30, 40, 50, 60, 70, 80, 90, 100, 110, 120],
        borderColor: "red",
        fill: false,
      },
      {
        label: "Dòng 2",
        data: [5, 15, 25, 35, 45, 55, 65, 75, 85, 95, 105, 115],
        borderColor: "blue",
        fill: false,
      },
      {
        label: "Dòng 3",
        data: [15, 25, 35, 45, 55, 65, 75, 85, 95, 105, 115, 125],
        borderColor: "green",
        fill: false,
      },
    ],
  };

  // Cấu hình biểu đồ
  const chartOptions = {
    responsive: true,
    scales: {
      x: {
        display: true,
        title: {
          display: true,
          text: "Tháng",
        },
      },
      y: {
        display: true,
        title: {
          display: true,
          text: "Giá trị",
        },
      },
    },
  };

  return (
    <div>
      <Line data={chartData} />
    </div>
  );
};

export default ChartLine;
