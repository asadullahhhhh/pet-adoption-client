import React, { useEffect, useRef, useState } from "react";
import { Link, NavLink } from "react-router";
import Navmenu from "../../Components/NavMenu/Navmenu";
import useAuth from "../../hooks/useAuth";
import userImg from "../../assets/user.png";
import { AnimatePresence, motion } from "motion/react";
import toast from "react-hot-toast";
import { FaAngleLeft } from "react-icons/fa";
import logo from "../../assets/logo-black.png";

const Navbar = () => {
  const { user, logOut, setUser } = useAuth();
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

  const handelLogout = () => {
    try {
      logOut();
      setUser(null)
      toast.success("User sign out successful");
    } catch (err) {
      toast.error(err.message);
    }
  };

  // console.log(user);

  return (
    <div className="fixed top-0 left-0 w-full backdrop-blur-md bg-white/60 h-[72px]  border-white/30 shadow-sm z-50">
      <nav className="max-w-7xl mx-auto px-5 py-3 flex justify-between items-center">
        {/* logo and mobile menu */}
        <div className="flex items-center gap-4">
          <Navmenu />
          <Link to="/">
            <img
              src={logo}
              className="w-[80px] md:w-[100px]"
              alt="Logo"
            />
          </Link>
        </div>

        {/* nav items */}
        <div className="hidden sm:flex">
          <ul className="flex font-semibold text-gray-800">
            <li className="hover:bg-amber-50  rounded-lg cursor-pointer">
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
            <li className="hover:bg-amber-50 rounded-lg cursor-pointer">
              <NavLink
                to="pet-listing"
                className={({ isActive }) =>
                  isActive
                    ? "text-amber-500 block  px-3 py-2"
                    : "block  px-3 py-2"
                }
              >
                Pet Listing
              </NavLink>
            </li>
            {/* Add more links here */}
            <li className="hover:bg-amber-50 rounded-lg cursor-pointer">
              <NavLink
                to="/donation-campaign"
                className={({ isActive }) =>
                  isActive
                    ? "text-amber-500 block  px-3 py-2"
                    : "block  px-3 py-2"
                }
              >
                Donation Campaigns
              </NavLink>
            </li>
          </ul>
        </div>

        {/* login/logout button */}
        <div>
          {user ? (
            <div
              ref={dropdownRef}
              onClick={() => setOpen(!open)}
              className="flex relative items-center gap-2 bg-gray-400/30 px-2 py-1 rounded-3xl cursor-pointer"
            >
              <div className="h-10 w-10 overflow-hidden rounded-full border border-gray-300">
                <img src={user?.photoURL || userImg} alt="" />
              </div>
              <div className="hidden lg:block text-gray-600 text-[14px] font-semibold">
                <h2>{user?.displayName}</h2>
                <h2 className="text-[12px]">{user?.email}</h2>
              </div>
              <div>
                <button>
                  <FaAngleLeft
                    className={`transition-all duration-300 -rotate-90 ${
                      open && "rotate-90"
                    }`}
                  ></FaAngleLeft>
                </button>
              </div>
              <AnimatePresence>
                {open && (
                  <motion.div
                    initial={{ scale: 0, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{ scale: 0, opacity: 0 }}
                    transition={{ duration: 0.3, type: "spring" }}
                    className="absolute right-0 top-[130%] origin-top bg-black/40 backdrop-blur-2xl rounded-xl overflow-hidden"
                  >
                    <ul className="flex flex-col w-28 lg:w-48 text-center">
                      <li className="py-2 font-semibold bg-amber-100 border-b text-gray-600 border-red-100 hover:text-black hover:bg-amber-200">
                        <Link to={"/dashboard"} className="block">
                          Dashboard
                        </Link>
                      </li>
                      <li className="py-2 font-semibold bg-red-200 hover:bg-red-300 text-gray-700 hover:text-black">
                        <button
                          onClick={handelLogout}
                          className="cursor-pointer block w-full"
                        >
                          Log out
                        </button>
                      </li>
                    </ul>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ) : (
            <div className="min-h-[48px] min-w-[152px] flex justify-center items-center">
              <Link to={"/login"}>
                <button className="px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-md shadow-sm transition">
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
