import { useQuery } from "@tanstack/react-query";
import axios from "axios";

export const useRecommendedCampaigns = (excludeId) => {
  return useQuery({
    queryKey: ["recommended-campaigns", excludeId],
    queryFn: async () => {
      const res = await axios.get(
        `http://localhost:5000/donation-campaigns/recommended?excludeId=${excludeId}`
      );
      return res.data;
    },
  });
};
