import { get, post } from "../utils/Token/request";
import storage from "../utils/Token/storage";

async function googleLoginService(body: object) {
  const API_ = "https://apisolfive.app.tranviet.site/user/auth/google";

  return post(API_, { ...body }).then((data) => {
    return data;
  });
}

export { googleLoginService };
