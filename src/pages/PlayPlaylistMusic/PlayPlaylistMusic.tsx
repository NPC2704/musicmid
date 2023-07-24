import React from "react";
import Header from "../../components/Header";
import PlayingList from "../../components/BodyPlay/PlayingList";
interface IProps {}
const PlayPlaylistMusic = () => {
  return (
    <div className="bg-black h-full">
      {/* <Header /> */}
      <PlayingList />
    </div>
  );
};

export default PlayPlaylistMusic;
