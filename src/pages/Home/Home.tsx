import Slides from "../../components/Slide/Slides";
import Slides2 from "../../components/Slide2/Slides2";
import Slides3 from "../../components/Slide3/Slides3";
import "react-h5-audio-player/lib/styles.css";
import ChartLine from "../../components/ChartLine/ChartLine";
import Slide4 from "../../components/Slide4/Slides4";
import Slide5 from "../../components/Slide5/Slides5";
import { CSSTransition } from "react-transition-group";
interface IProps {}

const Home: React.FC<IProps> = () => {
  return (
    <div className="w-full h-full">
      <Slides />

      <Slides3 />
      <Slide4 />
      <Slide5 />
      <Slides2 />
      <ChartLine />
    </div>
  );
};

export default Home;
