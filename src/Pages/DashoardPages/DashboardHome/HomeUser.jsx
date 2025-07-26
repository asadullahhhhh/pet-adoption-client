import React from 'react';
import Skeleton from 'react-loading-skeleton';
import { Cell, Pie, PieChart, ResponsiveContainer, Tooltip } from 'recharts';

const HomeUser = ({loading, overview, pieData, recentPets, recentDonations, darkLight}) => {

     const COLORS = ["#00C49F", "#FF8042"];

    return (
      <div
        className={`${
          darkLight ? "dark" : ""
        } dark:bg-gray-900 min-h-screen p-4 space-y-6`}
      >
        {/* Overview Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {loading ? (
            [...Array(3)].map((_, i) => (
              <Skeleton
                key={i}
                baseColor="#1f2937"
                highlightColor="#374151"
                height={80}
              />
            ))
          ) : (
            <>
              <div className="bg-white dark:bg-gray-800 shadow-md p-4 rounded-xl transition-colors duration-300">
                <h2 className="text-gray-600 dark:text-gray-400">Pets Added</h2>
                <p className="text-2xl font-bold text-blue-600 dark:text-blue-400">
                  {overview?.totalPetsAdded}
                </p>
              </div>
              <div className="bg-white dark:bg-gray-800 shadow-md p-4 rounded-xl transition-colors duration-300">
                <h2 className="text-gray-600 dark:text-gray-400">
                  Pets Adopted
                </h2>
                <p className="text-2xl font-bold text-green-600 dark:text-green-400">
                  {overview?.totalPetsAdopted}
                </p>
              </div>
              <div className="bg-white dark:bg-gray-800 shadow-md p-4 rounded-xl transition-colors duration-300">
                <h2 className="text-gray-600 dark:text-gray-400">Campaigns</h2>
                <p className="text-2xl font-bold text-purple-600 dark:text-purple-400">
                  {overview?.totalCampaigns}
                </p>
              </div>
              <div className="bg-white dark:bg-gray-800 shadow-md p-4 rounded-xl transition-colors duration-300">
                <h2 className="text-gray-600 dark:text-gray-400">
                  Total Donated
                </h2>
                <p className="text-2xl font-bold text-orange-600 dark:text-orange-400">
                  ${overview?.totalDonatedAmount}
                </p>
              </div>
            </>
          )}
        </div>

        {/* Pie Chart */}
        <div className="bg-white dark:bg-gray-800 p-4 shadow rounded-xl transition-colors duration-300">
          <h2 className="text-lg font-semibold mb-2 text-gray-900 dark:text-white">
            Adoption Ratio
          </h2>
          {loading ? (
            <Skeleton
              height={200}
              baseColor="#1f2937"
              highlightColor="#374151"
            />
          ) : (
            <ResponsiveContainer width="100%" height={250}>
              <PieChart>
                <Pie
                  data={pieData}
                  cx="50%"
                  cy="50%"
                  outerRadius={80}
                  dataKey="value"
                  label
                >
                  {pieData.map((_, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index]} />
                  ))}
                </Pie>
                <Tooltip
                  contentStyle={{
                    backgroundColor: darkLight ? "#1f2937" : "#fff",
                    color: darkLight ? "#fff" : "#000",
                    border: "none",
                  }}
                />
              </PieChart>
            </ResponsiveContainer>
          )}
        </div>

        {/* Recent Pets & Donations */}
        <div className="grid md:grid-cols-2 gap-4">
          <div className="bg-white dark:bg-gray-800 shadow p-4 rounded-xl transition-colors duration-300">
            <h2 className="text-lg font-semibold mb-2 text-gray-900 dark:text-white">
              Recent Pets Added
            </h2>
            {loading ? (
              <Skeleton
                count={5}
                baseColor="#1f2937"
                highlightColor="#374151"
              />
            ) : recentPets.length > 0 ? (
              <ul className="space-y-2">
                {recentPets.map((pet, index) => (
                  <li
                    key={index}
                    className="flex items-center justify-between text-sm text-gray-700 dark:text-gray-200 border-b border-gray-100 dark:border-gray-700 pb-2 last:border-none"
                  >
                    <span>{pet.name}</span>
                    <span
                      className={
                        pet.adopted
                          ? "text-green-600 dark:text-green-400"
                          : "text-red-500 dark:text-red-400"
                      }
                    >
                      {pet.adopted ? "Adopted" : "Pending"}
                    </span>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-sm text-gray-500 dark:text-gray-400">
                No pets added yet.
              </p>
            )}
          </div>

          <div className="bg-white dark:bg-gray-800 shadow p-4 rounded-xl transition-colors duration-300">
            <h2 className="text-lg font-semibold mb-2 text-gray-900 dark:text-white">
              Recent Donations
            </h2>
            {loading ? (
              <Skeleton
                count={3}
                baseColor="#1f2937"
                highlightColor="#374151"
              />
            ) : recentDonations.length > 0 ? (
              <ul className="space-y-2">
                {recentDonations.map((donation, index) => (
                  <li
                    key={index}
                    className="text-sm text-gray-700 dark:text-gray-200"
                  >
                    <div className="flex items-center gap-2">
                      <img
                        src={donation.petImage}
                        alt="pet"
                        className="w-10 h-10 rounded-full object-cover"
                      />
                      <div>
                        <p className="font-medium text-gray-900 dark:text-gray-100">
                          ${donation.amount}
                        </p>
                        <p
                          className="line-clamp-1 text-xs text-gray-500 dark:text-gray-400"
                          dangerouslySetInnerHTML={{
                            __html: donation.description,
                          }}
                        ></p>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-sm text-gray-500 dark:text-gray-400">
                No recent donations.
              </p>
            )}
          </div>
        </div>
      </div>
    );
};

export default HomeUser;