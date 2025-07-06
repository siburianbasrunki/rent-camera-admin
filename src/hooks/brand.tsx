import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import BrandService from "../service/brand";
import toast from "react-hot-toast";

export const useBrand = () => {
  const queryClient = useQueryClient();

  const query = useQuery({
    queryKey: ['brands'],
    queryFn: BrandService.getBrand,
  });

  const createBrandMutation = useMutation({
    mutationFn: BrandService.createBrand,
    onSuccess: () => {
      toast.success("Brand created successfully");
      queryClient.invalidateQueries({ queryKey: ['brands'] });
    },
    onError: (error: Error) => {
      toast.error(error.message || "Failed to create brand");
    },
  });

  const updateBrandMutation = useMutation({
    mutationFn: ({ id, formData }: { id: string, formData: FormData }) => 
      BrandService.updateBrand(id, formData),
    onSuccess: () => {
      toast.success("Brand updated successfully");
      queryClient.invalidateQueries({ queryKey: ['brands'] });
    },
    onError: (error: Error) => {
      toast.error(error.message || "Failed to update brand");
    },
  });

  const deleteBrandMutation = useMutation({
    mutationFn: BrandService.deleteBrand,
    onSuccess: () => {
      toast.success("Brand deleted successfully");
      queryClient.invalidateQueries({ queryKey: ['brands'] });
    },
    onError: (error: Error) => {
      toast.error(error.message || "Failed to delete brand");
    },
  });

  return {
    ...query,
    createBrand: createBrandMutation.mutate,
    updateBrand: updateBrandMutation.mutate,
    deleteBrand: deleteBrandMutation.mutate,
    isCreating: createBrandMutation.isPending,
    isUpdating: updateBrandMutation.isPending,
    isDeleting: deleteBrandMutation.isPending,
  };
};