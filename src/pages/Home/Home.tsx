import Header from "../../components/Header";
import Slides from "../../components/Slide/Slides";
import Slides2 from "../../components/Slide2/Slides2";
import Slides3 from "../../components/Slide3/Slides3";
interface IProps {}

const Home: React.FC<IProps> = () => {
  return (
    <div className="w-full h-full">
      <Header />
      <Slides />
      <Slides3 />
      <Slides2 />
    </div>
  );
};

export default Home;
