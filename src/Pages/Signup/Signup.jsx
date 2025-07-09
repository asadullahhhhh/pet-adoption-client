import { Link } from "react-router";
import { FcGoogle } from "react-icons/fc";
import { FaFacebook } from "react-icons/fa";
import Lottie from "lottie-react";
// import signupAnim from "../../assets/signup.json"; // optional smaller animation in form side

const SignupPage = () => {
  return (
    <div className="relative min-h-screen bg-gradient-to-tr from-gray-50 via-gray-100 to-green-50 flex justify-center items-center px-4 overflow-hidden">
      <div className="w-full max-w-5xl mt-10 relative bg-white/90 backdrop-blur-lg rounded-3xl shadow-2xl overflow-hidden flex flex-col md:flex-row items-center justify-between">
        {/* Left Side - Optional Lottie Animation */}
        <div className="hidden md:block md:w-1/2 p-10">
          {/* <Lottie
            animationData={signupAnim}
            loop={true}
            className="w-full h-[420px]"
          /> */}
        </div>

        {/* Right Side - Signup Form */}
        <div className="w-full md:w-1/2 p-8 md:p-16 space-y-8 relative z-10">
          <h2 className="text-3xl font-extrabold text-center text-blue-700 mb-4">
            Create Your Account
          </h2>

          <form className="space-y-6">
            <input
              type="text"
              placeholder="Full Name"
              className="w-full px-5 py-3 border border-blue-300 rounded-lg focus:outline-none focus:ring-4 focus:ring-blue-200"
              required
            />
            <input
              type="email"
              placeholder="Email Address"
              className="w-full px-5 py-3 border border-blue-300 rounded-lg focus:outline-none focus:ring-4 focus:ring-blue-200"
              required
            />
            <input
              type="password"
              placeholder="Password"
              className="w-full px-5 py-3 border border-blue-300 rounded-lg focus:outline-none focus:ring-4 focus:ring-blue-200"
              required
            />
            <input
              type="password"
              placeholder="Confirm Password"
              className="w-full px-5 py-3 border border-blue-300 rounded-lg focus:outline-none focus:ring-4 focus:ring-blue-200"
              required
            />

            <button
              type="submit"
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 rounded-lg transition duration-300"
            >
              Sign Up
            </button>
          </form>

          {/* Divider */}
          <div className="flex items-center my-6">
            <div className="flex-grow h-px bg-blue-200"></div>
            <span className="px-3 text-blue-500 font-semibold">OR</span>
            <div className="flex-grow h-px bg-blue-200"></div>
          </div>

          {/* Social Sign Up Buttons */}
          <div className="space-y-4">
            <button className="w-full flex items-center justify-center gap-3 border border-blue-500 py-3 rounded-lg hover:bg-blue-50 transition duration-300">
              <FcGoogle size={26} />
              <span className="text-blue-700 font-semibold">
                Sign up with Google
              </span>
            </button>
            <button className="w-full flex items-center justify-center gap-3 border border-blue-700 py-3 rounded-lg text-blue-700 hover:bg-blue-100 transition duration-300">
              <FaFacebook size={26} />
              <span className="font-semibold">Sign up with Facebook</span>
            </button>
          </div>

          {/* Redirect to Login */}
          <p className="text-center text-blue-600 mt-8">
            Already have an account?{" "}
            <Link to="/login" className="font-bold hover:underline">
              Login
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default SignupPage;
