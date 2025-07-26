import { useQuery } from "@tanstack/react-query";
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
} from "recharts";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import axios from "axios";

const COLORS = ["#4ade80", "#facc15", "#f87171"];

const DashboardHome = ({ darkLight }) => {
  const { data: overview, isLoading: loadingOverview } = useQuery({
    queryKey: ["dashboard-overview"],
    queryFn: async () => {
      const res = await axios.get(
        "https://server-iota-henna.vercel.app/dashboard/overviews"
      );
      return res.data;
    },
  });

  const { data: adoptionStats, isLoading: loadingAdopt } = useQuery({
    queryKey: ["adoption-stats"],
    queryFn: async () => {
      const res = await axios.get(
        "https://server-iota-henna.vercel.app/dashboard/adoption-stats"
      );
      return res.data;
    },
  });

  const { data: donationStats, isLoading: loadingDonate } = useQuery({
    queryKey: ["donation-stats"],
    queryFn: async () => {
      const res = await axios.get(
        "https://server-iota-henna.vercel.app/dashboard/donation-stats"
      );
      return res.data;
    },
  });

  const { data: newUsers3, isLoading: loadingUsers3 } = useQuery({
    queryKey: ["new-users-3days"],
    queryFn: async () => {
      const res = await axios.get(
        "https://server-iota-henna.vercel.app/new-users-last3days"
      );
      return res.data;
    },
  });

  const { data: recent, isLoading: loadingRecent } = useQuery({
    queryKey: ["recent-activity"],
    queryFn: async () => {
      const res = await axios.get(
        "https://server-iota-henna.vercel.app/dashboard/recent-activity"
      );
      return res.data;
    },
  });

  if (
    loadingOverview ||
    loadingAdopt ||
    loadingDonate ||
    loadingUsers3 ||
    loadingRecent
  )
    return (
      <div className={`${darkLight ? "dark" : ""} p-5 dark:bg-gray-900`}>
        <Skeleton
          height={200}
          baseColor="#1f2937"
          highlightColor="#374151"
          count={5}
          className="mb-4"
        />
      </div>
    );

  const adoptionPie = [
    { name: "Adopted", value: adoptionStats.adoptedCount },
    { name: "Pending", value: adoptionStats.pendingCount },
  ];

  const donationPie = [
    { name: "Raised", value: donationStats.totalRaised },
    { name: "Remaining", value: donationStats.remaining },
  ];

  return (
    <div
      className={`${
        darkLight ? "dark" : ""
      } p-6 space-y-8 bg-gray-50 dark:bg-gray-900 duration-500 min-h-screen`}
    >
      {/* Overview Cards */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        <Card title="Total Users" value={overview.totalUsers} />
        <Card title="Total Pets" value={overview.totalPets} />
        <Card
          title="Adoption Requests"
          value={overview.totalAdoptionRequests}
        />
        <Card
          title="Donation Campaigns"
          value={overview.totalDonationCampaigns}
        />
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-8">
        <ChartCard title="Adoption: Adopted vs Pending">
          <ResponsiveContainer width="100%" height={250}>
            <PieChart>
              <Pie
                data={adoptionPie}
                dataKey="value"
                nameKey="name"
                cx="50%"
                cy="50%"
                outerRadius={80}
                label
              >
                {adoptionPie?.map((_, i) => (
                  <Cell key={i} fill={COLORS[i]} />
                ))}
              </Pie>
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </ChartCard>

        <ChartCard title="Donation: Raised vs Remaining">
          <ResponsiveContainer width="100%" height={250}>
            <PieChart>
              <Pie
                data={donationPie}
                dataKey="value"
                nameKey="name"
                cx="50%"
                cy="50%"
                outerRadius={80}
                label
              >
                {donationPie?.map((_, i) => (
                  <Cell key={i} fill={COLORS[i]} />
                ))}
              </Pie>
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </ChartCard>

        <ChartCard title="New Users: Last 3 Days">
          <ResponsiveContainer width="100%" height={250}>
            <LineChart data={newUsers3}>
              <XAxis dataKey="_id" stroke="#9ca3af" />
              <YAxis stroke="#9ca3af" />
              <Tooltip
                contentStyle={{ backgroundColor: "#1f2937", color: "#fff" }}
              />
              <Line
                type="monotone"
                dataKey="count"
                stroke="#4ade80"
                strokeWidth={2}
              />
            </LineChart>
          </ResponsiveContainer>
        </ChartCard>
      </div>

      {/* Recent Activities */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <RecentList
          title="New Users"
          items={recent.latestUsers?.map((u) => ({
            id: u.email,
            label: u.name,
            sub: new Date(u.created_At).toLocaleDateString(),
          }))}
        />

        <RecentList
          title="Recent Adoptions"
          items={recent.latestAdoptions?.map((a) => ({
            id: a.petId,
            label: a.petImage ? a.petImage.split("/").pop() : a.petId,
            sub: status(a.status),
          }))}
        />

        <RecentList
          title="Recent Donations"
          items={recent.latestDonations?.map((d) => ({
            id: d._id,
            label: d.shortDescription,
            sub: `${d.totalDonatedAmount}/${d.maxDonationAmount}৳`,
          }))}
        />
      </div>
    </div>
  );
};

export default DashboardHome;

/// ✅ Reusable Components with Dark Mode
const Card = ({ title, value }) => (
  <div className="bg-white dark:bg-gray-800 p-5 rounded-lg shadow flex flex-col transition-colors duration-300">
    <span className="text-gray-500 dark:text-gray-400 text-sm">{title}</span>
    <span className="text-3xl font-bold mt-2 text-gray-900 dark:text-white">
      {value}
    </span>
  </div>
);

const ChartCard = ({ title, children }) => (
  <div className="bg-white dark:bg-gray-800 p-5 rounded-lg shadow transition-colors duration-300">
    <h3 className="text-lg font-semibold mb-4 text-gray-900 dark:text-white">
      {title}
    </h3>
    {children}
  </div>
);

const RecentList = ({ title, items }) => (
  <div className="bg-white dark:bg-gray-800 p-5 rounded-lg shadow transition-colors duration-300">
    <h3 className="text-lg font-semibold mb-4 text-gray-900 dark:text-white">
      {title}
    </h3>
    <ul className="space-y-3">
      {items?.map((item) => (
        <li
          key={item.id}
          className="flex justify-between items-center border-b border-gray-100 dark:border-gray-700 pb-2 last:border-none"
        >
          <span className="text-gray-800 dark:text-gray-100">{item.label}</span>
          <span className="text-sm text-gray-500 dark:text-gray-400">
            {item.sub}
          </span>
        </li>
      ))}
    </ul>
  </div>
);

function status(st) {
  return st === "adopted" ? "Adopted" : st === "pending" ? "Pending" : st;
}
