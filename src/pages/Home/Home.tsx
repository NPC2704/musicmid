import Header from "../../components/Header";
import Slides from "../../components/Slide/Slides";
import Slides2 from "../../components/Slide2/Slides2";
import Slides3 from "../../components/Slide3/Slides3";
import AudioPlayer from "react-h5-audio-player";
import "react-h5-audio-player/lib/styles.css";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import ChartLine from "../../components/ChartLine/ChartLine";
import Slide4 from "../../components/Slide4/Slides4";
import Slide5 from "../../components/Slide5/Slides5";
interface IProps {}

const Home: React.FC<IProps> = () => {
  const link = useSelector((state: RootState) => state.toggleLink.link);
  console.log(link);

  return (
    <div className="w-full h-full">
      <Header />

      <Slides />

      <Slides3 />
      <Slide4 />
      <Slide5 />
      <Slides2 />
      <ChartLine />
      {/* <AudioPlayer
        className="player-music fixed bottom-0 left-0 z-50"
        layout="stacked-reverse"
        src={link}
        showSkipControls={true}
        showJumpControls={false}
        customAdditionalControls={[
          <div
            className="flex items-center justify-center w-62"
            key="music-controls"
          ></div>,
        ]}
      >
        <div className="rhap_main-controls" />
      </AudioPlayer> */}
    </div>
  );
};

export default Home;
