import axios from "axios";

async function googleLogin(body = Object) {
  try {
    const response = await axios.post(
      "https://apisolfive.app.tranviet.site/user/auth/google",
      {
        ...body,
      }
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching data:", error);
    // Hoặc xử lý lỗi theo ý muốn của bạn
    throw error; // Ném lỗi để cho phép các lớp gọi tiếp xử lý lỗi
  }
}
export { googleLogin };
