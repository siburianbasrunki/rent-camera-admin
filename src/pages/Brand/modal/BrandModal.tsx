import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { Brand } from "../../../model/brand";
import BrandService from "../../../service/brand";

type BrandFormData = {
  name: string;
  image?: FileList;
};

type BrandModalProps = {
  isOpen: boolean;
  onClose: () => void;
  brand?: Brand | null;
  mode: "create" | "update";
};

export default function BrandModal({
  isOpen,
  onClose,
  brand,
  mode,
}: BrandModalProps) {
  const queryClient = useQueryClient();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
    setValue,
  } = useForm<BrandFormData>({
    defaultValues: {
      name: brand?.name || "",
    },
  });

  useEffect(() => {
    if (brand) {
      setValue("name", brand.name);
    } else {
      reset();
    }
  }, [brand, setValue, reset]);

  const createMutation = useMutation({
    mutationFn: async (data: BrandFormData) => {
      const formData = new FormData();
      formData.append("name", data.name);
      if (data.image && data.image[0]) {
        formData.append("image", data.image[0]);
      }
      return BrandService.createBrand(formData);
    },
    onSuccess: () => {
      toast.success("Brand created successfully");
      queryClient.invalidateQueries({ queryKey: ["brands"] });
      onClose();
    },
    onError: (error: Error) => {
      toast.error(error.message || "Failed to create brand");
    },
  });

  const updateMutation = useMutation({
    mutationFn: async (data: BrandFormData) => {
      if (!brand) throw new Error("No brand selected");
      const formData = new FormData();
      formData.append("name", data.name);
      if (data.image && data.image[0]) {
        formData.append("image", data.image[0]);
      }
      return BrandService.updateBrand(brand.id, formData);
    },
    onSuccess: () => {
      toast.success("Brand updated successfully");
      queryClient.invalidateQueries({ queryKey: ["brands"] });
      onClose();
    },
    onError: (error: Error) => {
      toast.error(error.message || "Failed to update brand");
    },
  });

  const onSubmit = (data: BrandFormData) => {
    if (mode === "create") {
      createMutation.mutate(data);
    } else {
      updateMutation.mutate(data);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-99999 overflow-y-auto">
      <div className="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
        <div className="fixed inset-0 transition-opacity" aria-hidden="true">
          <div
            className="absolute inset-0 bg-gray-500 opacity-75"
            onClick={onClose}
          ></div>
        </div>
        <span
          className="hidden sm:inline-block sm:align-middle sm:h-screen"
          aria-hidden="true"
        >
          &#8203;
        </span>
        <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full dark:bg-gray-800">
          <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4 dark:bg-gray-800">
            <h3 className="text-lg leading-6 font-medium text-gray-900 dark:text-white mb-4">
              {mode === "create" ? "Add New Brand" : "Edit Brand"}
            </h3>
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2 dark:text-gray-300">
                  Brand Name
                </label>
                <input
                  {...register("name", { required: "Name is required" })}
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                  type="text"
                  placeholder="Brand name"
                />
                {errors.name && (
                  <p className="text-red-500 text-xs italic">
                    {errors.name.message}
                  </p>
                )}
              </div>

              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2 dark:text-gray-300">
                  {mode === "create" ? "Upload Logo" : "Change Logo"}
                </label>
                <input
                  {...register("image")}
                  className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
                  type="file"
                  accept="image/*"
                />
              </div>

              {mode === "update" && brand?.imageUrl && (
                <div className="mb-4">
                  <label className="block text-gray-700 text-sm font-bold mb-2 dark:text-gray-300">
                    Current Logo
                  </label>
                  <img
                    src={brand.imageUrl}
                    alt="Current brand logo"
                    className="h-32 object-contain"
                  />
                </div>
              )}

              <div className="flex justify-end gap-2 pt-4">
                <button
                  type="button"
                  onClick={onClose}
                  className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-200 rounded-md hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 dark:bg-gray-600 dark:text-white"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={
                    createMutation.isPending || updateMutation.isPending
                  }
                  className="px-4 py-2 text-sm font-medium text-white bg-blue-500 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50"
                >
                  {mode === "create" ? "Create" : "Update"}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}