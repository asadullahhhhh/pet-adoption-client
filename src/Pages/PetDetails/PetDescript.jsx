import React from 'react';
import { FaPaw } from "react-icons/fa";
import { FaClipboardList } from "react-icons/fa";

const PetDescript = ({pet, darkLight}) => {
    return (
      <div className={`${darkLight ? "dark" : ""}`}>
        <div className="p-6 max-w-5xl mx-auto bg-white dark:bg-[#1f2937] rounded-xl transition-colors duration-300">
          {/* Title */}
          <h1 className="text-4xl font-bold mb-2 text-gray-800 dark:text-gray-100">
            About {pet.name}
          </h1>

          {/* Traits */}
          <div className="flex flex-wrap sm:gap-10 my-10 flex-col sm:flex-row">
            {pet.traits.map((trait, index) => (
              <span
                key={index}
                className="flex items-center gap-1 font-semibold text-gray-500 dark:text-gray-300"
              >
                <FaPaw className="text-orange-500" /> {trait}
              </span>
            ))}
          </div>

          {/* Long Description */}
          <div>
            <div
              className="mb-15 text-gray-600 dark:text-gray-300 text-sm leading-relaxed"
              dangerouslySetInnerHTML={{ __html: pet?.longDescription || "" }}
            ></div>
          </div>

          {/* Adoption Rules */}
          <div className="mt-6">
            <div className="bg-orange-50 dark:bg-gray-800 p-5 rounded-xl transition-colors duration-300">
              <h2 className="text-xl font-bold mb-2 flex items-center gap-2 text-gray-900 dark:text-gray-100">
                <FaClipboardList className="text-orange-500" /> Adoption Rules
              </h2>
              <ul className="list-disc pl-5 text-gray-700 dark:text-gray-300 space-y-1">
                <li>Adopter must be 18 years or older.</li>
                <li>Home check may be required before adoption.</li>
                <li>
                  Adopted pets must be spayed/neutered if not already done.
                </li>
                <li>Vaccinations should be maintained regularly.</li>
                <li>Return policy applies if unable to continue care.</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    );
};

export default PetDescript;