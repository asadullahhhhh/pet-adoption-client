import Skeleton from "react-loading-skeleton";
import { useRecommendedCampaigns } from "../../hooks/useRecommendedCampaigns ";
import { Link } from "react-router";

const RecommendedSection = ({ excludeId, darkLight }) => {
  const { data: campaigns, isLoading } = useRecommendedCampaigns(excludeId);
  console.log(campaigns);

  if (isLoading) return <Skeleton count={3} />;

  return (
    <div
      className={`${
        darkLight ? "dark" : ""
      } mt-10 max-w-7xl mx-auto px-5 xl:px-0 mb-14 transition-colors duration-300`}
    >
      <h2 className="text-lg md:text-2xl relative font-semibold mb-10 text-gray-900 dark:text-gray-100">
        Recommended Donation Campaigns
        <span className="w-[200px] top-[125%] left-0 h-[3px] absolute bg-amber-400"></span>
      </h2>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
        {campaigns?.map((item) => (
          <div
            key={item._id}
            className="border border-gray-200 dark:border-gray-700 rounded-xl overflow-hidden shadow-md hover:scale-[1.01] group duration-300 bg-white dark:bg-gray-800 transition-colors"
          >
            <img
              src={item.petImage}
              alt="pet"
              className="w-full h-48 object-cover group-hover:scale-105 duration-500"
            />
            <div className="p-5 bg-gray-50 dark:bg-gray-900 transition-colors duration-300">
              <p className="font-bold mt-2 text-gray-900 dark:text-gray-100">
                {item.shortDescription}
              </p>
              <p className="text-gray-600 dark:text-gray-300">
                <span className="font-medium text-gray-900 dark:text-gray-100">
                  Goal:
                </span>{" "}
                ${item.maxDonationAmount}
              </p>
              <p className="text-gray-600 dark:text-gray-300">
                <span className="font-medium text-gray-900 dark:text-gray-100">
                  Raised:
                </span>{" "}
                ${item.totalDonatedAmount}
              </p>
              <Link to={`/donation-details/${item._id}`}>
                <button className="mt-3 bg-blue-600 hover:bg-blue-700 cursor-pointer text-white px-4 py-2 rounded-lg transition-colors duration-300">
                  View Details →
                </button>
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};


export default RecommendedSection