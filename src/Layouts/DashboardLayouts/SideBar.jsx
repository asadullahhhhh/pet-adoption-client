import React from "react";
import { NavLink, useLocation } from "react-router";

const SideBar = ({
  isSidebarOpen,
  handleToggle,
  FaAngleLeft,
  role,
  navLinks,
  darkLight,
}) => {
  const location = useLocation();

  return (
    <div
      className={`
    bg-white dark:bg-gray-800 duration-300 shadow-xl h-full fixed top-0 z-40 transition-all ease-in-out
    ${isSidebarOpen ? "w-64" : "w-16"} ${darkLight ? "dark" : ""}
    hidden md:block
  `}
    >
      <div className="p-4 font-bold text-xl">
        <div className="flex justify-between items-center">
          <h2
            className={`${
              !isSidebarOpen && "sr-only"
            } text-gray-800 dark:text-gray-200`}
          >
            Dashboard
          </h2>
          <button
            onClick={handleToggle}
            className="bg-gray-100 dark:bg-gray-600 shadow-sm p-2 rounded-full cursor-pointer transition-colors"
          >
            <FaAngleLeft
              className={`${
                isSidebarOpen ? "rotate-0" : "rotate-180"
              } text-gray-700 dark:text-gray-300`}
            />
          </button>
        </div>
      </div>
      <nav className="space-y-4">
        <ul className="space-y-2 mt-4">
          {navLinks
            .filter((link) => {
              if (link.adminOnly && role?.role !== "admin") return false;
              return true;
            })
            .map(({ to, label, icon }) => (
              <li key={to}>
                <NavLink
                  to={to}
                  className={`
                flex items-center gap-3 px-4 py-2 rounded-md transition-all duration-200
                hover:bg-emerald-100 dark:hover:bg-emerald-500/40
                ${
                  location.pathname === to
                    ? "bg-emerald-200 dark:bg-emerald-400/50 font-semibold"
                    : ""
                }
                text-gray-700 dark:text-gray-300
              `}
                >
                  <span className="text-xl">{icon}</span>
                  {isSidebarOpen && <span className="text-sm">{label}</span>}
                </NavLink>
              </li>
            ))}
        </ul>
      </nav>
    </div>
  );
};

export default SideBar;
