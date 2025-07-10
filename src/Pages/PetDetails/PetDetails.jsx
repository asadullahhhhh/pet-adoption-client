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
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { useParams } from "react-router";
import PetCard from "./PetCard";
import PetDescript from "./PetDescript";


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
    <section>
      {/* Pet Card */}
      <PetCard pet={pet}></PetCard>
      {/* pet Description */}
      <PetDescript pet={pet}></PetDescript>
    </section>
  );
}
