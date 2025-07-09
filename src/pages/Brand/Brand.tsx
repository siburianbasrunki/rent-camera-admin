import { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableRow,
} from "../../components/ui/table";
import { useBrand } from "../../hooks/brand";
import { CardSkeleton } from "../../components/ui/skeleton/Skeleton";
import { Brand } from "../../model/brand";
import BrandModal from "./modal/BrandModal";
import BrandDeleteConfirmationModal from "./modal/DeleteConfirmationBrand";

export default function BrandView() {
  const { data: brand, isLoading } = useBrand();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [selectedBrand, setSelectedBrand] = useState<Brand | null>(null);
  const [modalMode, setModalMode] = useState<"create" | "update">("create");

  const handleEdit = (brand: Brand) => {
    setSelectedBrand(brand);
    setModalMode("update");
    setIsModalOpen(true);
  };

  const handleDelete = (brand: Brand) => {
    setSelectedBrand(brand);
    setIsDeleteModalOpen(true);
  };

  const handleAddBrand = () => {
    setSelectedBrand(null);
    setModalMode("create");
    setIsModalOpen(true);
  };

  return (
    <div className="overflow-hidden rounded-lg border border-gray-200 bg-white shadow-sm dark:border-gray-800 dark:bg-gray-900 px-4 pb-6 pt-5 sm:px-6">
      <div className="mb-6 flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
        <div>
          <h3 className="text-lg font-semibold leading-6 text-gray-900 dark:text-white">
            Brand List
          </h3>
          <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
            Total {brand?.length || 0} brands available
          </p>
        </div>
        <button
          className="inline-flex items-center gap-x-1.5 rounded-md bg-blue-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-blue-500 focus-visible:outline focus-visible:outline-offset-2 focus-visible:outline-blue-600"
          onClick={handleAddBrand}
        >
          <svg className="-ml-0.5 h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
            <path d="M10.75 4.75a.75.75 0 00-1.5 0v4.5h-4.5a.75.75 0 000 1.5h4.5v4.5a.75.75 0 001.5 0v-4.5h4.5a.75.75 0 000-1.5h-4.5v-4.5z" />
          </svg>
          Add Brand
        </button>
      </div>

      <div className="w-full overflow-x-auto rounded-lg border border-gray-200 dark:border-gray-800">
        <Table className="min-w-full">
          <TableHeader className="bg-gray-50 dark:bg-gray-800/50">
            <TableRow>
              <TableCell
                isHeader
                className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 dark:text-white sm:pl-6"
              >
                Brand
              </TableCell>
              <TableCell
                isHeader
                className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900 dark:text-white"
              >
                Logo
              </TableCell>
              <TableCell
                isHeader
                className="relative py-3.5 pl-3 pr-4 sm:pr-6"
              >
                <span className="sr-only">Actions</span>
              </TableCell>
            </TableRow>
          </TableHeader>
          {isLoading ? (
            <CardSkeleton height="h-[200px]" />
          ) : (
            <TableBody className="divide-y divide-gray-200 dark:divide-gray-800">
              {brand?.map((item) => (
                <TableRow key={item.id} className="hover:bg-gray-50 dark:hover:bg-gray-800/30">
                  <TableCell className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 dark:text-white sm:pl-6">
                    {item.name}
                  </TableCell>

                  <TableCell className="whitespace-nowrap px-3 py-4 text-sm">
                    <div className="flex items-center">
                      <div className="h-12 w-12 flex-shrink-0">
                        <img
                          src={item.imageUrl}
                          alt={item.name}
                          className="h-full w-full object-contain"
                        />
                      </div>
                    </div>
                  </TableCell>

                  <TableCell className="relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-6">
                    <div className="flex items-center justify-end gap-3">
                      <button
                        onClick={() => handleEdit(item)}
                        className="text-blue-600 hover:text-blue-900 dark:text-blue-400 dark:hover:text-blue-300"
                      >
                        Edit
                      </button>
                      <span className="text-gray-300 dark:text-gray-600">|</span>
                      <button
                        onClick={() => handleDelete(item)}
                        className="text-red-600 hover:text-red-900 dark:text-red-400 dark:hover:text-red-300"
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

      <BrandModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        brand={selectedBrand}
        mode={modalMode}
      />

      <BrandDeleteConfirmationModal
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        brandId={selectedBrand?.id}
      />
    </div>
  );
}