// import { useQuery } from "@tanstack/react-query";
// import { useParams } from "react-router";
// import axios from "axios"; // you'll create this next
// import { useState } from "react";
// import PetAdoptionModal from "../../Components/PetAdoptionModal/PetAdoptionModal";

// const fetchPet = async (id) => {
//   const { data } = await axios.get(
//     `http://localhost:5000/pets/${id}`
//   );
//   return data;
// };

// const PetDetails = () => {
//   const { id } = useParams();
//   const [isOpen, setIsOpen] = useState(false);

//   const {
//     data: pet,
//     isLoading,
//     isError,
//   } = useQuery({
//     queryKey: ["pet", id],
//     queryFn: () => fetchPet(id),
//   });

//   if (isLoading) return <div className="text-center mt-20">Loading...</div>;
//   if (isError) return <div>Error loading pet.</div>;

//   return (
//     <div className="max-w-4xl mx-auto mt-10 p-4">
//       <img
//         src={pet.image}
//         alt={pet.name}
//         className="rounded w-full h-80 object-cover"
//       />
//       <h2 className="text-3xl font-bold mt-6">{pet.name}</h2>
//       <p className="text-gray-700 mt-2">Age: {pet.age}</p>
//       <p className="text-gray-700">Location: {pet.location}</p>
//       <p className="text-gray-600 mt-4">{pet.description}</p>

//       <button
//         className="bg-blue-600 text-white px-4 py-2 rounded mt-6"
//         onClick={() => setIsOpen(true)}
//       >
//         Adopt
//       </button>

//       {/* Adoption Modal */}
//       <PetAdoptionModal
//         pet={pet}
//         isOpen={isOpen}
//         closeModal={() => setIsOpen(false)}
//       />
//     </div>
//   );
// };

// export default PetDetails;


import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useState } from "react";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { useParams } from "react-router";
import { FaArrowRightLong } from "react-icons/fa6";


const fetchPet = async (id) => {
  const { data } = await axios.get(
    `http://localhost:5000/pets/${id}`
  );
  return data;
};

export default function PetDetails() {
  const { id } = useParams();
    // const [isOpen, setIsOpen] = useState(false);

    const {
      data: pet,
      isLoading,
      isError,
    } = useQuery({
      queryKey: ["pet", id],
      queryFn: () => fetchPet(id),
    });

    if (isLoading) return <div className="text-center mt-20">Loading...</div>;
    if (isError) return <div>Error loading pet.</div>;

  return (
    <div className="bg-[#f8f8f8] w-full py-12 px-4 lg:px-12">
      <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center gap-10">
        {/* Image Section */}
        <div className="w-full lg:w-1/2 rounded-xl overflow-hidden">
          <Carousel showThumbs={false} infiniteLoop autoPlay showStatus={false}>
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
        <div className="w-full lg:w-1/2 text-gray-800">
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
          <button className="bg-red-500 cursor-pointer hover:bg-red-600 text-white px-6 py-3 rounded-full flex items-center gap-2 transition">
            Adopt <FaArrowRightLong />
          </button>
          
        </div>
      </div>
      
    </div>
  );
}
