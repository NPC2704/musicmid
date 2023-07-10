import { ReactNode } from "react";

interface IProps {
  children: ReactNode;
}

const DefaultLayout: React.FC<IProps> = ({ children }) => {
  return <div className="">{children}</div>;
};

export default DefaultLayout;
