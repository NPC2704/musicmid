import { get, post } from "../utils/Token/request";
import storage from "../utils/Token/storage";
import getHeaderToken from "../utils/Token/getHeaderToken";

async function likeSong(body: object) {
  const API_ = "https://apisolfive.app.tranviet.site/v2/user/song/like";
  return post(
    API_,
    { ...body },
    {
      headers: {
        ...getHeaderToken(),
      },
    }
  ).then((data) => {
    return data;
  });
}

async function addToPlaylist(body: object) {
  const API_ = "https://apisolfive.app.tranviet.site/v2/user/playlist/add/song";

  const userInfo = await storage.getItem("userInfo");
  const userId = userInfo?.user?.uid;

  return post(API_, { ...body, userId }).then((data) => {
    return data;
  });
}

async function removeToPlaylist(body: object) {
  const API_ =
    "https://apisolfive.app.tranviet.site/v2/user/playlist/remove/song";

  const userInfo = await storage.getItem("userInfo");
  const userId = userInfo?.user?.uid;

  return post(API_, { ...body, userId }).then((data) => {
    return data;
  });
}

async function initData() {
  const API_ = "https://apisolfive.app.tranviet.site/v2/user/info/init";

  const data = await get(
    API_,
    {},
    {
      ...getHeaderToken(),
    }
  );
  return data;
}

export { likeSong, initData, addToPlaylist, removeToPlaylist };
