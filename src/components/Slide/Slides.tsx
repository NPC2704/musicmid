import HeaderSlide from "./HeaderSlide";
import BodySlide from "../BodySlide";
import SlidePaner from "./SlidePaner";
import { AppProvider2 } from "../../Context/AppContext";
const Slides = () => {
  return (
    <div className=" w-full h-138 bg-black opacity-80">
      <div className="max-w-7xl h-full mx-auto">
        <HeaderSlide />
        <SlidePaner />
        <AppProvider2>
          <BodySlide numberBodySlide={11} numberSlide={5} />
        </AppProvider2>
      </div>
    </div>
  );
};

export default Slides;
