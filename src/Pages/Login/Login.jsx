import { Link } from "react-router";
import { FcGoogle } from "react-icons/fc";
import { FaFacebook } from "react-icons/fa";
import Lottie from "lottie-react";
import loginAnim from "../../assets/login.json";

const LoginPage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-100 to-white flex justify-center items-center px-4 relative">
      <div className="w-full max-w-5xl relative bg-white/30 rounded-2xl shadow-2xl overflow-hidden flex flex-col md:flex-row items-center justify-between">
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
          <h2 className="text-2xl font-bold text-center text-gray-800">
            Login to Your Account
          </h2>

          <form className="space-y-4">
            <input
              type="email"
              placeholder="Email"
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-200"
            />
            <input
              type="password"
              placeholder="Password"
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-200"
            />
            <button
              type="submit"
              className="w-full bg-blue-500 text-white font-semibold py-2 rounded-md hover:bg-blue-600 transition"
            >
              Login
            </button>
          </form>

          {/* Divider */}
          <div className="flex items-center my-4">
            <div className="flex-grow h-px bg-gray-300"></div>
            <span className="px-2 text-sm text-gray-500">OR</span>
            <div className="flex-grow h-px bg-gray-300"></div>
          </div>

          {/* Social Buttons */}
          <div className="space-y-3">
            <button className="w-full flex items-center justify-center gap-3 border py-2 rounded-md hover:bg-gray-100 transition">
              <FcGoogle size={24} />
              <span>Login with Google</span>
            </button>
            <button className="w-full flex items-center justify-center gap-3 border py-2 rounded-md text-blue-600 hover:bg-gray-100 transition">
              <FaFacebook size={24} />
              <span>Login with Facebook</span>
            </button>
          </div>

          {/* Signup redirect link */}
          <p className="text-center text-sm text-gray-600 mt-6">
            Don't have an account?{" "}
            <Link
              to="/signup"
              className="text-blue-600 hover:underline font-semibold"
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
