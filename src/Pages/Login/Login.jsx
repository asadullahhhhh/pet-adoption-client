import { Link, useNavigate } from "react-router";
import { FcGoogle } from "react-icons/fc";
import { FaFacebook } from "react-icons/fa";
import Lottie from "lottie-react";
import loginAnim from "../../assets/login.json";
import useAuth from "../../hooks/useAuth";
import { handleSocialLogin } from "../../utils/authHelper";
import toast from "react-hot-toast";
import { UserDB } from "../../utils/utility";
import { useState } from "react";
import { BeatLoader } from "react-spinners";
import axios from "axios";

const LoginPage = () => {

  const { signIn, googleLogin, facebookLogin, darkLight } = useAuth();
  const navigate = useNavigate()
    const [disabe, setdisable] = useState(false);

  // email password login
  const handleSubmit = async e => {
    e.preventDefault()
    setdisable(true)

    const email = e.target.email.value 
    const password = e.target.password.value 

    try{
      const {user} = await signIn(email, password)
      
      const userInfo = {
        name: user?.displayName,
        email: user?.email,
        iamge: user?.photoURL,
      };

      if(user){
        const res = await UserDB(userInfo)
        if(res?.data){
          await axios.post(
            `${import.meta.env.VITE_API_URL}/jwt`,
            { email: user?.email },
            {
              withCredentials: true,
            }
          );
        }
        navigate('/')
        toast.success('Login successful')
        setdisable(false)
      }
    }catch(err){
      toast.error(err.message)
    }
  }

  // google Login method
    const handelGoogleLogin= async () => {
      handleSocialLogin(googleLogin, navigate, "Google Login Successful")
    };
  
  //   facebook logind method
    const handelFacebookLogin = async () => {
      handleSocialLogin(facebookLogin, navigate, "Facebook Login Successful")
    }

  return (
    <div
      className={`${
        darkLight ? "dark" : ""
      } min-h-screen bg-gradient-to-tr from-blue-50 via-gray-200 to-green-50 dark:from-gray-800 dark:via-gray-900 dark:to-gray-800 flex justify-center items-center px-4 relative`}
    >
      <div className="w-full -mt-20 max-w-5xl border dark:border-gray-800/80 relative bg-white/30 dark:bg-gray-800/50 rounded-2xl shadow-2xl overflow-hidden flex flex-col md:flex-row items-center justify-between">
        {/* Left Side - Lottie */}
        <div className="hidden md:block md:w-1/2">
          <Lottie
            animationData={loginAnim}
            loop={false}
            className="w-full h-[400px]"
          />
        </div>

        {/* Right Side - Form */}
        <div className="w-full md:w-1/2 p-8 space-y-6 relative">
          <h2 className="text-2xl font-bold text-center text-gray-800 dark:text-white">
            Login to Your Account
          </h2>

          <form onSubmit={handleSubmit} className="space-y-4">
            <input
              type="email"
              name="email"
              placeholder="Email"
              className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-100 focus:outline-none focus:ring focus:ring-blue-200 dark:focus:ring-blue-500"
            />
            <input
              type="password"
              name="password"
              placeholder="Password"
              className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-100 focus:outline-none focus:ring focus:ring-blue-200 dark:focus:ring-blue-500"
            />
            <button
              type="submit"
              disabled={disabe}
              className="w-full cursor-pointer bg-blue-500 text-white font-semibold py-2 rounded-md hover:bg-blue-600 dark:hover:bg-blue-700 transition"
            >
              {disabe ? <BeatLoader color="#ffffff" size={8} /> : "Login"}
            </button>
          </form>

          {/* Divider */}
          <div className="flex items-center my-4">
            <div className="flex-grow h-px bg-gray-300 dark:bg-gray-600"></div>
            <span className="px-2 text-sm text-gray-500 dark:text-gray-400">
              OR
            </span>
            <div className="flex-grow h-px bg-gray-300 dark:bg-gray-600"></div>
          </div>

          {/* Social Buttons */}
          <div className="space-y-3">
            <button
              onClick={handelGoogleLogin}
              className="w-full flex cursor-pointer items-center justify-center gap-3 border border-gray-300 dark:border-gray-600 py-2 rounded-md bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-100 hover:bg-gray-100 dark:hover:bg-gray-600 transition"
            >
              <FcGoogle size={24} />
              <span>Login with Google</span>
            </button>
            <button
              onClick={handelFacebookLogin}
              className="w-full flex cursor-pointer items-center justify-center gap-3 border border-gray-300 dark:border-gray-600 py-2 rounded-md bg-white dark:bg-gray-700 text-blue-600 dark:text-blue-400 hover:bg-gray-100 dark:hover:bg-gray-600 transition"
            >
              <FaFacebook size={24} />
              <span>Login with Facebook</span>
            </button>
          </div>

          {/* Signup redirect link */}
          <p className="text-center text-sm text-gray-600 dark:text-gray-400 mt-6">
            Don't have an account?{" "}
            <Link
              to="/signup"
              className="text-blue-600 dark:text-blue-400 hover:underline font-semibold"
            >
              Sign up
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
