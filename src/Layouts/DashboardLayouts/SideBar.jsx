import React from "react";
import { NavLink, useLocation } from "react-router";

const SideBar = ({
  isSidebarOpen,
  handleToggle,
  FaAngleLeft,
  role,
  navLinks,
}) => {
  const location = useLocation();


  return (
    <div
      className={`
          bg-white shadow-xl h-full fixed top-0 z-40 transition-all duration-300 ease-in-out
          ${isSidebarOpen ? "w-64" : "w-16"} 
          hidden md:block
        `}
    >
      <div className="p-4 font-bold text-xl">
        <div className="flex justify-between items-center">
          <h2 className={` ${!isSidebarOpen && "sr-only"}`}>Dashboard</h2>
          <button
            onClick={handleToggle}
            className="bg-gray-100 shadow-sm p-2 rounded-full cursor-pointer"
          >
            <FaAngleLeft
              className={`${isSidebarOpen ? "rotate-0" : "rotate-180"}`}
            />
          </button>
        </div>
      </div>
      <nav className=" space-y-4">
        <ul className="space-y-2 mt-4">
          {navLinks
            .filter((link) => {
              // Only show admin routes to admins
              if (link.adminOnly && role?.role !== "admin") return false;
              return true;
            })
            .map(({ to, label, icon }) => (
              <li key={to}>
                <NavLink
                  to={to}
                  className={`
          flex items-center gap-3 px-4 py-2 rounded-md transition-all duration-200 hover:bg-emerald-100 
          ${location.pathname === to ? "bg-emerald-200 font-semibold" : ""}
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
