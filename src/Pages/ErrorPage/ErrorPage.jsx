import { useNavigate } from "react-router";
import { FaExclamationTriangle } from "react-icons/fa";
import useAuth from "../../hooks/useAuth";

export default function ErrorPage() {
  const navigate = useNavigate();
  const { darkLight } = useAuth();

  return (
    <div
      className={`${
        darkLight ? "dark" : ""
      } min-h-screen flex flex-col justify-center items-center bg-gradient-to-tr dark:from-gray-800 dark:via-gray-900 dark:to-gray-800 px-4`}
    >
      <div className="p-8 max-w-md w-full text-center">
        {/* Icon */}
        <div className="flex justify-center mb-4">
          <FaExclamationTriangle className="text-yellow-500 dark:text-yellow-400 text-6xl" />
        </div>

        {/* Title */}
        <h1 className="text-3xl font-bold text-gray-800 dark:text-gray-100 mb-2">
          Oops! Something Went Wrong
        </h1>
        <p className="text-gray-600 dark:text-gray-300 mb-6">
          The page you are looking for might be missing or an unexpected error
          occurred.
        </p>

        {/* Buttons */}
        <div className="flex gap-4 justify-center">
          <button
            onClick={() => navigate("/")}
            className="px-4 py-2 bg-blue-600 cursor-pointer hover:bg-blue-700 text-white font-medium rounded-lg transition"
          >
            Go to Home
          </button>
          <button
            onClick={() => navigate(-1)}
            className="px-4 py-2 bg-gray-300 cursor-pointer hover:bg-gray-400/60 dark:bg-gray-700 dark:hover:bg-gray-600 text-gray-800 dark:text-gray-100 font-medium rounded-lg transition"
          >
            Go Back
          </button>
        </div>
      </div>
    </div>
  );
}
