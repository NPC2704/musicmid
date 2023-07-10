import { Link } from "react-router-dom";

interface IDataComponent {
  id: number;
  title: string;
}

const dataSlide: IDataComponent[] = [
  {
    id: 1,
    title: "Năng lượng",
  },
  {
    id: 2,
    title: "Thư giãn",
  },
  {
    id: 3,
    title: "Tập thể dục",
  },
  {
    id: 4,
    title: "Đi làm",
  },
  {
    id: 5,
    title: "Tập trung",
  },
];

export default dataSlide;
