import { useCameraById } from "../../hooks/camera";
import { CardSkeleton } from "../../components/ui/skeleton/Skeleton";
import Badge from "../../components/ui/badge/Badge";
import { useNavigate } from "react-router-dom";

export const DetailCamera = () => {
  const { data: detailCamera, isLoading } = useCameraById();
  const navigate = useNavigate();

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
            <span className="text-3xl font-bold text-gray-800 dark:text-white/90">
              ${detailCamera.price}
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
                    ${detailCamera.price}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    Status
                  </p>
                  <p className="font-medium text-gray-800 dark:text-white/90">
                    {detailCamera.avaliable ? "Available" : "Not Available"}
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
    </div>
  );
};