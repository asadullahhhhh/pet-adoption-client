import React from 'react';
import Skeleton from 'react-loading-skeleton';
import { Cell, Pie, PieChart, ResponsiveContainer, Tooltip } from 'recharts';

const HomeUser = ({loading, overview, pieData, recentPets, recentDonations}) => {

     const COLORS = ["#00C49F", "#FF8042"];

    return (
      <div className="p-4 space-y-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {loading ? (
            [...Array(3)].map((_, i) => <Skeleton key={i} height={80} />)
          ) : (
            <>
              <div className="bg-white shadow-md p-4 rounded-xl">
                <h2 className="text-gray-600">Pets Added</h2>
                <p className="text-2xl font-bold text-blue-600">
                  {overview?.totalPetsAdded}
                </p>
              </div>
              <div className="bg-white shadow-md p-4 rounded-xl">
                <h2 className="text-gray-600">Pets Adopted</h2>
                <p className="text-2xl font-bold text-green-600">
                  {overview?.totalPetsAdopted}
                </p>
              </div>
              <div className="bg-white shadow-md p-4 rounded-xl">
                <h2 className="text-gray-600">Campaigns</h2>
                <p className="text-2xl font-bold text-purple-600">
                  {overview?.totalCampaigns}
                </p>
              </div>
              <div className="bg-white shadow-md p-4 rounded-xl">
                <h2 className="text-gray-600">Total Donated</h2>
                <p className="text-2xl font-bold text-orange-600">
                  ${overview?.totalDonatedAmount}
                </p>
              </div>
            </>
          )}
        </div>

        <div className="bg-white p-4 shadow rounded-xl">
          <h2 className="text-lg font-semibold mb-2">Adoption Ratio</h2>
          {loading ? (
            <Skeleton height={200} />
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
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          )}
        </div>

        <div className="grid md:grid-cols-2 gap-4">
          <div className="bg-white shadow p-4 rounded-xl">
            <h2 className="text-lg font-semibold mb-2">Recent Pets Added</h2>
            {loading ? (
              <Skeleton count={5} />
            ) : recentPets.length > 0 ? (
              <ul className="space-y-2">
                {recentPets.map((pet, index) => (
                  <li
                    key={index}
                    className="flex items-center justify-between text-sm text-gray-700"
                  >
                    <span>{pet.name}</span>
                    <span
                      className={
                        pet.adopted ? "text-green-600" : "text-red-500"
                      }
                    >
                      {pet.adopted ? "Adopted" : "Pending"}
                    </span>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-sm text-gray-500">No pets added yet.</p>
            )}
          </div>

          <div className="bg-white shadow p-4 rounded-xl">
            <h2 className="text-lg font-semibold mb-2">Recent Donations</h2>
            {loading ? (
              <Skeleton count={3} />
            ) : recentDonations.length > 0 ? (
              <ul className="space-y-2">
                {recentDonations.map((donation, index) => (
                  <li key={index} className="text-sm text-gray-700">
                    <div className="flex items-center gap-2">
                      <img
                        src={donation.petImage}
                        alt="pet"
                        className="w-10 h-10 rounded-full object-cover"
                      />
                      <div>
                        <p className="font-medium">${donation.amount}</p>
                        <p
                          className="line-clamp-1 text-xs text-gray-500"
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
              <p className="text-sm text-gray-500">No recent donations.</p>
            )}
          </div>
        </div>
      </div>
    );
};

export default HomeUser;