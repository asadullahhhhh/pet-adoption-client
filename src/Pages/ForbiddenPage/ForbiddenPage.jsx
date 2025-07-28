import { useLocation, useNavigate } from "react-router";
import { FaLock } from "react-icons/fa";
import useAuth from "../../hooks/useAuth";

export default function ForbiddenPage() {
  const navigate = useNavigate();
  const {darkLight} = useAuth()

  return (
    <div
      className={`${
        darkLight ? "dark" : ""
      } min-h-screen flex flex-col justify-center items-center bg-gradient-to-tr dark:from-gray-800 dark:via-gray-900 dark:to-gray-800 px-4`}
    >
      <div className="p-8 max-w-md w-full text-center">
        {/* Icon */}
        <div className="flex justify-center mb-4">
          <FaLock className="text-red-500 dark:text-red-400 text-6xl" />
        </div>

        {/* Title */}
        <h1 className="text-3xl font-bold text-gray-800 dark:text-gray-100 mb-2">
          Access Forbidden
        </h1>
        <p className="text-gray-600 dark:text-gray-300 mb-6">
          You do not have permission to view this page. Only admins can access
          it.
        </p>

        {/* Buttons */}
        <div className="flex gap-4 justify-center">
          <button
            onClick={() => navigate("/")}
            className="px-4 py-2 bg-blue-600 cursor-pointer hover:bg-blue-700 text-white font-medium rounded-lg transition"
          >
            Go to Home
          </button>
        </div>
      </div>
    </div>
  );
}
