import { useQuery } from "@tanstack/react-query";
import { authApi } from "@/features/auth/api/auth-api";
import { useAuth } from "../context/auth-context";
import { USER_QUERY_KEY } from "../constant/auth";

export const useUser = () => {
  const { token, isAuthenticated } = useAuth();

  return useQuery({
    queryKey: [USER_QUERY_KEY],
    queryFn: () => authApi.getCurrentUser(),
    enabled: isAuthenticated && !!token,
  });
};
