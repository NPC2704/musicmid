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

async function googleLoginService(body: object) {
  const API_ = "https://apisolfive.app.tranviet.site/user/auth/google";

  return post(API_, { ...body }).then((data) => {
    return data;
  });
}

export { googleLoginService };
