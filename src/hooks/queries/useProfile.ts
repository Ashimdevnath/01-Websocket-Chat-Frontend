import { useQuery } from "@tanstack/react-query";
import { getProfile } from "../../api/services/auth.service";

export const useProfile = () => {
  return useQuery({
    queryKey: ["profile"],
    queryFn: getProfile,
  });
};
