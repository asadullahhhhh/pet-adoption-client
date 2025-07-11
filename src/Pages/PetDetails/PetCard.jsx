import React from 'react';

import { FaArrowRightLong } from "react-icons/fa6";
import { Carousel } from "react-responsive-carousel";

const PetCard = ({ pet, setIsOpen }) => {
  return (
    <div>
      <div className="bg-[#f8f8f8] relative w-full py-12 px-4 lg:px-12">
        <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center gap-10">
          {/* Image Section */}
          <div className="w-full lg:w-1/2 rounded-xl overflow-hidden">
            <Carousel showThumbs={false} infiniteLoop showStatus={false}>
              {pet.images.map((img, index) => (
                <div key={index}>
                  <img
                    src={img}
                    alt={`pet-${index}`}
                    className="h-[500px] w-full object-cover rounded-xl"
                  />
                </div>
              ))}
            </Carousel>
          </div>

          {/* Content Section */}
          <div className="w-full lg:w-1/2 text-gray-800 pb-10 lg:pb-0">
            {/* Title */}
            <h2 className="text-4xl font-bold mb-4 relative inline-block">
              Meet {pet.name}
              <span className="block w-20 h-1 bg-red-400 mt-2 rounded-full"></span>
            </h2>

            {/* Details Grid */}
            <div className="grid grid-cols-2 gap-y-3 text-base mb-6">
              <p>
                <span className="font-semibold">Gender:</span> {pet.gender}
              </p>
              <p>
                <span className="font-semibold">Breed:</span> {pet.breed}
              </p>
              <p>
                <span className="font-semibold">Neutered:</span>{" "}
                {pet.neutered ? "Yes" : "No"}
              </p>
              <p>
                <span className="font-semibold">Vaccinated:</span>{" "}
                {pet.vaccinated ? "Yes" : "No"}
              </p>
              <p>
                <span className="font-semibold">Age:</span> {pet.age}
              </p>
              <p>
                <span className="font-semibold">Size:</span> {pet.size}
              </p>
            </div>

            {/* Description */}
            <p className="text-gray-600 leading-relaxed text-sm mb-6">
              {pet.description}
            </p>

            {/* Adopt Button */}
            <button onClick={() => setIsOpen(true)} className="bg-red-500 cursor-pointer hover:bg-red-600 text-white px-6 py-3 rounded-full flex items-center gap-2 transition">
              Adopt <FaArrowRightLong />
            </button>
          </div>
        </div>

        {/* Wave bottom effect */}
        <div className="absolute bottom-0 left-0 w-full overflow-hidden leading-none">
          <svg
            viewBox="0 0 500 150"
            preserveAspectRatio="none"
            className="w-full h-20"
          >
            <path
              d="M-9.31,91.41 C170.54,190.92 271.70,14.36 500.00,89.09 L500.00,150.00 L0.00,150.00 Z"
              style={{ stroke: "none", fill: "#ffffff" }}
            ></path>
          </svg>
        </div>
      </div>
    </div>
  );
};

export default PetCard;