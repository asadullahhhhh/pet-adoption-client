import { Link, NavLink, Outlet } from "react-router";
import { FaAngleLeft } from "react-icons/fa6";
import {
  FaPlus,
  FaDog,
  FaClipboardList,
  FaDonate,
  FaList,
  FaHandHoldingUsd,
  FaHome,
} from "react-icons/fa";
import useAuth from "../../hooks/useAuth";
import toast from "react-hot-toast";
import SideBar from "./SideBar";
import MobileSideBar from "./MobileSideBar";
import Navbar from "./Navbar";
import { useState } from "react";

const Dashboard = () => {
  const { user, logOut } = useAuth();
  const [isSidebarOpen, setIsSidebarOpen] = useState(true); // For large screen
  const [isMobileOpen, setIsMobileOpen] = useState(false); // For small screen

 

 

  const handleToggle = () => {
    if (window.innerWidth < 768) {
      setIsMobileOpen(!isMobileOpen);
    } else {
      setIsSidebarOpen(!isSidebarOpen);
    }
  };

  const handelLogout = () => {
    try {
      logOut();
      toast.success("User sign out successful");
    } catch (err) {
      toast.error(err.message);
    }
  };

  const navLinks = [
    {
      to: "/dashboard",
      label: "Home",
      icon: <FaHome />,
    },
    {
      to: "/dashboard/add-pet",
      label: "Add a Pet",
      icon: <FaPlus />,
    },
    {
      to: "/dashboard/my-added-pats",
      label: "My Added Pets",
      icon: <FaDog />,
    },
    {
      to: "/dashboard/adoption-requests",
      label: "Adoption Request",
      icon: <FaClipboardList />,
    },
    {
      to: "/dashboard/create-campaign",
      label: "Create Donation Campaign",
      icon: <FaDonate />,
    },
    {
      to: "/my-campaigns",
      label: "My Donation Campaigns",
      icon: <FaList />,
    },
    {
      to: "/my-donations",
      label: "My Donations",
      icon: <FaHandHoldingUsd />,
    },
  ];

  return (
    <div className="flex h-screen overflow-hidden">
      {/* Sidebar */}
      <SideBar isSidebarOpen={isSidebarOpen} handleToggle={handleToggle} FaAngleLeft={FaAngleLeft} navLinks={navLinks}></SideBar>

      {/* Mobile Sidebar Drawer */}
      <MobileSideBar navLinks={navLinks} handleToggle={handleToggle} isMobileOpen={isMobileOpen} isSidebarOpen={isSidebarOpen}></MobileSideBar>

      {/* Mobile Overlay */}
      {isMobileOpen && (
        <div
          onClick={() => setIsMobileOpen(false)}
          className="fixed inset-0 bg-black opacity-20 z-40 md:hidden"
        />
      )}

      {/* Content Area */}
      <div
        className={`flex flex-col flex-1 transition-all duration-300 ease-in-out ${
          isSidebarOpen ? "md:ml-64" : "md:ml-16"
        }`}
      >
        {/* Navbar */}
        <Navbar setIsMobileOpen={setIsMobileOpen} navLinks={navLinks} user={user} handelLogout={handelLogout} FaAngleLeft={FaAngleLeft}></Navbar>

        {/* Main Content */}
        <div className="overflow-auto h-full bg-gray-200">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
