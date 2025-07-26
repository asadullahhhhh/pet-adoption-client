import React, { useEffect, useRef, useState } from "react";
import { Link, NavLink } from "react-router";
import Navmenu from "../../Components/NavMenu/Navmenu";
import useAuth from "../../hooks/useAuth";
import userImg from "../../assets/user.png";
import { AnimatePresence, motion } from "motion/react";
import toast from "react-hot-toast";
import { FaAngleLeft } from "react-icons/fa";
import logo from "../../assets/logo-black.png";
import logo2 from "../../assets/logo-light.png";
import { MdDarkMode, MdDashboard, MdOutlineLightMode } from "react-icons/md";
import { FiLogOut } from "react-icons/fi";
import axios from "axios";
import { getElement, setElement } from "../../utils/utility";

const Navbar = () => {
  const { user, logOut, setUser, darkLight, setDarkLight } = useAuth();
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef(null);

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

  const handelLogout = async () => {
    try {
      logOut();
      await axios.post(
        `${import.meta.env.VITE_API_URL}/jwt/logout`,
        {},
        { withCredentials: true }
      );
      setUser(null);
      toast.success("User sign out successful");
    } catch (err) {
      toast.error(err.message);
    }
  };

  // handel darkmood
  const handelDarkMood = () => {
    setElement(!darkLight);
    const getData = getElement;
    setDarkLight(getData);
  };

  // console.log(user);

  return (
    <div
      className={`fixed top-0 left-0 w-full backdrop-blur-md h-[72px] border-b duration-500 z-50 transition-colors
    bg-white/60 border-white/30 shadow-sm
    dark:bg-[#0f172a]/70 dark:border-gray-700 ${darkLight ? 'dark' : ''}`}
    >
      <nav className="max-w-7xl mx-auto px-5 py-3 flex justify-between items-center transition-colors">
        {/* Logo and Mobile menu */}
        <div className="flex items-center gap-4">
          <Navmenu />
          <Link to="/">
            <img src={darkLight ? logo2 : logo} className="w-[80px] md:w-[100px]" alt="Logo" />
          </Link>
        </div>

        {/* Nav items */}
        <div className="hidden sm:flex">
          <ul className="flex font-semibold text-gray-800 dark:text-gray-200 transition-colors">
            <li className="hover:bg-amber-50 dark:hover:bg-amber-900/20 rounded-lg cursor-pointer transition-colors">
              <NavLink
                to="/"
                className={({ isActive }) =>
                  isActive
                    ? "text-amber-500 block px-3 py-2"
                    : "block px-3 py-2"
                }
              >
                Home
              </NavLink>
            </li>
            <li className="hover:bg-amber-50 dark:hover:bg-amber-900/20 rounded-lg cursor-pointer transition-colors">
              <NavLink
                to="pet-listing"
                className={({ isActive }) =>
                  isActive
                    ? "text-amber-500 block px-3 py-2"
                    : "block px-3 py-2"
                }
              >
                Pet Listing
              </NavLink>
            </li>
            <li className="hover:bg-amber-50 dark:hover:bg-amber-900/20 rounded-lg cursor-pointer transition-colors">
              <NavLink
                to="/donation-campaign"
                className={({ isActive }) =>
                  isActive
                    ? "text-amber-500 block px-3 py-2"
                    : "block px-3 py-2"
                }
              >
                Donation Campaigns
              </NavLink>
            </li>
          </ul>
        </div>

        {/* Login / Logout */}
        <div className="flex items-center gap-5">
          {/* Dark mode toggle */}
          <div
            onClick={handelDarkMood}
            className="flex justify-center items-center"
          >
            {darkLight ? (
              <button className="bg-gray-300 dark:bg-amber-500/30 p-3 rounded-full cursor-pointer duration-500 border border-transparent dark:border-amber-500/50 transition-colors">
                <MdDarkMode className="text-amber-400" size={22} />
              </button>
            ) : (
              <button className="bg-gray-300 p-3 rounded-full cursor-pointer duration-500 transition-colors">
                <MdOutlineLightMode className="text-gray-700" size={22} />
              </button>
            )}
          </div>

          {user ? (
            <div
              ref={dropdownRef}
              onClick={() => setOpen(!open)}
              className="flex relative items-center gap-2 bg-gray-400/30 dark:bg-gray-800/50 px-2 py-1 rounded-3xl transition-colors"
            >
              <div className="h-10 w-10 overflow-hidden rounded-full border border-gray-300 dark:border-gray-600">
                <img src={user?.photoURL || userImg} alt="" />
              </div>
              <div className="hidden lg:block text-gray-600 dark:text-gray-200 text-[14px] font-semibold">
                <h2>{user?.displayName}</h2>
                <h2 className="text-[12px]">{user?.email}</h2>
              </div>
              <div>
                <button>
                  <FaAngleLeft
                    className={`transition-all dark:text-white duration-300 -rotate-90 ${
                      open && "rotate-90"
                    }`}
                  />
                </button>
              </div>
              <AnimatePresence>
                {open && (
                  <motion.div
                    initial={{ scale: 0, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{ scale: 0, opacity: 0 }}
                    transition={{ duration: 0.3, type: "spring" }}
                    className="absolute right-0 top-[130%] origin-top border border-gray-300 dark:border-gray-600 shadow-xl bg-gradient-to-tr from-gray-200 via-gray-300 to-gray-200 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 rounded-xl overflow-hidden transition-colors"
                  >
                    <ul className="flex flex-col w-28 lg:w-48 text-center">
                      <li className="py-2 font-semibold text-gray-600 dark:text-gray-200">
                        <Link
                          to={"/dashboard"}
                          className="cursor-pointer hover:text-amber-500 flex items-center justify-center gap-2"
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
            <div className="min-h-[48px] min-w-[152px] flex justify-end items-center">
              <Link to={"/login"}>
                <button className="px-8 py-2 bg-blue-500 font-semibold hover:bg-blue-600 cursor-pointer active:scale-[1.05] duration-300 text-white rounded-md shadow-sm transition">
                  Login
                </button>
              </Link>
            </div>
          )}
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
