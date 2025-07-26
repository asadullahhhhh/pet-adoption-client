import React from "react";
import useAuth from "../../hooks/useAuth";

const AboutSection = () => {

  const {darkLight} = useAuth()

  return (
    <section
      className={`py-12 bg-gray-50 dark:bg-gray-900 transition-colors duration-500 ${
        darkLight ? "dark" : ""
      }`}
    >
      <div className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-8">
          {/* Left: Image */}
          <div className="mb-6 sm:mb-0">
            <div className="relative">
              <img
                src="https://media.istockphoto.com/id/1298318642/photo/sheepadoodle-dog-isolated-on-white.jpg?s=2048x2048&w=is&k=20&c=GC5Y2ZSfnj3jqKYHYv0tRM0aEA0p6_7FFFiyEegoszM="
                alt="Dog Image"
                className="rounded-full w-[300px] md:w-[400px] h-[300px] md:h-[400px] object-cover shadow-lg mx-auto sm:mx-0 border-4 border-white dark:border-gray-800 transition-all duration-500"
              />
              <div className="absolute -z-10 top-4 left-4 w-full h-full rounded-full bg-amber-200/40 dark:bg-amber-400/20 blur-2xl"></div>
            </div>
          </div>

          {/* Right: Text Content */}
          <div className="text-center flex-1 sm:text-left max-w-xl">
            {/* Section Title */}
            <div className="flex items-center justify-center gap-5 sm:justify-start mb-10">
              <div className="w-16 h-[3px] bg-amber-300"></div>
              <span className="text-amber-500 font-semibold text-lg sm:text-xl mr-2">
                About Us
              </span>
            </div>

            {/* Main Title */}
            <h2 className="text-4xl font-semibold text-gray-800 dark:text-gray-100 mb-4 transition-colors">
              The Best for Your Pet!
            </h2>

            {/* Description */}
            <div className="my-6 space-y-5 font-medium">
              <p className="text-md text-gray-500 dark:text-gray-300 transition-colors">
                We provide the highest quality pet care products, designed with
                your pet's happiness and health in mind.
              </p>
              <p className="text-gray-500 dark:text-gray-300 text-md transition-colors">
                Our mission is to offer everything your pet needs.
              </p>
            </div>

            {/* Bullet Points */}
            <ul className="list-inside space-y-4 text-gray-600 dark:text-gray-300 font-medium text-sm transition-colors">
              <li className="flex items-center gap-3">
                <svg
                  className="w-5 h-5 text-amber-400"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M8 9a2 2 0 114 0 2 2 0 01-4 0zm1 5a3 3 0 106 0 3 3 0 00-6 0z"
                    clipRule="evenodd"
                  />
                </svg>
                Customizable Pet Products
              </li>
              <li className="flex items-center gap-3">
                <svg
                  className="w-5 h-5 text-amber-400"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M8 9a2 2 0 114 0 2 2 0 01-4 0zm1 5a3 3 0 106 0 3 3 0 00-6 0z"
                    clipRule="evenodd"
                  />
                </svg>
                High-Quality Materials
              </li>
              <li className="flex items-center gap-3">
                <svg
                  className="w-5 h-5 text-amber-400"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M8 9a2 2 0 114 0 2 2 0 01-4 0zm1 5a3 3 0 106 0 3 3 0 00-6 0z"
                    clipRule="evenodd"
                  />
                </svg>
                Fast & Secure Shipping
              </li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
