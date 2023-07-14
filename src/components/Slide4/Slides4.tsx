import HeaderSlide from "./HeaderSlide";
import BodySlide4 from "./BodySlide4";

import { AppProvider2 } from "../../Context/AppContext";
const Slide4 = () => {
  return (
    <div className=" w-full h-100 bg-black">
      <div className="max-w-7xl h-full mx-auto">
        <AppProvider2>
          <BodySlide4 />
        </AppProvider2>
      </div>
    </div>
  );
};

export default Slide4;
