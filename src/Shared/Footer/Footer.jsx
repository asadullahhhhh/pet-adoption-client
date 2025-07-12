import React from "react";
import logo from "../../assets/logo-light.png";
import {
  FaMapMarkerAlt,
  FaPhoneAlt,
  FaSyncAlt,
  FaFacebookF,
  FaTwitter,
  FaEnvelope,
  FaInstagram,
} from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-[#1e1e1e] text-white pt-10">
      <div className="flex justify-center items-center mb-7 pb-7 border-b border-gray-700">
        <img className="w-[100px]" src={logo} alt="" />
      </div>

      {/* Top Section */}
      <div className="max-w-6xl mx-auto px-4 md:flex justify-between text-center md:text-left">
        {/* Address */}
        <div className="flex items-center gap-4 mb-8 md:mb-0">
          <div className="bg-red-500 p-4 rounded-full text-white text-xl">
            <FaMapMarkerAlt />
          </div>
          <div>
            <p>516 Columbia Blvd</p>
            <p>Sonoma, CA 21202</p>
          </div>
        </div>

        {/* Phone */}
        <div className="flex items-center gap-4 mb-8 md:mb-0">
          <div className="bg-red-500 p-4 rounded-full text-white text-xl">
            <FaPhoneAlt />
          </div>
          <div>
            <p>Office: 772–619–6309</p>
            <p>Inquiries: 772–619–6432</p>
          </div>
        </div>

        {/* Hours */}
        <div className="flex items-center gap-4 mb-8 md:mb-0">
          <div className="bg-red-500 p-4 rounded-full text-white text-xl">
            <FaSyncAlt />
          </div>
          <div>
            <p>Mon – Fri: 9am – 8pm</p>
            <p>Sat – Sun: Closed</p>
          </div>
        </div>
      </div>

      <div className="py-6 mt-5 bg-[#353535d2]">
        <div className="max-w-6xl mx-auto px-4 flex flex-col md:flex-row items-center justify-center">
          {/* Social Media */}
          <div className="flex gap-4 text-white text-lg">
            <FaFacebookF className="hover:text-red-500 cursor-pointer" />
            <FaTwitter className="hover:text-red-500 cursor-pointer" />
            <FaEnvelope className="hover:text-red-500 cursor-pointer" />
            <FaInstagram className="hover:text-red-500 cursor-pointer" />
          </div>
        </div>
      </div>

      {/* Copyright */}
      <div className="text-center text-sm text-gray-400 py-5">
        © Copyrights are Reserved by{" "}
        <span className="text-white font-semibold">YourCompany.com</span>
      </div>
    </footer>
  );
};

export default Footer;
