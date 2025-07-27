import { useQuery } from "@tanstack/react-query";
import axios from "axios";

export const useRecommendedCampaigns = (excludeId) => {
  return useQuery({
    queryKey: ["recommended-campaigns", excludeId],
    queryFn: async () => {
      const res = await axios.get(
        `https://server-roan-one.vercel.app/donation-campaigns/recommended?excludeId=${excludeId}`
      );
      return res.data;
    },
  });
};
