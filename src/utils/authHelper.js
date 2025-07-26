import { toast } from "react-hot-toast";
import { UserDB } from "./utility";
import axios from "axios";

export const handleSocialLogin = async (
  providerFn,
  navigate,
  successMsg = "Login Successful"
) => {
  try {
    const { user } = await providerFn();

    const userInfo = {
      name: user?.displayName,
      email: user?.email,
      image: user?.photoURL,
    };

    if (user) {
      const dbRes = await UserDB(userInfo);
      if (dbRes?.data) {
        await axios.post(
          `${import.meta.env.VITE_API_URL}/jwt`,
          { email: user?.email },
          {
            withCredentials: true,
          }
        );
      }
      toast.success(successMsg);
      navigate("/");
    }
  } catch (err) {
    console.error(err);
    toast.error("Social login failed");
  }
};
