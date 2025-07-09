import { AnimatePresence, useAnimation } from "motion/react";
import { motion } from "motion/react";
import React, { useEffect, useState } from "react";
import { NavLink } from "react-router"; // ✅ Correct import

const Navmenu = () => {
  const [open, setOpen] = useState(false);

  const path1Control = useAnimation()
  const path2Control = useAnimation()


  useEffect(()=> {
    if(open){
        path1Control.start(path1Variants.open)
        path2Control.start(path2Variants.open)
    }else{
        path1Control.start(path1Variants.closed);
        path2Control.start(path2Variants.closed);
    }
  }, [open])

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
    <div className="relative block sm:hidden">
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
            className="absolute -top-2 -left-2 w-40 min-h-64 rounded-md bg-neutral-50 p-8 z-10 flex flex-col shadow-md origin-top-left"
          >
            <ul className="flex flex-col gap-2 flex-1 text-center font-semibold text-lg">
              <NavLink
                className={({ isActive }) =>
                  isActive ? "text-blue-400" : ""
                }
                to="/"
              >
                <li>Home</li>
              </NavLink>
              {/* Add more NavLinks as needed */}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Navmenu;
