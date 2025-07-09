import { useState } from "react";
import { CardSkeleton } from "../../components/ui/skeleton/Skeleton";
import { useUsers } from "../../hooks/user";
import { UserModel } from "../../model/users";
import UserModal from "./modal/UserModal";
import UserDeleteConfirmationModal from "./modal/UserDeleteConfirmationModal";

export default function UserView() {
  const { data: users, isLoading } = useUsers();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState<UserModel | null>(null);

  const handleEdit = (user: UserModel) => {
    setSelectedUser(user);
    setIsModalOpen(true);
  };

  const handleDelete = (user: UserModel) => {
    setSelectedUser(user);
    setIsDeleteModalOpen(true);
  };
  const handleSearch = () => {};

  return (
    <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white px-4 pb-3 pt-4 dark:border-gray-800 dark:bg-white/[0.03] sm:px-6">
      <div className="flex flex-col gap-2 mb-6 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex flex-col justify-between w-full">
          <h3 className="text-xl font-semibold text-gray-800 dark:text-white/90">
            List Users
          </h3>
          <div className="flex flex-row gap-2 items-center justify-between w-full">
            <h3 className="text-sm font-medium text-gray-800 dark:text-white/90">
              Total Data : {users?.length}
            </h3>
            <input
              placeholder="search user"
              style={{
                borderRadius: "10px",
                width: "300px",
                border: "1px solid #ccc",
                padding: "5px",
              }}
              onClick={handleSearch}
            />
          </div>
        </div>
      </div>

      {isLoading ? (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {[...Array(6)].map((_, index) => (
            <CardSkeleton key={index} height="h-[150px]" />
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {users?.map((item) => (
            <div
              key={item.id}
              className="rounded-lg border border-gray-200 bg-white p-4 shadow-sm transition-all hover:shadow-md dark:border-gray-700 dark:bg-gray-800"
            >
              <div className="flex items-start justify-between">
                <div>
                  <h3 className="text-lg font-medium text-gray-800 dark:text-white/90">
                    {item.name}
                  </h3>
                  <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                    {item.email}
                  </p>
                </div>
                <span
                  className={`px-2 py-1 rounded-full text-xs ${
                    item.role === "ADMIN"
                      ? "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200 border border-blue-200 dark:border-blue-800"
                      : "bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300 border border-gray-200 dark:border-gray-600"
                  }`}
                >
                  {item.role}
                </span>
              </div>

              <div className="mt-4 flex justify-end space-x-2">
                <button
                  className="rounded-md px-3 py-1 text-sm text-blue-500 hover:bg-blue-50 hover:text-blue-700 dark:hover:bg-blue-900/30"
                  onClick={() => handleEdit(item)}
                >
                  Edit
                </button>
                <button
                  className="rounded-md px-3 py-1 text-sm text-red-500 hover:bg-red-50 hover:text-red-700 dark:hover:bg-red-900/30"
                  onClick={() => handleDelete(item)}
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      <UserModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        user={selectedUser}
      />

      <UserDeleteConfirmationModal
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        userId={selectedUser?.id}
        userName={selectedUser?.name}
      />
    </div>
  );
}
