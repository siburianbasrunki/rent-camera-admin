import { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableRow,
} from "../../components/ui/table";
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

  return (
    <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white px-4 pb-3 pt-4 dark:border-gray-800 dark:bg-white/[0.03] sm:px-6">
      <div className="flex flex-col gap-2 mb-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex flex-col justify-between w-full">
          <h3 className="text-xl font-semibold text-gray-800 dark:text-white/90">
            List Users
          </h3>
          <div className="flex flex-row gap-2 items-center justify-between w-full">
            <h3 className="text-sm font-medium text-gray-800 dark:text-white/90">
              Total Data : {users?.length}
            </h3>
          </div>
        </div>
      </div>

      <div className="w-full overflow-x-auto">
        <Table className="min-w-[600px] w-full">
          <TableHeader className="border-y border-gray-100 dark:border-gray-800">
            <TableRow>
              <TableCell
                isHeader
                className="py-3 font-medium text-start text-gray-500 text-theme-xs dark:text-gray-400"
              >
                Name
              </TableCell>
              <TableCell
                isHeader
                className="py-3 font-medium text-start text-gray-500 text-theme-xs dark:text-gray-400"
              >
                Email
              </TableCell>
              <TableCell
                isHeader
                className="py-3 font-medium text-start text-gray-500 text-theme-xs dark:text-gray-400"
              >
                Role
              </TableCell>
              <TableCell
                isHeader
                className="py-3 font-medium text-start text-gray-500 text-theme-xs dark:text-gray-400"
              >
                Action
              </TableCell>
            </TableRow>
          </TableHeader>
          {isLoading ? (
            <CardSkeleton height="h-[200px]" />
          ) : (
            <TableBody className="divide-y divide-gray-100 dark:divide-gray-800">
              {users?.map((item) => (
                <TableRow key={item.id}>
                  <TableCell className="py-3 text-gray-500 text-theme-sm dark:text-gray-400">
                    {item.name}
                  </TableCell>

                  <TableCell className="py-3 text-gray-500 text-theme-sm dark:text-gray-400">
                    {item.email}
                  </TableCell>

                  <TableCell className="py-3 text-gray-500 text-theme-sm dark:text-gray-400">
                    <span className={`px-2 py-1 rounded-full text-xs ${
                      item.role === "ADMIN" 
                        ? "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200 border border-blue-200 dark:border-blue-800" 
                        : "bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300 border border-gray-200 dark:border-gray-600"
                    }`}>
                      {item.role}
                    </span>
                  </TableCell>

                  <TableCell className="py-3 text-gray-500 text-theme-sm dark:text-gray-400">
                    <div className="flex items-center gap-2">
                      <button 
                        className="text-blue-500 hover:text-blue-700"
                        onClick={() => handleEdit(item)}
                      >
                        Edit
                      </button>
                      <button 
                        className="text-red-500 hover:text-red-700"
                        onClick={() => handleDelete(item)}
                      >
                        Delete
                      </button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          )}
        </Table>
      </div>

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