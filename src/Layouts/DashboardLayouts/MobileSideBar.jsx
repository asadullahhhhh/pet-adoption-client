import { X } from "lucide-react";
import React from "react";
import { NavLink, useLocation } from "react-router";

const MobileSideBar = ({
  isMobileOpen,
  handleToggle,
  navLinks,
  isSidebarOpen,
  darkLight,
  role,
}) => {
  const location = useLocation();

  return (
    <div
      className={`
    fixed ${darkLight ? "dark" : ""} top-0 left-0 w-64 h-full 
    bg-gray-300/70 dark:bg-gray-900/80 backdrop-blur-lg 
    z-50 transform transition-transform duration-300 ease-in-out md:hidden 
    ${isMobileOpen ? "translate-x-0" : "-translate-x-full"}
  `}
    >
      <div className="p-4 font-bold text-xl border-b border-gray-300 dark:border-gray-700 flex justify-between text-gray-800 dark:text-gray-200">
        Dashboard
        <button
          onClick={handleToggle}
          className="text-gray-700 dark:text-gray-300"
        >
          <X />
        </button>
      </div>
      <nav className="p-4 space-y-4">
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

export default MobileSideBar;
