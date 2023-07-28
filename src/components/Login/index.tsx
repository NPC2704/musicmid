import { useGoogleOneTapLogin } from "@react-oauth/google";
import { handleLoginSuccessGG } from "../../utils/Token/login";

const Login: React.FC = () => {
  useGoogleOneTapLogin({
    onSuccess: handleLoginSuccessGG,
    onError: () => {
      console.log("Error");
    },
  });

  return null;
};

export default Login;
