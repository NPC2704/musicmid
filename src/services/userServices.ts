import getToken from "../utils/Token/getToken";
import axios from "axios";

async function requestData(path: string, params = {}, headers = {}) {
  try {
    const response = await axios.get(path, { params, headers });
    return response.data;
  } catch (error) {
    console.error("Error fetching data:", error);
    // Hoặc xử lý lỗi theo ý muốn của bạn
    throw error; // Ném lỗi để cho phép các lớp gọi tiếp xử lý lỗi
  }
}

async function initData() {
  const data = await requestData(
    "https://apisolfive.app.tranviet.site/v2/user/info/init",
    {},
    {
      ...getToken(), // Giả sử bạn đã định nghĩa hàm getToken để lấy các thông tin header cần thiết
    }
  );
  return data;
}

export { initData };
