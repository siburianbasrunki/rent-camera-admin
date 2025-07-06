import { useState } from "react";
import Badge from "../../components/ui/badge/Badge";
import { CardSkeleton } from "../../components/ui/skeleton/Skeleton";
import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { IoMdDocument } from "react-icons/io";
import {
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableRow,
} from "../../components/ui/table";
import { useCamera } from "../../hooks/camera";
import { Camera, DetailCamera } from "../../model/camera";
import CameraService from "../../service/camera";
import CameraModal from "./modal/CameraModal";
import DeleteConfirmationModal from "./modal/DeleteConfirmationModal";
import { useNavigate } from "react-router";
import { formatRupiah } from "../../helper/formatter";

export default function CameraView() {
  const { data: camera, isLoading } = useCamera();
  const navigate = useNavigate();
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [selectedCamera, setSelectedCamera] = useState<DetailCamera | null>(
    null
  );
  const [cameraToDelete, setCameraToDelete] = useState<string | undefined>();

  const handleEdit = (camera: Camera) => {
    // Fetch full camera details including features
    CameraService.getCameraById(camera.id)
      .then((detail) => {
        setSelectedCamera(detail);
      })
      .catch((error) => {
        console.error("Error fetching camera details:", error);
      });
  };

  const handleDelete = (cameraId: string) => {
    setCameraToDelete(cameraId);
    setIsDeleteModalOpen(true);
  };

  return (
    <>
      <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white px-4 pb-3 pt-4 dark:border-gray-800 dark:bg-white/[0.03] sm:px-6">
        <div className="flex flex-col gap-2 mb-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex flex-col justify-between w-full">
            <h3 className="text-xl font-semibold text-gray-800 dark:text-white/90">
              List Camera
            </h3>
            <div className="flex flex-row gap-2 items-center justify-between w-full">
              <h3 className="text-sm font-medium text-gray-800 dark:text-white/90">
                Total Data : {camera?.length}
              </h3>
              <button
                className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors"
                onClick={() => setIsCreateModalOpen(true)}
              >
                Tambah Camera
              </button>
            </div>
          </div>
        </div>
        <div className="max-w-full overflow-x-auto">
          <Table className="min-w-full">
            {/* Table Header */}
            <TableHeader className="border-gray-100 dark:border-gray-800 border-y">
              <TableRow>
                <TableCell
                  isHeader
                  className="py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
                >
                  Products
                </TableCell>
                <TableCell
                  isHeader
                  className="py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
                >
                  Brand
                </TableCell>
                <TableCell
                  isHeader
                  className="py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
                >
                  Price
                </TableCell>
                <TableCell
                  isHeader
                  className="py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
                >
                  Avaliable
                </TableCell>
                <TableCell
                  isHeader
                  className="py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
                >
                  Action
                </TableCell>
              </TableRow>
            </TableHeader>

            {/* Table Body */}

            {isLoading ? (
              <CardSkeleton height="h-[200px]" />
            ) : (
              <TableBody className="divide-y divide-gray-100 dark:divide-gray-800">
                {camera?.map((product) => (
                  <TableRow key={product.id} className="">
                    <TableCell className="py-3 ">
                      <div className="flex items-center gap-3">
                        <div className="h-[150px] w-[150px] overflow-hidden rounded-md">
                          <img
                            src={product.imageUrl}
                            className="h-[150px] w-[150px] object-cover"
                            alt={product.name}
                          />
                        </div>

                        <div>
                          <p className="font-medium text-gray-800 text-theme-sm dark:text-white/90">
                            {product.name}
                          </p>
                          <span className="text-gray-500 text-theme-xs dark:text-gray-400">
                            {product.brand.name}
                          </span>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell className="py-3 text-gray-500 text-theme-sm dark:text-gray-400">
                      {product.brand.name}
                    </TableCell>
                    <TableCell className="py-3 text-gray-500 text-theme-sm dark:text-gray-400">
                      {formatRupiah(Number(product.price))}
                    </TableCell>
                    <TableCell className="py-3 text-gray-500 text-theme-sm dark:text-gray-400">
                      <Badge
                        border
                        size="sm"
                        color={
                          product.avaliable
                            ? "success"
                            : product.avaliable
                            ? "warning"
                            : "error"
                        }
                      >
                        {product.avaliable ? "Available" : "Not Available"}
                      </Badge>
                    </TableCell>
                    <TableCell className="py-3 text-gray-500 text-theme-sm dark:text-gray-400">
                      <div className="flex items-start gap-2">
                        <button
                          className="text-blue-500 hover:text-blue-700"
                          onClick={() => handleEdit(product)}
                        >
                          <FaEdit size={20}/>
                        </button>
                        <button
                          className="text-red-500 hover:text-red-700"
                          onClick={() => handleDelete(product.id)}
                        >
                          <MdDelete size={20}/>
                        </button>
                        <button
                          className="text-green-500 hover:text-green-700"
                          onClick={() => navigate(product.id)}
                        >
                          <IoMdDocument size={20}/>
                        </button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            )}
          </Table>
        </div>
      </div>
      <CameraModal
        isOpen={isCreateModalOpen || !!selectedCamera}
        onClose={() => {
          setIsCreateModalOpen(false);
          setSelectedCamera(null);
        }}
        camera={selectedCamera}
        mode={selectedCamera ? "update" : "create"}
      />

      <DeleteConfirmationModal
        isOpen={isDeleteModalOpen}
        onClose={() => {
          setIsDeleteModalOpen(false);
          setCameraToDelete(undefined);
        }}
        cameraId={cameraToDelete}
      />
    </>
  );
}
