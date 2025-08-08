import { useEffect, useState } from "react";
import "react-loading-skeleton/dist/skeleton.css";
import axios from "axios";
import useAuth from "../../../hooks/useAuth";
import HomeUser from "./HomeUser";
import AdminHome from "./AdminHome";
import useAxiosSecure from "../../../hooks/useAxiosSecure";

const DashboardHome = () => {
  const [overview, setOverview] = useState({});
  const [recentPets, setRecentPets] = useState([]);
  const [recentDonations, setRecentDonations] = useState([]);
  const [loading, setLoading] = useState(true);
  const { user, role, darkLight } = useAuth();
  const axiosSecure = useAxiosSecure();

  useEffect(() => {
    const fetchDashboardData = async () => {
      setLoading(true);
      try {
        const [overviewRes, petsRes, donationsRes] = await Promise.all([
          axiosSecure.get(`/dashboard/overview?email=${user?.email}`),
          axiosSecure.get(
            `/dashboard/recent-pets?email=${user?.email}`
          ),
          axiosSecure.get(
            `/dashboard/recent-donations?email=${user?.email}`
          ),
        ]);

        setOverview(overviewRes?.data);
        setRecentPets(petsRes?.data);
        setRecentDonations(donationsRes?.data);
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
      darkLight={darkLight}
    ></HomeUser>
  ) : (
    <AdminHome darkLight={darkLight}></AdminHome> 
  );
};

export default DashboardHome;
