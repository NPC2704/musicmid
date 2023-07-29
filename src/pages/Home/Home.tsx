import Slides from "../../components/Slide/Slides";
import Slides2 from "../../components/Slide2/Slides2";
import Slides3 from "../../components/Slide3/Slides3";
import "react-h5-audio-player/lib/styles.css";
import ChartLine from "../../components/ChartLine/ChartLine";
import { CSSTransition } from "react-transition-group";
import PlayingList from "../../components/BodyPlay/PlayingList";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../../redux/store";
import Header from "../../components/Header";
import BodySlide from "../../components/BodySlide";
interface IProps {}
const Home = () => {
  const pathLinkNumber = useSelector(
    (state: RootState) => state.togglePathLinkNumber.pathLinknumber
  );

  return (
    <div className="w-full h-full">
      {/* <Header /> */}
      <Slides />

      <Slides3 />
      <div className=" w-full h-100 bg-black">
        <div className="max-w-7xl h-full mx-auto">
          <BodySlide numberBodySlide={7} numberSlide={3} />
        </div>
      </div>
      <div className=" w-full h-100 bg-black">
        <div className="max-w-7xl h-full mx-auto">
          <BodySlide numberBodySlide={6} numberSlide={3} />
        </div>
      </div>
      <Slides2 />
      <ChartLine />
    </div>
  );
};

export default Home;
