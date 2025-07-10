import React, { useEffect, useRef, useState } from "react";
import { Link, NavLink } from "react-router";
import Navmenu from "../../Components/NavMenu/Navmenu";
import useAuth from "../../hooks/useAuth";
import userImg from '../../assets/user.png'
import { AnimatePresence, motion } from "motion/react";
import toast from "react-hot-toast";

const Navbar = () => {

  const { user, logOut } = useAuth();
  const [open, setOpen] = useState(false)
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
    try{
       logOut()
       toast.success("User sign out successful")
    }catch(err){
      toast.error(err.message)
    }
  }

  
  return (
    <div className="fixed top-0 left-0 w-full backdrop-blur-md bg-white/60  border-white/30 shadow-sm z-50">
      <nav className="max-w-7xl mx-auto px-5 py-3 flex justify-between items-center">
        {/* logo and mobile menu */}
        <div className="flex items-center gap-7">
          <Navmenu />
          <Link to="/">
            <img
              src="/pet.png"
              className="sm:w-[50px] sm:ml-5 w-[30px] scale-[2.5]"
              alt="Logo"
            />
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
          {user ? (
            <div
              ref={dropdownRef}
              onClick={() => setOpen(!open)}
              className="flex relative items-center gap-2 lg:bg-gray-200 px-2 py-1 rounded-3xl cursor-pointer"
            >
              <div className="h-10 w-10 overflow-hidden rounded-full border border-gray-300">
                <img src={user?.photoURL || userImg} alt="" />
              </div>
              <div className="hidden lg:block">{user?.displayName}</div>
              <AnimatePresence>
                {open && (
                  <motion.div
                    initial={{ scale: 0, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{ scale: 0, opacity: 0 }}
                    transition={{ duration: 0.3, type: "spring" }}
                    className="absolute right-0 top-[130%] origin-top rounded-xl overflow-hidden"
                  >
                    <ul className="flex flex-col bg-gray-200 w-28 lg:w-48 text-center">
                      <li className="py-2 font-semibold text-gray-600 hover:text-black hover:bg-gray-100">
                        <Link>Dashboard</Link>
                      </li>
                      <li className="py-2 font-semibold text-gray-700 hover:bg-gray-100 hover:text-black">
                        <button
                          onClick={handelLogout}
                          className="cursor-pointer"
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
            <Link to={"/login"}>
              <button className="px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-md shadow-sm transition">
                Login
              </button>
            </Link>
          )}
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
