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
    <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white px-4 pb-3 pt-4 dark:border-gray-800 dark:bg-white/[0.03] sm:px-6">
      <div className="flex flex-col gap-2 mb-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex flex-col justify-between w-full">
          <h3 className="text-xl font-semibold text-gray-800 dark:text-white/90">
            List Brand
          </h3>
          <div className="flex flex-row gap-2 items-center justify-between w-full">
            <h3 className="text-sm font-medium text-gray-800 dark:text-white/90">
              Total Data : {brand?.length}
            </h3>
            <button 
              className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors"
              onClick={handleAddBrand}
            >
              Add Brand
            </button>
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
                Brand
              </TableCell>
              <TableCell
                isHeader
                className="py-3 font-medium text-start text-gray-500 text-theme-xs dark:text-gray-400"
              >
                Image/Logo
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
              {brand?.map((item) => (
                <TableRow key={item.id}>
                  <TableCell className="py-3 text-gray-500 text-theme-sm dark:text-gray-400">
                    {item.name}
                  </TableCell>

                  <TableCell className="py-2">
                    <div className="flex items-center gap-3">
                      <div className="w-[100px] sm:w-[120px] max-w-full h-auto rounded-md overflow-hidden">
                        <img
                          src={item.imageUrl}
                          alt={item.name}
                          className="w-full h-[80px] object-contain sm:object-cover"
                        />
                      </div>
                    </div>
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