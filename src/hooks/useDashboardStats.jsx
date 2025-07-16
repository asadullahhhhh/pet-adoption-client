import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const getDashboardStats = async () => {
  const [totalPets, adoptedPets, totalCampaigns] = await Promise.all([
    axios.get("/api/dashboard/total-pets"),
    axios.get("/api/dashboard/adopted-pets"),
    axios.get("/api/dashboard/total-campaigns"),
  ]);
  return {
    totalPets: totalPets.data.totalPets,
    adoptedPets: adoptedPets.data.adoptedPets,
    totalCampaigns: totalCampaigns.data.totalCampaigns,
  };
};

export const useDashboardStats = () => {
  return useQuery({
    queryKey: ["dashboard-stats"],
    queryFn: getDashboardStats,
  });
};
