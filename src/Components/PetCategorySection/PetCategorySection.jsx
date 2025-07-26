import React from "react";
import {
  FaDog,
  FaCat,
  FaKiwiBird,
} from "react-icons/fa";
import { GiRabbit } from "react-icons/gi"; // from Game Icons
import { useNavigate } from "react-router";
import useAuth from "../../hooks/useAuth";

const PetCategorySection = () => {

  const navigate = useNavigate();
  const {darkLight} = useAuth()

  const handleClick = (category) => {
    navigate("/pet-listing", { state: { selectedCategory: category } });
  };

  return (
    <section
      className={`${
        darkLight ? "dark" : ""
      } py-16 relative bg-cover h-[400px] bg-center mb-[220px] md:mb-[250px] 2xl:mb-[100px]`}
      style={{
        backgroundImage: `url('https://tailwag.progressionstudios.com/wp-content/uploads/2022/04/guy-holding-smiling-puppy_t20_JaNme9.jpg')`,
      }}
    >
      <div className="absolute inset-0 bg-black opacity-30"></div>
      <div className="mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center text-white">
        <div className="mt-20">
          <h2 className="text-3xl md:text-4xl font-semibold mb-6">
            Find your new best friend
          </h2>
          <p className="text-xs text-gray-300 sm:text-lg font-medium mb-12">
            Browse pets from our network of over 14,500 shelters and rescues.
          </p>
        </div>

        <div className="absolute top-[200%] grid left-[50%] -translate-x-[50%] grid-cols-2 2xl:grid-cols-4 gap-8 z-20">
          <div
            onClick={() => handleClick("Dog")}
            className="bg-purple-100 dark:bg-gray-800 flex flex-col justify-center w-[100px] md:w-[200px] cursor-pointer hover:scale-[1.01] duration-300 items-center rounded-lg shadow-lg text-center"
          >
            <FaDog className="text-2xl md:text-4xl text-purple-500 mb-4" />
            <h3 className="text-md font-semibold text-gray-800 dark:text-gray-200">
              Dogs
            </h3>
          </div>

          <div
            onClick={() => handleClick("Cat")}
            className="bg-purple-100 dark:bg-gray-800 p-8 flex flex-col w-[100px] justify-center md:w-[200px] cursor-pointer hover:scale-[1.01] duration-300 items-center rounded-lg shadow-lg text-center"
          >
            <FaCat className="text-2xl md:text-4xl text-purple-500 mb-4" />
            <h3 className="text-md font-semibold text-gray-800 dark:text-gray-200">
              Cats
            </h3>
          </div>

          <div
            onClick={() => handleClick("Bird")}
            className="bg-purple-100 dark:bg-gray-800 p-8 flex flex-col w-[100px] justify-center md:w-[200px] cursor-pointer hover:scale-[1.01] duration-300 items-center rounded-lg shadow-lg text-center"
          >
            <FaKiwiBird className="text-2xl md:text-4xl text-purple-500 mb-4" />
            <h3 className="text-sm font-semibold text-gray-800 dark:text-gray-200">
              Bird
            </h3>
          </div>

          <div
            onClick={() => handleClick("Rabbit")}
            className="bg-purple-100 dark:bg-gray-800 p-8 flex flex-col w-[100px] justify-center md:w-[200px] cursor-pointer hover:scale-[1.01] duration-300 items-center rounded-lg shadow-lg text-center"
          >
            <GiRabbit className="text-2xl md:text-4xl text-purple-500 mb-4" />
            <h3 className="text-sm font-semibold text-gray-800 dark:text-gray-200">
              Rabbit
            </h3>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PetCategorySection;
