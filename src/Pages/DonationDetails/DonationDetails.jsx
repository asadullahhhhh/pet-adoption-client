import { useParams } from "react-router";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { useState } from "react";
import RecommendedSection from "./RecommendedSection";
import PaymentModal from "../../Components/PaymentModal/PaymentModal";
import useAuth from "../../hooks/useAuth";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import DonationSectionSkeleton from "./DonationSectionSkeleton";
// import DonationModal from "../components/DonationModal";

const stripePromise = loadStripe(
  `pk_test_51ReBQ009ySHTtdKCSZqW6fk5NqD2hATrSTFKRtdXX91qcXCrF2PpVZbKmgZp1bR6WHQqi96TfjENQaONOTgUnRrA00vSGFRPKp`
);

const DonationDetails = () => {
  const { id } = useParams();
  const { user, darkLight } = useAuth();
  const [isOpen, setIsOpen] = useState(false);
  const queryClient = useQueryClient();

  const { data, isLoading } = useQuery({
    queryKey: ["donation-details", id],
    queryFn: async () => {
      const res = await axios.get(
        `https://server-roan-one.vercel.app/donation-campaigns/${id}`
      );
      return res.data;
    },
  });

  if (isLoading)
    return (
      <DonationSectionSkeleton darkLight={darkLight}></DonationSectionSkeleton>
    );

  const {
    petImage,
    shortDescription,
    longDescription,
    maxDonationAmount,
    totalDonatedAmount,
    lastDate,
    status,
  } = data;

  const isCollected = maxDonationAmount <= totalDonatedAmount;
  const isPushed = status === "paused";
  const isSameUser = user?.email === data?.userEmail;

  return (
    <div
      className={`py-10 bg-gray-200 ${
        darkLight ? "dark" : ""
      } dark:bg-gray-900 px-5 xl:px-0 transition-colors duration-300`}
    >
      <div className="max-w-7xl mx-auto rounded-xl overflow-hidden mb-20 bg-gray-50 dark:bg-gray-800 shadow-xl transition-colors duration-300">
        <img
          src={petImage}
          alt="Pet"
          className="w-full h-[400px] object-cover"
        />
        <div className="p-5">
          <h2 className="text-3xl font-bold mt-4 text-gray-900 dark:text-gray-100">
            {shortDescription}
          </h2>
          <div
            className="text-gray-700 dark:text-gray-300 mt-3"
            dangerouslySetInnerHTML={{ __html: longDescription }}
          />
          <div className="mt-4 text-lg text-gray-800 dark:text-gray-200">
            <p>
              <strong className="text-gray-900 dark:text-gray-100">
                Target:
              </strong>{" "}
              ${maxDonationAmount}
            </p>
            <p>
              <strong className="text-gray-900 dark:text-gray-100">
                Raised:
              </strong>{" "}
              ${totalDonatedAmount}
            </p>
            <p>
              <strong className="text-gray-900 dark:text-gray-100">
                Ends on:
              </strong>{" "}
              {new Date(lastDate).toLocaleDateString()}
            </p>
          </div>
          <button
            onClick={() => setIsOpen(true)}
            className="mt-6 cursor-pointer bg-indigo-600 hover:bg-indigo-700 text-white py-2 px-6 rounded-lg disabled:bg-indigo-800 disabled:cursor-not-allowed font-semibold transition-colors duration-300"
            disabled={!user || isCollected || isPushed || isSameUser}
          >
            {!user
              ? "Login to donate"
              : isCollected
              ? "Already Collected"
              : status === "paused"
              ? "Paused"
              : "Donate Now →"}
          </button>
        </div>
      </div>

      {/* Payment Modal */}
      <Elements stripe={stripePromise}>
        <PaymentModal
          isOpen={isOpen}
          setIsOpen={setIsOpen}
          user={user}
          data={data}
          darkLight={darkLight}
          queryClient={queryClient}
          id={id}
        />
      </Elements>

      {/* Related Card */}
      <RecommendedSection excludeId={data?._id} darkLight={darkLight} />
    </div>
  );
};

export default DonationDetails;
