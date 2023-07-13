import HeaderSlide from "./HeaderSlide";
import BodySlide from "./BodySlide";
import SlidePaner from "./SlidePaner";
import { AppProvider2 } from "../../Context/AppContext";
const Slides = () => {
  return (
    <div className=" w-full h-128 bg-black">
      <div className="max-w-7xl h-full mx-auto">
        <HeaderSlide />
        <SlidePaner />
        <AppProvider2>
          <BodySlide />
        </AppProvider2>
      </div>
    </div>
  );
};

export default Slides;
