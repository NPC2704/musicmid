import Header from "../../components/Header";
import Slides from "../../components/Slide/Slides";
import Slides2 from "../../components/Slide2/Slides2";
interface IProps {}

const Home: React.FC<IProps> = () => {
  return (
    <div className="w-full h-full">
      <Header />
      <Slides />
      <Slides2 />
    </div>
  );
};

export default Home;
