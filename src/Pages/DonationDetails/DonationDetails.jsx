import { useParams } from "react-router";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useState } from "react";
import RecommendedSection from "./RecommendedSection";
import PaymentModal from "../../Components/PaymentModal/PaymentModal";
import useAuth from "../../hooks/useAuth";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
// import DonationModal from "../components/DonationModal";

const stripePromise = loadStripe(
  `pk_test_51ReBQ009ySHTtdKCSZqW6fk5NqD2hATrSTFKRtdXX91qcXCrF2PpVZbKmgZp1bR6WHQqi96TfjENQaONOTgUnRrA00vSGFRPKp`
);

const DonationDetails = () => {
  const { id } = useParams();
  const { user } = useAuth();
  const [isOpen, setIsOpen] = useState(false);

  const { data, isLoading } = useQuery({
    queryKey: ["donation-details", id],
    queryFn: async () => {
      const res = await axios.get(
        `http://localhost:5000/donation-campaigns/${id}`
      );
      return res.data;
    },
  });

  if (isLoading) return <p className="text-center">Loading...</p>;

  const {
    petImage,
    shortDescription,
    longDescription,
    maxDonationAmount,
    totalDonatedAmount,
    lastDate,
  } = data;

  return (
    <div className="py-10 bg-gray-200 px-5 xl:px-0">
      <div className="max-w-7xl mx-auto rounded-xl overflow-hidden mb-20 bg-gray-50 shadow-xl ">
        <img
          src={petImage}
          alt="Pet"
          className="w-full h-[400px] object-cover"
        />
        <div className="p-5">
          <h2 className="text-3xl font-bold mt-4">{shortDescription}</h2>
          <div
            className="text-gray-700 mt-3"
            dangerouslySetInnerHTML={{ __html: longDescription }}
          />
          <div className="mt-4 text-lg">
            <p>
              <strong>Target:</strong> ${maxDonationAmount}
            </p>
            <p>
              <strong>Raised:</strong> ${totalDonatedAmount}
            </p>
            <p>
              <strong>Ends on:</strong>{" "}
              {new Date(lastDate).toLocaleDateString()}
            </p>
          </div>
          <button
            onClick={() => setIsOpen(true)}
            className="mt-6 cursor-pointer bg-indigo-600 hover:bg-indigo-700 text-white py-2 px-6 rounded-lg font-semibold"
          >
            Donate Now →
          </button>
        </div>
      </div>
      {/* Related */}
      <Elements stripe={stripePromise}>
        <PaymentModal
          isOpen={isOpen}
          setIsOpen={setIsOpen}
          user={user}
          data={data}
        ></PaymentModal>
      </Elements>

      {/* Related Card */}
      <RecommendedSection excludeId={data?._id} ></RecommendedSection>
    </div>
  );
};

export default DonationDetails;
