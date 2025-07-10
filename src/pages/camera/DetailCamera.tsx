import {
  useAddCameraPhoto,
  useCameraById,
  useCameraPhotos,
  useDeleteCameraPhoto,
} from "../../hooks/camera";
import { CardSkeleton } from "../../components/ui/skeleton/Skeleton";
import Badge from "../../components/ui/badge/Badge";
import { useNavigate } from "react-router-dom";
import { formatRupiah } from "../../helper/formatter";
import { PiFilePlus, PiPlus } from "react-icons/pi";
import { CiTrash } from "react-icons/ci";
import { useState } from "react";

export const DetailCamera = () => {
  const { data: detailCamera, isLoading } = useCameraById();
  const { data: photos = [] } = useCameraPhotos();
  const { mutate: addPhoto } = useAddCameraPhoto();
  const { mutate: deletePhoto } = useDeleteCameraPhoto();
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const navigate = useNavigate();

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];
      const formData = new FormData();
      formData.append("image", file);
      addPhoto(formData);
    }
  };

  const handleDeletePhoto = (photoId: string) => {
    if (window.confirm("Are you sure you want to delete this photo?")) {
      deletePhoto(photoId);
    }
  };

  if (isLoading) return <CardSkeleton height="h-[500px]" />;

  if (!detailCamera) {
    return (
      <div className="flex flex-col items-center justify-center h-[500px]">
        <h3 className="text-xl font-semibold text-gray-800 dark:text-white/90 mb-4">
          Camera not found
        </h3>
        <button
          onClick={() => navigate(-1)}
          className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors"
        >
          Go Back
        </button>
      </div>
    );
  }

  return (
    <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white px-4 pb-3 pt-4 dark:border-gray-800 dark:bg-white/[0.03] sm:px-6">
      <div className="flex flex-col gap-2 mb-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex flex-col justify-between w-full">
          <div className="flex items-center gap-4 mb-4">
            <button
              onClick={() => navigate(-1)}
              className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M10 19l-7-7m0 0l7-7m-7 7h18"
                />
              </svg>
            </button>
            <h3 className="text-xl font-semibold text-gray-800 dark:text-white/90">
              Camera Details
            </h3>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Image Section */}
        <div className="bg-gray-50 dark:bg-gray-800 rounded-lg overflow-hidden">
          {detailCamera.imageUrl ? (
            <img
              src={detailCamera.imageUrl}
              alt={detailCamera.name}
              className="w-full h-auto max-h-[500px] object-contain"
            />
          ) : (
            <div className="flex items-center justify-center h-64 bg-gray-200 dark:bg-gray-700 text-gray-500 dark:text-gray-400">
              No Image Available
            </div>
          )}
        </div>

        {/* Details Section */}
        <div className="space-y-6">
          <div>
            <h2 className="text-2xl font-bold text-gray-800 dark:text-white/90">
              {detailCamera.name}
            </h2>
            <p className="text-gray-600 dark:text-gray-400">
              by {detailCamera.brand?.name}
            </p>
          </div>

          <div className="flex items-center gap-4">
            <span className="text-2xl font-bold text-gray-800 dark:text-white/90">
              {formatRupiah(Number(detailCamera.price))}/day
            </span>
            <Badge
              border
              size="md"
              color={
                detailCamera.avaliable
                  ? "success"
                  : detailCamera.avaliable
                  ? "warning"
                  : "error"
              }
            >
              {detailCamera.avaliable ? "In Stock" : "Out of Stock"}
            </Badge>
          </div>

          <div className="space-y-4">
            <div>
              <h3 className="text-lg font-semibold text-gray-800 dark:text-white/90 mb-2">
                Specifications
              </h3>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    Brand
                  </p>
                  <p className="font-medium text-gray-800 dark:text-white/90">
                    {detailCamera.brand?.name}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    Model
                  </p>
                  <p className="font-medium text-gray-800 dark:text-white/90">
                    {detailCamera.name}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    Price
                  </p>
                  <p className="font-medium text-gray-800 dark:text-white/90">
                    {formatRupiah(Number(detailCamera.price))}/day
                  </p>
                </div>
                <div>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    Status
                  </p>
                  <p className="font-medium text-gray-800 dark:text-white/90">
                    {detailCamera.avaliable ? "Tersedia" : "Disewa"}
                  </p>
                </div>
              </div>
            </div>

            {detailCamera.ciri_ciri && detailCamera.ciri_ciri.length > 0 && (
              <div>
                <h3 className="text-lg font-semibold text-gray-800 dark:text-white/90 mb-2">
                  Features
                </h3>
                <ul className="list-disc pl-5 space-y-1">
                  {detailCamera.ciri_ciri.map((feature, index) => (
                    <li
                      key={index}
                      className="text-gray-700 dark:text-gray-300"
                    >
                      {feature.ciri}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Image Section */}
        <div className="space-y-4 mt-2">
          

          {/* Additional Photos */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-lg font-semibold text-gray-800 dark:text-white/90">
                Additional Photos
              </h3>
              {photos.length < 5 && (
                <label className="flex items-center gap-1 text-sm text-blue-500 cursor-pointer hover:text-blue-600">
                  <PiPlus />
                  Add Photo
                  <input
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={handleFileChange}
                  />
                </label>
              )}
            </div>

            <div className="grid grid-cols-4 gap-2">
              {/* Main photo thumbnail */}
              <div
                className={`relative h-24 rounded-md overflow-hidden border-2 ${
                  !selectedImage ? "border-blue-500" : "border-transparent"
                }`}
                onClick={() => setSelectedImage(detailCamera.imageUrl)}
              >
                <img
                  src={detailCamera.imageUrl}
                  alt="Main"
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Additional photos */}
              {photos.map((photo: any) => (
                <div
                  key={photo.id}
                  className={`relative h-24 rounded-md overflow-hidden border-2 ${
                    selectedImage === photo.imageUrl
                      ? "border-blue-500"
                      : "border-transparent"
                  }`}
                >
                  <img
                    src={photo.imageUrl}
                    alt={`Photo ${photo.id}`}
                    className="w-full h-full object-cover"
                    onClick={() => setSelectedImage(photo.imageUrl)}
                  />
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleDeletePhoto(photo.id);
                    }}
                    className="absolute top-1 right-1 bg-red-500 text-white p-1 rounded-full hover:bg-red-600"
                  >
                    <CiTrash size={12} />
                  </button>
                </div>
              ))}

              {/* Add photo placeholder */}
              {photos.length < 4 && (
                <label className="flex items-center justify-center h-24 border-2 border-dashed border-gray-300 rounded-md cursor-pointer hover:border-blue-500">
                  <PiFilePlus className="text-gray-400" />
                  <input
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={handleFileChange}
                  />
                </label>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
