import { Link, useNavigate } from "react-router";
import { FcGoogle } from "react-icons/fc";
import { FaFacebook } from "react-icons/fa";
import Lottie from "lottie-react";
import { useState } from "react";
import signupAnim from "../../assets/signup.json";
import { LuImageUp } from "react-icons/lu";
import { imageUpload, UserDB } from "../../utils/utility";
import { useForm } from "react-hook-form";
import { AuthContext } from "../../provider/AuthProvider";
import useAuth from "../../hooks/useAuth";
import { updateProfile } from "firebase/auth";
import { auth } from "../../firebase/firebase.config";
import { BeatLoader } from "react-spinners";
import toast from "react-hot-toast";
import { handleSocialLogin } from "../../utils/authHelper";

const SignupPage = () => {
  const { signUp, googleLogin, facebookLogin } = useAuth();
  const [preview, setPreview] = useState(null);
  const [uploading, setUploading] = useState(false);
  const navigate = useNavigate();
  const [disabe, setdisable] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const handleImageChange = async (e) => {
    const file = e.target.files[0];
    setUploading(true);
    setPreview(null);
    try {
      const data = await imageUpload(file);
      setPreview(data);
    } catch (err) {
      console.error(err);
    } finally {
      setUploading(false);
    }
  };

  //   email pass login
  const onSubmit = async (data) => {
    // console.log("Submitted Data:", { ...data });
    setdisable(true);

    const userInfo = {
      name: data?.name,
      email: data?.email,
      image: preview,
    };

    const result = await signUp(data?.email, data?.password);
    console.log(result.user);
    if (result?.user) {
      await updateProfile(auth.currentUser, {
        displayName: data?.name,
        photoURL: preview,
      });

      await UserDB(userInfo);
      navigate('/')
      setdisable(false);
      toast.success("Signup Successful");
    }
  };

  // google Login method
  const handelGoogleSignin = async () => {
    handleSocialLogin(googleLogin, navigate, "Google Login Successful")
  };

//   facebook logind method
  const handelFacebookLogin = async () => {
    handleSocialLogin(facebookLogin, navigate, "Facebook Login Successful")
  }

  return (
    <div className="min-h-screen bg-gradient-to-tr from-blue-50 via-gray-200 to-green-50 flex justify-center items-center px-4 overflow-hidden">
      <div className="w-full max-w-5xl bg-white/90 backdrop-blur-lg rounded-3xl shadow-2xl overflow-hidden flex flex-col md:flex-row items-center justify-between">
        {/* Left Side - Lottie */}
        <div className="hidden md:block md:w-1/2 p-10">
          <Lottie
            animationData={signupAnim}
            loop
            className="w-full h-[420px]"
          />
        </div>

        {/* Right Side - Form */}
        <div className="w-full md:w-1/2 p-8 md:p-12 space-y-6">
          <h2 className="text-3xl font-extrabold text-center text-blue-700">
            Create Your Account
          </h2>

          {/* Image Upload */}
          <div className="flex justify-center">
            <label
              htmlFor="imageUpload"
              className="w-20 h-20 border-2 border-blue-300 rounded-full flex items-center justify-center cursor-pointer bg-blue-50 hover:bg-blue-100 transition"
            >
              {uploading ? (
                <div className="animate-spin h-6 w-6 border-4 border-blue-400 border-t-transparent rounded-full"></div>
              ) : preview ? (
                <img
                  src={preview}
                  alt="Preview"
                  className="w-full h-full object-cover rounded-full"
                />
              ) : (
                <LuImageUp size={24} />
              )}
            </label>
            <input
              type="file"
              id="imageUpload"
              className="hidden"
              accept="image/*"
              onChange={handleImageChange}
            />
          </div>

          {/* Form */}
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="space-y-4 text-sm"
            noValidate
          >
            {/* Name */}
            <div>
              <input
                type="text"
                placeholder="Full Name"
                className="w-full px-4 py-2 border border-blue-300 rounded-lg"
                {...register("name", { required: "Full name is required" })}
              />
              <p className="text-red-500 text-xs mt-1 min-h-[1rem]">
                {errors.name?.message || ""}
              </p>
            </div>

            {/* Email */}
            <div>
              <input
                type="email"
                placeholder="Email Address"
                className="w-full px-4 py-2 border border-blue-300 rounded-lg"
                {...register("email", {
                  required: "Email is required",
                  pattern: {
                    value: /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/,
                    message: "Invalid email format",
                  },
                })}
              />
              <p className="text-red-500 text-xs mt-1 min-h-[1rem]">
                {errors.email?.message || ""}
              </p>
            </div>

            {/* Password */}
            <div>
              <input
                type="password"
                placeholder="Password"
                className="w-full px-4 py-2 border border-blue-300 rounded-lg"
                {...register("password", {
                  required: "Password is required",
                  pattern: {
                    value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/,
                    message:
                      "Min 8 chars, 1 uppercase, 1 lowercase & 1 number required",
                  },
                })}
              />
              <p className="text-red-500 text-xs mt-1 min-h-[1rem]">
                {errors.password?.message || ""}
              </p>
            </div>

            <button
              type="submit"
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 rounded-lg transition duration-300"
              disabled={disabe}
            >
              {disabe ? <BeatLoader color="#ffffff" size={8} /> : "Sign Up"}
            </button>
          </form>

          {/* OR Divider */}
          <div className="flex items-center my-4">
            <div className="flex-grow h-px bg-blue-200" />
            <span className="px-3 text-blue-500 font-semibold">OR</span>
            <div className="flex-grow h-px bg-blue-200" />
          </div>

          {/* Social Signup */}
          <div className="space-y-3">
            <button
              onClick={handelGoogleSignin}
              className="w-full flex items-center cursor-pointer justify-center gap-3 border border-blue-500 py-2 rounded-lg hover:bg-blue-50 transition"
            >
              <FcGoogle size={22} />
              <span className="text-blue-700 font-medium">
                Sign up with Google
              </span>
            </button>

            <button onClick={handelFacebookLogin} className="w-full flex cursor-pointer items-center justify-center gap-3 border border-blue-700 py-2 rounded-lg text-blue-700 hover:bg-blue-100 transition">
              <FaFacebook size={22} />
              <span className="font-medium">Sign up with Facebook</span>
            </button>
          </div>

          {/* Login Link */}
          <p className="text-center text-blue-600 mt-4 text-sm">
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
