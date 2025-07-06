import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import BannerService from "../service/banner";

export const useBanner = () => {
  return useQuery({
    queryKey: ["banner"],
    queryFn: () => BannerService.getBanner(),
  });
};

export const useUpdateBanner = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (formData: FormData) => BannerService.updateBanner(formData),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["banner"] });
    },
  });
};