import getToken from "../utils/Token/getToken";
import axios from "axios";

export const get = async (path: string, params = {}, headers = {}) => {
  const response = await axios.get(path, { params: params, headers: headers });
  return response.data;
};

export const post = async (path: string, body = {}, options = {}) => {
  const response = await axios.post(path, body, {
    ...options,
  });
  return response.data;
};

async function initData() {
  const API_ = "https://apisolfive.app.tranviet.site/v2/user/info/init";

  const data = await get(
    API_,
    {},
    {
      ...getToken(),
    }
  );
  return data;
}

export { initData };
