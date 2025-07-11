import { X } from 'lucide-react';
import React from 'react';
import { NavLink } from 'react-router';

const MobileSideBar = ({isMobileOpen, handleToggle, navLinks, isSidebarOpen}) => {
    return (
        <div
                className={`fixed top-0 left-0 w-64 h-full bg-gray-300/70 backdrop-blur-lg z-50 transform transition-transform duration-300 ease-in-out md:hidden ${
                  isMobileOpen ? "translate-x-0" : "-translate-x-full"
                }`}
              >
                <div className="p-4 font-bold text-xl border-b border-gray-300 flex justify-between">
                  Dashboard
                  <button onClick={handleToggle}>
                    <X />
                  </button>
                </div>
                <nav className="p-4 space-y-4">
                  <ul className="space-y-2 mt-4">
                    {navLinks.map(({ to, label, icon }) => (
                      <li key={to}>
                        <NavLink
                          to={to}
                          className={({ isActive }) =>
                            `flex items-center gap-3 px-4 py-2 rounded-md transition-all duration-200 hover:bg-emerald-100 ${
                              isActive ? "bg-emerald-200 font-semibold" : ""
                            }`
                          }
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