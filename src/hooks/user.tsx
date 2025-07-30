import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import UserService from "../service/user";
import toast from "react-hot-toast";
import { useUser } from "@/shared/hooks/useUser";

export const useUsers = () => {
  return useQuery({
    queryKey: ["users"],
    queryFn: UserService.getUsers,
  });
};

export const useUserByIdOld = () => {
  const { data: user } = useUser();
  const userData = user?.data?.data;
  return useQuery({
    queryKey: ["cameras", userData?.id],
    queryFn: () => {
      if (!user) throw new Error("No ID provided");
      return UserService.getUserById(userData?.id ?? "");
    },
    enabled: !!user,
  });
};

export const useUserById = (id?: string) => {
  return useQuery({
    queryKey: ["users", id],
    queryFn: () => {
      if (!id) throw new Error("No ID provided");
      return UserService.getUserById(id);
    },
    enabled: !!id,
  });
};

export const useUserMutations = () => {
  const queryClient = useQueryClient();
  const { user } = useAuth();
  const createMutation = useMutation({
    mutationFn: ({ formData }: { formData: FormData }) =>
      UserService.createUser(formData),
    onSuccess: () => {
      toast.success("User created successfully");
      queryClient.invalidateQueries({ queryKey: ["users"] });
    },
    onError: (error: Error) => {
      toast.error(error.message || "Failed to create user");
    },
  });
  const updateMutation = useMutation({
    mutationFn: ({ id, formData }: { id: string; formData: FormData }) =>
      UserService.updateUser(id, formData),
    onSuccess: () => {
      toast.success("User updated successfully");
      queryClient.invalidateQueries({ queryKey: ["users"] });
      if (user) {
        queryClient.invalidateQueries({ queryKey: ["users", user.id] });
      }
    },
    onError: (error: Error) => {
      toast.error(error.message || "Failed to update user");
    },
  });

  const deleteMutation = useMutation({
    mutationFn: (id: string) => UserService.deleteUser(id),
    onSuccess: () => {
      toast.success("User deleted successfully");
      queryClient.invalidateQueries({ queryKey: ["users"] });
    },
    onError: (error: Error) => {
      toast.error(error.message || "Failed to delete user");
    },
  });

  return {
    updateUser: updateMutation.mutate,
    createUser: createMutation.mutate,
    deleteUser: deleteMutation.mutate,
    isUpdating: updateMutation.isPending,
    isCreating: createMutation.isPending,
    isDeleting: deleteMutation.isPending,
  };
};
