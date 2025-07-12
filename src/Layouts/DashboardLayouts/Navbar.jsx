import React, { useEffect, useRef, useState } from 'react';
import { Link, useLocation } from 'react-router';
import userImg from "../../assets/user.png";
import { RxHamburgerMenu } from "react-icons/rx";
import { AnimatePresence, motion } from "motion/react";

const Navbar = ({ setIsMobileOpen, user, handelLogout, navLinks,FaAngleLeft }) => {
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

  const path = navLinks.find(e => e.to === location.pathname)
  console.log(path);

  return (
    <div
      className={`backdrop-blur-lg bg-white/30  py-3 px-5 md:px-10 flex justify-between items-center sticky top-0 z-20 transition-all `}
    >
      <div className="flex items-center gap-3">
        <button className="md:hidden" onClick={() => setIsMobileOpen(true)}>
          <RxHamburgerMenu size={20} />
        </button>
        <h1 className="text-2xl font-bold">{path.label}</h1>
      </div>

      {/*  */}
      <div>
        <div>
          {user ? (
            <div
              ref={dropdownRef}
              onClick={() => setOpen(!open)}
              className="flex relative items-center gap-2 bg-gray-200/30 px-2 py-1 rounded-3xl cursor-pointer"
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
                    className="absolute right-0 top-[130%] origin-top bg-black/20 backdrop-blur-2xl rounded-xl overflow-hidden"
                  >
                    <ul className="flex flex-col w-28 lg:w-48 text-center">
                      <li className="py-2 font-semibold bg-green-200 border-b text-gray-600 border-red-100 hover:text-black hover:bg-green-300">
                        <Link to={"/"} className="block">
                          Landing
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
            ""
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;