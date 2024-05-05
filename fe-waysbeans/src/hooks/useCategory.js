import { useQuery } from "@tanstack/react-query";
import apiConfig from "../libs/api"

export const findCategories = () => {
  const { data, isLoading, refetch } = useQuery({
    queryKey: ["categories"],
    queryFn: async () => {
      try {
        const response = await apiConfig.get("/categories");

        return response.data.Data;
      } catch (error) {
        throw error;
      }
    },
  });

  return {
    data,
    isLoading,
    refetch,
  };
};