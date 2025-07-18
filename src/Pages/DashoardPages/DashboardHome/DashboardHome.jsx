import { useEffect, useState } from "react";
import "react-loading-skeleton/dist/skeleton.css";
import axios from "axios";
import useAuth from "../../../hooks/useAuth";
import HomeUser from "./HomeUser";
import AdminHome from "./AdminHome";

const DashboardHome = () => {
  const [overview, setOverview] = useState([]);
  const [recentPets, setRecentPets] = useState([]);
  const [recentDonations, setRecentDonations] = useState([]);
  const [loading, setLoading] = useState(true);
  const { user, role } = useAuth();


  useEffect(() => {
    const fetchDashboardData = async () => {
      setLoading(true);
      try {
        const [overviewRes, petsRes, donationsRes] = await Promise.all([
          axios.get(
            `http://localhost:5000/dashboard/overview?email=${user?.email}`
          ),
          axios.get(
            `http://localhost:5000/dashboard/recent-pets?email=${user?.email}`
          ),
          axios.get(
            `http://localhost:5000/dashboard/recent-donations?email=${user?.email}`
          ),
        ]);

        setOverview(overviewRes.data);
        setRecentPets(petsRes.data);
        setRecentDonations(donationsRes.data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    if (user?.email) fetchDashboardData();
  }, [user]);


  const pieData = [
    { name: "Adopted", value: overview?.totalPetsAdopted || 0 },
    {
      name: "Not Adopted",
      value:
        (overview?.totalPetsAdded || 0) - (overview?.totalPetsAdopted || 0),
    },
  ];

  return role?.role === "user" ? (
    <HomeUser
      pieData={pieData}
      overview={overview}
      recentPets={recentPets}
      recentDonations={recentDonations}
      loading={loading}
    ></HomeUser>
  ) : (
    <AdminHome></AdminHome>
  );
};

export default DashboardHome;
