import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useState } from "react";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { useParams } from "react-router";
import PetCard from "./PetCard";
import PetDescript from "./PetDescript";
import AdoptModal from "./AdoptionModal";
import useAuth from "../../hooks/useAuth";
import PetDetailsSkeleton from "./PetDetailsSkeleton";


const fetchPet = async (id) => {
  const { data } = await axios.get(
    `http://localhost:5000/pets/${id}`
  );
  return data;
};

export default function PetDetails() {

  const { id } = useParams();
  const [isOpen, setIsOpen] = useState(false);
  const { user } = useAuth()

    const {
      data: pet,
      isLoading,
      isError,
    } = useQuery({
      queryKey: ["pet", id],
      queryFn: () => fetchPet(id),
    });


     const { data: requestStatus} = useQuery({
       queryKey: ["adoptionRequest", user?.email, id],
       queryFn: async () => {
         if (!user?.uid) return { requested: false };
         const { data } = await axios.get(
           `http://localhost:5000/adoptPet/requested?email=${user?.email}&petId=${id}`
         );
         return data;
       },
       enabled: !!user?.email && !!id
     });


    if (isLoading) return <PetDetailsSkeleton></PetDetailsSkeleton>;
    if (isError) return <div>Error loading pet.</div>;

  return (
    <section>
      {/* Pet Card */}
      <PetCard
        pet={pet}
        setIsOpen={setIsOpen}
        requestStatus={requestStatus?.requested}
        user={user}
      ></PetCard>
      {/* pet Description */}
      <PetDescript pet={pet}></PetDescript>
      {/* adoption form */}
      <AdoptModal
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        pet={pet}
        user={user}
      ></AdoptModal>
    </section>
  );
}
