import { AnimatePresence, useAnimation } from "motion/react";
import { motion } from "motion/react";
import React, { useEffect, useRef, useState } from "react";
import { NavLink } from "react-router"; 
import { AiFillHome } from "react-icons/ai";  
import { FaPaw } from "react-icons/fa";    
import { RiHandHeartFill } from "react-icons/ri";  

const Navmenu = () => {
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

  const path1Control = useAnimation();
  const path2Control = useAnimation();

  useEffect(() => {
    if (open) {
      path1Control.start(path1Variants.open);
      path2Control.start(path2Variants.open);
    } else {
      path1Control.start(path1Variants.closed);
      path2Control.start(path2Variants.closed);
    }
  }, [open]);

  // SVG path variants
  const path1Variants = {
    open: { d: "M3.00061 2.99999L21.0006 21" },
    closed: { d: "M0 8.5L24 8.5" },
  };

  const path2Variants = {
    open: { d: "M3.00006 21.0007L21 3.00064" },
    closed: { d: "M0 15.5L24 15.5" },
  };

  return (
    <div ref={dropdownRef} className="relative block sm:hidden">
      {/* Menu Button */}
      <div
        onClick={() => setOpen(!open)}
        className="relative justify-self-center flex flex-col gap-2 cursor-pointer stroke-black stroke-2 z-50"
      >
        <svg width="24" height="24" viewBox="0 0 24 24">
          <motion.path
            {...path1Variants.closed}
            animate={path1Control}
            transition={{ duration: 0.2 }}
          />
          <motion.path
            {...path2Variants.closed}
            animate={path2Control}
            transition={{ duration: 0.2 }}
          />
        </svg>
      </div>

      {/* Dropdown Menu */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            transition={{ duration: 0.5, type: "spring" }}
            className="absolute -top-2 -left-2 w-48 min-h-64 rounded-md bg-neutral-50 py-8 px-2 z-10 flex flex-col shadow-md origin-top-left"
          >
            <ul className="flex flex-col flex-1 mt-3 font-semibold text-sm">
              <NavLink
                className={({ isActive }) =>
                  isActive ? "bg-gray-200 text-amber-500 p-2 flex gap-2" : "p-2 flex gap-2"
                }
                to="/"
              >
                <AiFillHome></AiFillHome>
                <li>Home</li>
              </NavLink>

              <NavLink
                to="pet-listing"
                className={({ isActive }) =>
                  isActive
                    ? "bg-gray-200 text-amber-500 p-2 flex gap-2"
                    : "p-2 flex gap-2"
                }
              >
                <FaPaw></FaPaw>
                Pet Listing
              </NavLink>

              <NavLink
                to="/donation-campaign"
                className={({ isActive }) =>
                  isActive
                    ? "bg-gray-200 text-amber-500 p-2 text-[13px] flex gap-2"
                    : "p-2 text-[13px] flex gap-2"
                }
              >
                <RiHandHeartFill></RiHandHeartFill>
                Donation Campaigns
              </NavLink>
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Navmenu;
