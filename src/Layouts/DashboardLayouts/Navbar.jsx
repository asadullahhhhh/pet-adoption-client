import React, { useEffect, useRef, useState } from "react";
import { Link, useLocation } from "react-router";
import userImg from "../../assets/user.png";
import { RxHamburgerMenu } from "react-icons/rx";
import { AnimatePresence, motion } from "motion/react";
import { MdDarkMode, MdDashboard, MdOutlineLightMode } from "react-icons/md";
import { FiLogOut } from "react-icons/fi";
import logo from "../../assets/logo-black.png";
import logo2 from "../../assets/logo-light.png";

const Navbar = ({
  setIsMobileOpen,
  user,
  handelLogout,
  navLinks,
  FaAngleLeft,
  handelDarkMood,
  darkLight,
}) => {
  const loaction = useLocation();
  const dropdownRef = useRef(null);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setOpen(false);
      }
    };

    if (open) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [open]);

  return (
    <div
      className={`backdrop-blur-lg ${
        darkLight ? "dark" : ""
      } bg-white/60 dark:bg-gray-900/70 backdrop-blur-2xl border duration-500 border-white/30 dark:border-gray-700/50 shadow-sm py-1.5 lg:py-2 px-5 md:px-10 flex justify-between items-center sticky top-0 z-20 transition-all`}
    >
      <div className="flex items-center gap-3">
        <button className="md:hidden" onClick={() => setIsMobileOpen(true)}>
          <RxHamburgerMenu
            size={20}
            className="text-gray-700 dark:text-gray-200"
          />
        </button>
        <Link to="/">
          <img src={darkLight ? logo2 : logo} className="w-[80px] lg:w-[100px]" alt="Logo" />
        </Link>
      </div>

      {/* Right Section */}
      <div className="flex items-center gap-2 lg:gap-4">
        {/* Dark Mode Toggle */}
        <div
          onClick={handelDarkMood}
          className="flex justify-center items-center"
        >
          {darkLight ? (
            <button className="bg-gray-300 dark:bg-amber-500/30 p-1.5 lg:p-2.5 rounded-full cursor-pointer duration-500 border border-transparent dark:border-amber-500/50 transition-colors">
              <MdDarkMode className="text-amber-400" size={22} />
            </button>
          ) : (
            <button className="bg-gray-300 p-1.5 lg:p-2.5 rounded-full cursor-pointer duration-500 transition-colors">
              <MdOutlineLightMode className="text-gray-700" size={22} />
            </button>
          )}
        </div>

        {/* User Dropdown */}
        <div>
          {user ? (
            <div
              ref={dropdownRef}
              onClick={() => setOpen(!open)}
              className="flex relative items-center gap-2 bg-gray-200/30 dark:bg-gray-800/50 px-2 py-1 rounded-3xl cursor-pointer transition-colors duration-300"
            >
              <div className="h-8 w-8 lg:h-10 lg:w-10 overflow-hidden rounded-full border border-gray-300 dark:border-gray-600">
                <img src={user?.photoURL || userImg} alt="" />
              </div>
              <div className="hidden lg:block text-gray-600 dark:text-gray-200 text-[14px] font-semibold">
                <h2>{user?.displayName}</h2>
                <h2 className="text-[12px] text-gray-500 dark:text-gray-400">
                  {user?.email}
                </h2>
              </div>
              <div>
                <button>
                  <FaAngleLeft
                    className={`transition-all duration-300 -rotate-90 ${
                      open && "rotate-90"
                    } text-gray-700 dark:text-gray-300`}
                  />
                </button>
              </div>

              {/* Dropdown Menu */}
              <AnimatePresence>
                {open && (
                  <motion.div
                    initial={{ scale: 0, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{ scale: 0, opacity: 0 }}
                    transition={{ duration: 0.3, type: "spring" }}
                    className="absolute right-0 top-[130%] origin-top bg-gradient-to-tr from-gray-200 via-gray-300 to-gray-200 dark:from-gray-800 dark:via-gray-700 dark:to-gray-800 backdrop-blur-2xl rounded-xl overflow-hidden shadow-lg"
                  >
                    <ul className="flex flex-col w-32 lg:w-48 text-center">
                      <li className="py-2 font-semibold text-gray-600 dark:text-gray-200 hover:text-amber-500 transition-colors">
                        <Link
                          to={"/dashboard"}
                          className="cursor-pointer flex items-center justify-center gap-2"
                        >
                          <MdDashboard size={20} />
                          Dashboard
                        </Link>
                      </li>
                      <li className="py-2 font-semibold text-gray-700 dark:text-gray-300 hover:text-red-400 transition-colors">
                        <button
                          onClick={handelLogout}
                          className="cursor-pointer flex justify-center gap-2 w-full items-center"
                        >
                          <FiLogOut size={20} />
                          Log out
                        </button>
                      </li>
                    </ul>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ) : (
            ""
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
