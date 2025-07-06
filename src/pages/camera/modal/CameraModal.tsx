// components/modals/CameraModal.tsx
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { DetailCamera } from "../../../model/camera";
import { useBrand } from "../../../hooks/brand";
import CameraService from "../../../service/camera";

type CameraFormData = {
  name: string;
  price: number;
  avaliable: boolean;
  brandId: string;
  features: string[];
  image?: FileList;
};

type CameraModalProps = {
  isOpen: boolean;
  onClose: () => void;
  camera?: DetailCamera | null;
  mode: "create" | "update";
};

export default function CameraModal({
  isOpen,
  onClose,
  camera,
  mode,
}: CameraModalProps) {
  const queryClient = useQueryClient();
  const { data: brands } = useBrand();
  const [features, setFeatures] = useState<string[]>(
    camera?.ciri_ciri?.map((f) => f.ciri) || []
  );
  const [currentFeature, setCurrentFeature] = useState("");

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
    setValue,
  } = useForm<CameraFormData>({
    defaultValues: {
      name: camera?.name || "",
      price: camera?.price ? Number(camera.price) : 0,
      avaliable: camera?.avaliable || false,
      brandId: camera?.brandId || "",
      features: features,
    },
  });

  useEffect(() => {
    if (camera) {
      setValue("name", camera.name);
      setValue("price", Number(camera.price));
      setValue("avaliable", camera.avaliable);
      setValue("brandId", camera.brandId);
      setFeatures(camera.ciri_ciri?.map((f) => f.ciri) || []);
    } else {
      reset();
      setFeatures([]);
    }
  }, [camera, setValue, reset]);

  const addFeature = () => {
    if (currentFeature.trim()) {
      setFeatures([...features, currentFeature.trim()]);
      setCurrentFeature("");
    }
  };

  const removeFeature = (index: number) => {
    const newFeatures = [...features];
    newFeatures.splice(index, 1);
    setFeatures(newFeatures);
  };

  const createMutation = useMutation({
    mutationFn: async (data: CameraFormData) => {
      const formData = new FormData();
      formData.append("name", data.name);
      formData.append("price", data.price.toString());
      formData.append("avaliable", data.avaliable.toString());
      formData.append("brandId", data.brandId);
      formData.append("features", JSON.stringify(features));
      if (data.image && data.image[0]) {
        formData.append("image", data.image[0]);
      }
      return CameraService.createCamera(formData);
    },
    onSuccess: () => {
      toast.success("Camera created successfully");
      queryClient.invalidateQueries({ queryKey: ["cameras"] });
      onClose();
    },
    onError: (error: Error) => {
      toast.error(error.message || "Failed to create camera");
    },
  });

  const updateMutation = useMutation({
    mutationFn: async (data: CameraFormData) => {
      if (!camera) throw new Error("No camera selected");
      const formData = new FormData();
      formData.append("name", data.name);
      formData.append("price", data.price.toString());
      formData.append("avaliable", data.avaliable.toString());
      formData.append("brandId", data.brandId);
      formData.append("features", JSON.stringify(features));
      if (data.image && data.image[0]) {
        formData.append("image", data.image[0]);
      }
      if (data.image && data.image[0]) {
        formData.append("image", data.image[0]);
      }

      return CameraService.updateCamera(camera.id, formData);
    },
    onSuccess: () => {
      toast.success("Camera updated successfully");
      queryClient.invalidateQueries({ queryKey: ["cameras"] });
      onClose();
    },
    onError: (error: Error) => {
      toast.error(error.message || "Failed to update camera");
    },
  });

  const onSubmit = (data: CameraFormData) => {
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
              {mode === "create" ? "Add New Camera" : "Edit Camera"}
            </h3>
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2 dark:text-gray-300">
                  Name
                </label>
                <input
                  {...register("name", { required: "Name is required" })}
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                  type="text"
                  placeholder="Camera name"
                />
                {errors.name && (
                  <p className="text-red-500 text-xs italic">
                    {errors.name.message}
                  </p>
                )}
              </div>

              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2 dark:text-gray-300">
                  Brand
                </label>
                <select
                  {...register("brandId", { required: "Brand is required" })}
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                >
                  <option value="">Select Brand</option>
                  {brands?.map((brand) => (
                    <option key={brand.id} value={brand.id}>
                      {brand.name}
                    </option>
                  ))}
                </select>
                {errors.brandId && (
                  <p className="text-red-500 text-xs italic">
                    {errors.brandId.message}
                  </p>
                )}
              </div>

              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2 dark:text-gray-300">
                  Price
                </label>
                <input
                  {...register("price", {
                    required: "Price is required",
                    min: { value: 0, message: "Price must be positive" },
                  })}
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                  type="number"
                  placeholder="Price"
                />
                {errors.price && (
                  <p className="text-red-500 text-xs italic">
                    {errors.price.message}
                  </p>
                )}
              </div>

              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2 dark:text-gray-300">
                  Availability
                </label>
                <div className="flex items-center">
                  <input
                    {...register("avaliable")}
                    id="avaliable"
                    type="checkbox"
                    className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                  />
                  <label
                    htmlFor="avaliable"
                    className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                  >
                    Available
                  </label>
                </div>
              </div>

              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2 dark:text-gray-300">
                  Features
                </label>
                <div className="flex gap-2 mb-2">
                  <input
                    type="text"
                    value={currentFeature}
                    onChange={(e) => setCurrentFeature(e.target.value)}
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                    placeholder="Add feature"
                  />
                  <button
                    type="button"
                    onClick={addFeature}
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                  >
                    Add
                  </button>
                </div>
                <div className="flex flex-wrap gap-2">
                  {features.map((feature, index) => (
                    <div
                      key={index}
                      className="bg-gray-200 dark:bg-gray-700 rounded-full px-3 py-1 text-sm flex items-center gap-1"
                    >
                      {feature}
                      <button
                        type="button"
                        onClick={() => removeFeature(index)}
                        className="text-red-500 hover:text-red-700"
                      >
                        ×
                      </button>
                    </div>
                  ))}
                </div>
              </div>

              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2 dark:text-gray-300">
                  {mode === "create" ? "Upload Image" : "Change Image"}
                </label>
                <input
                  {...register("image")}
                  className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
                  type="file"
                  accept="image/*"
                />
              </div>

              {mode === "update" && camera?.imageUrl && (
                <div className="mb-4">
                  <label className="block text-gray-700 text-sm font-bold mb-2 dark:text-gray-300">
                    Current Image
                  </label>
                  <img
                    src={camera.imageUrl}
                    alt="Current camera"
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
