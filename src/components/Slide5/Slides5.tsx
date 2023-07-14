import HeaderSlide from "./HeaderSlide";
import BodySlide5 from "./BodySlide5";

import { AppProvider2 } from "../../Context/AppContext";
const Slide5 = () => {
  return (
    <div className=" w-full h-100 bg-black">
      <div className="max-w-7xl h-full mx-auto">
        <AppProvider2>
          <BodySlide5 />
        </AppProvider2>
      </div>
    </div>
  );
};

export default Slide5;
