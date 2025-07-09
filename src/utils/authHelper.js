import { toast } from "react-hot-toast";
import { UserDB } from "./utility";

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
      await UserDB(userInfo);
      toast.success(successMsg)
      navigate("/");
    }
  } catch (err) {
    console.error(err);
    toast.error("Social login failed");
  }
};
