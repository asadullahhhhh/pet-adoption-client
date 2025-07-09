import React from "react";
import { Link, NavLink } from "react-router";
import Navmenu from "../../Components/NavMenu/Navmenu";

const Navbar = () => {
  return (
    <div className="fixed top-0 left-0 w-full backdrop-blur-md bg-white/60  border-white/30 shadow-sm z-50">
      <nav className="max-w-7xl mx-auto px-5 py-3 flex justify-between items-center">
        {/* logo and mobile menu */}
        <div className="flex items-center gap-7">
          <Navmenu />
          <Link to="/">
            <img src="/pet.png" className="w-[50px] scale-[2.5]" alt="Logo" />
          </Link>
        </div>

        {/* nav items */}
        <div className="hidden sm:flex">
          <ul className="flex gap-6 font-semibold text-gray-800">
            <li>
              <NavLink
                to="/"
                className={({ isActive }) =>
                  isActive ? "text-blue-500" : "hover:text-blue-400"
                }
              >
                Home
              </NavLink>
            </li>
            {/* Add more links here */}
          </ul>
        </div>

        {/* login/logout button */}
        <div>
          <Link to={'/login'}>
            <button className="px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-md shadow-sm transition">
              Login
            </button>
          </Link>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
