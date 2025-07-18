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

const DashboardHome = () => {

  const { data: overview, isLoading: loadingOverview } = useQuery({
    queryKey: ["dashboard-overview"],
    queryFn: async () => {
      const res = await axios.get("http://localhost:5000/dashboard/overviews");
      return res.data;
    },
  });

  const { data: adoptionStats, isLoading: loadingAdopt } = useQuery({
    queryKey: ["adoption-stats"],
    queryFn: async () => {
      const res = await axios.get(
        "http://localhost:5000/dashboard/adoption-stats"
      );
      return res.data;
    },
  });

  const { data: donationStats, isLoading: loadingDonate } = useQuery({
    queryKey: ["donation-stats"],
    queryFn: async () => {
      const res = await axios.get(
        "http://localhost:5000/dashboard/donation-stats"
      );
      return res.data;
    },
  });

  const { data: newUsers3, isLoading: loadingUsers3 } = useQuery({
    queryKey: ["new-users-3days"],
    queryFn: async () => {
      const res = await axios.get(
        "http://localhost:5000/new-users-last3days"
      );
      return res.data;
    },
  });

  const { data: recent, isLoading: loadingRecent } = useQuery({
    queryKey: ["recent-activity"],
    queryFn: async () => {
      const res = await axios.get(
        "http://localhost:5000/dashboard/recent-activity"
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
    return <Skeleton height={200} count={5} className="mb-4" />;

  const adoptionPie = [
    { name: "Adopted", value: adoptionStats.adoptedCount },
    { name: "Pending", value: adoptionStats.pendingCount },
  ];

  const donationPie = [
    { name: "Raised", value: donationStats.totalRaised },
    { name: "Remaining", value: donationStats.remaining },
  ];


  return (
    <div className="p-6 space-y-8">
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
              <XAxis dataKey="_id" />
              <YAxis />
              <Tooltip />
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

// Reusable Components
const Card = ({ title, value }) => (
  <div className="bg-white p-5 rounded-lg shadow flex flex-col">
    <span className="text-gray-500 text-sm">{title}</span>
    <span className="text-3xl font-bold mt-2">{value}</span>
  </div>
);

const ChartCard = ({ title, children }) => (
  <div className="bg-white p-5 rounded-lg shadow">
    <h3 className="text-lg font-semibold mb-4">{title}</h3>
    {children}
  </div>
);

const RecentList = ({ title, items }) => (
  <div className="bg-white p-5 rounded-lg shadow">
    <h3 className="text-lg font-semibold mb-4">{title}</h3>
    <ul className="space-y-3">
      {items?.map((item) => (
        <li key={item.id} className="flex justify-between items-center">
          <span>{item.label}</span>
          <span className="text-sm text-gray-500">{item.sub}</span>
        </li>
      ))}
    </ul>
  </div>
);

function status(st) {
  return st === "adopted" ? "Adopted" : st === "pending" ? "Pending" : st;
}
