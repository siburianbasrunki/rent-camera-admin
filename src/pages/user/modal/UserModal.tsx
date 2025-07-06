// components/modals/UserModal.tsx
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { UserModel } from "../../../model/users";
import { useUserMutations } from "../../../hooks/user";

type UserFormData = {
  name: string;
  phoneNumber: string;
  role: "USER" | "ADMIN";
  image?: FileList;
};

type UserModalProps = {
  isOpen: boolean;
  onClose: () => void;
  user?: UserModel | null;
};

export default function UserModal({
  isOpen,
  onClose,
  user,
}: UserModalProps) {
  const { updateUser, isUpdating } = useUserMutations();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
    setValue,
  } = useForm<UserFormData>({
    defaultValues: {
      name: user?.name || "",
      phoneNumber: user?.phoneNumber || "",
      role: user?.role || "USER",
    },
  });

  useEffect(() => {
    if (user) {
      setValue("name", user.name);
      setValue("phoneNumber", user.phoneNumber);
      setValue("role", user.role);
    } else {
      reset();
    }
  }, [user, setValue, reset]);

  const onSubmit = (data: UserFormData) => {
    if (!user?.id) return;

    const formData = new FormData();
    formData.append("name", data.name);
    formData.append("phoneNumber", data.phoneNumber);
    formData.append("role", data.role);
    if (data.image && data.image[0]) {
      formData.append("image", data.image[0]);
    }

    updateUser({ id: user.id, formData });
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
              Edit User
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
                  placeholder="User name"
                />
                {errors.name && (
                  <p className="text-red-500 text-xs italic">
                    {errors.name.message}
                  </p>
                )}
              </div>

              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2 dark:text-gray-300">
                  Phone Number
                </label>
                <input
                  {...register("phoneNumber", {
                    required: "Phone number is required",
                  })}
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                  type="text"
                  placeholder="Phone number"
                />
                {errors.phoneNumber && (
                  <p className="text-red-500 text-xs italic">
                    {errors.phoneNumber.message}
                  </p>
                )}
              </div>

              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2 dark:text-gray-300">
                  Role
                </label>
                <select
                  {...register("role", { required: "Role is required" })}
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                >
                  <option value="USER">User</option>
                  <option value="ADMIN">Admin</option>
                </select>
                {errors.role && (
                  <p className="text-red-500 text-xs italic">
                    {errors.role.message}
                  </p>
                )}
              </div>

              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2 dark:text-gray-300">
                  Change Profile Picture
                </label>
                <input
                  {...register("image")}
                  className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
                  type="file"
                  accept="image/*"
                />
              </div>

              {user?.imageUrl && (
                <div className="mb-4">
                  <label className="block text-gray-700 text-sm font-bold mb-2 dark:text-gray-300">
                    Current Profile Picture
                  </label>
                  <img
                    src={user.imageUrl}
                    alt="Current profile"
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
                  disabled={isUpdating}
                  className="px-4 py-2 text-sm font-medium text-white bg-blue-500 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50"
                >
                  {isUpdating ? "Updating..." : "Update"}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}