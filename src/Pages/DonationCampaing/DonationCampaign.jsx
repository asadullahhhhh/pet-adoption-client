import { useInfiniteQuery } from "@tanstack/react-query";
import axios from "axios";
import { useInView } from "react-intersection-observer";
import Skeleton from "react-loading-skeleton";
import { RingLoader } from "react-spinners";
import { useEffect } from "react";
import { Link } from "react-router";
import useAuth from "../../hooks/useAuth";

const fetchCampaigns = async ({ pageParam = 1 }) => {
  const res = await axios.get(
    `https://server-iota-henna.vercel.app/donation-campaigns?page=${pageParam}&limit=9`
  );
  return res.data;
};

export default function DonationCampaign() {
  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, isLoading } =
    useInfiniteQuery({
      queryKey: ["donationCampaigns"],
      queryFn: fetchCampaigns,
      getNextPageParam: (lastPage, allPages) =>
        lastPage.hasMore ? allPages.length + 1 : undefined,
    });

  const { darkLight, user } = useAuth();

  const { ref, inView } = useInView({
    threshold: 1,
    triggerOnce: false,
  });

  useEffect(() => {
    if (inView && hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  }, [inView, hasNextPage, isFetchingNextPage, fetchNextPage]);

  const allCampaigns = data?.pages.flatMap((page) => page.campaigns) || [];

  return (
    <div
      className={`${
        darkLight ? "dark" : ""
      } bg-gray-200 dark:bg-gray-900 transition-colors duration-300 min-h-screen`}
    >
      <div className="max-w-7xl mx-auto p-4">
        <h1 className="text-3xl font-bold text-center mb-8 text-gray-900 dark:text-gray-100">
          Donation Campaigns
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7">
          {isLoading
            ? Array(9)
                .fill(null)
                .map((_, i) => (
                  <div key={i}>
                    <Skeleton
                      height={200}
                      baseColor="#1f2937"
                      highlightColor="#374151"
                    />
                    <Skeleton
                      height={20}
                      baseColor="#1f2937"
                      highlightColor="#374151"
                      style={{ marginTop: 10 }}
                    />
                    <Skeleton
                      height={20}
                      baseColor="#1f2937"
                      highlightColor="#374151"
                    />
                    <Skeleton
                      height={20}
                      baseColor="#1f2937"
                      highlightColor="#374151"
                    />
                  </div>
                ))
            : allCampaigns.map((campaign, i) => (
                <div
                  key={i}
                  className="bg-white dark:bg-gray-800 rounded-2xl overflow-hidden shadow hover:scale-[1.01] group duration-300"
                >
                  <img
                    src={campaign.petImage}
                    alt={campaign.petName}
                    className="w-full h-[250px] object-cover group-hover:scale-105 duration-500"
                  />
                  <div className="px-5 py-5 space-y-1 bg-white dark:bg-gray-800 transition-colors duration-300">
                    <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100">
                      {campaign.petName}
                    </h2>
                    <p className="text-gray-600 dark:text-gray-300">
                      <span className="font-medium text-gray-900 dark:text-gray-100">
                        Goal:
                      </span>{" "}
                      ${campaign.maxDonationAmount}
                    </p>
                    <p className="text-gray-600 dark:text-gray-300">
                      <span className="font-medium text-gray-900 dark:text-gray-100">
                        Raised:
                      </span>{" "}
                      ${campaign.totalDonatedAmount}
                    </p>
                    <Link to={`/donation-details/${campaign._id}`}>
                      <button className="mt-3 bg-indigo-600 hover:bg-indigo-700 hover:cursor-pointer text-white px-4 py-2 rounded-lg transition-colors duration-300">
                        View Details →
                      </button>
                    </Link>
                  </div>
                </div>
              ))}
        </div>

        <div ref={ref} className="h-20 my-10 flex justify-center items-center">
          {isFetchingNextPage && <RingLoader color="#6366F1" />}{" "}
          {/* indigo-500 */}
        </div>
      </div>
    </div>
  );
}
