import { Link } from "react-router-dom";

interface IDataComponent {
  id: number;
  title: string;
  link: string;
}

const dataComponents: IDataComponent[] = [
  {
    id: 1,
    title: "Trang chủ",
    link: "/",
  },
  {
    id: 2,
    title: "Khám phá",
    link: "/kham-pha",
  },
  {
    id: 3,
    title: "Thư viện",
    link: "/thu-vien",
  },
  {
    id: 4,
    title: "Nâng cao",
    link: "",
  },
  {
    id: 5,
    title: "Search",
    link: "",
  },
];

export default dataComponents;
