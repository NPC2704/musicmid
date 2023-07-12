import Header from "../../components/Header";
import Playing from "../../components/BodyPlay/Playing";
import { AppProvider2 } from "../../Context/AppContext";
const PlayMusic = () => {
  return (
    <div className="bg-black h-full">
      <Header />
      <AppProvider2>
        <Playing />{" "}
      </AppProvider2>
    </div>
  );
};

export default PlayMusic;
