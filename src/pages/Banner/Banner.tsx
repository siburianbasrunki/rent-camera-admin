import { useState } from "react";
import { useBanner, useUpdateBanner } from "../../hooks/banner";
import { CardSkeleton } from "../../components/ui/skeleton/Skeleton";

export const BannerView = () => {
  const { data: banner, isLoading } = useBanner();
  const { mutate: updateBanner, isPending } = useUpdateBanner();
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState<{
    title: string;
    subTitle: string;
    event: string;
    image: File | null;
  }>({
    title: "",
    subTitle: "",
    event: "",
    image: null,
  });

  const [previewImage, setPreviewImage] = useState(banner?.imageUrl || "");

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setFormData((prev) => ({ ...prev, image: file }));
      setPreviewImage(URL.createObjectURL(file));
    }
  };

  const handleSubmit = () => {
    const form = new FormData();
    form.append("title", formData.title || banner?.title || "");
    form.append("subTitle", formData.subTitle || banner?.subTitle || "");
    form.append("event", formData.event || banner?.event || "");

    // Only append image if a new one was selected
    if (formData.image) {
      form.append("image", formData.image);
    }

    updateBanner(form, {
      onSuccess: () => {
        setIsEditing(false);
      },
    });
  };

  return (
    <div className="p-6 bg-white dark:bg-gray-900 rounded-2xl shadow-md">
      <h1 className="text-2xl font-bold text-gray-800 dark:text-white mb-6">
        Setting Banner / Main Image
      </h1>
      {isLoading ? (
        <CardSkeleton height="h-[200px]" />
      ) : (
        <div className="flex flex-col sm:flex-row gap-6 items-start">
          {isEditing ? (
            <div className="relative w-full sm:w-[400px]">
              <img
                src={previewImage}
                alt={formData.title || banner?.title || ""}
                height={200}
                width={400}
                className="rounded-xl shadow-lg w-full h-auto object-cover border border-gray-200 dark:border-gray-700 mb-2"
              />
              <input
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
              />
              <div className="text-sm text-center text-gray-500 dark:text-gray-400 mt-1">
                Click to change image
              </div>
            </div>
          ) : (
            <img
              src={banner?.imageUrl}
              alt={banner?.title}
              height={200}
              width={400}
              className="rounded-xl shadow-lg w-full sm:w-[400px] h-auto object-cover border border-gray-200 dark:border-gray-700"
            />
          )}

          <div className="flex flex-col gap-4 flex-1">
            {isEditing ? (
              <>
                <div>
                  <label className="text-lg font-semibold text-gray-700 dark:text-white mb-1 block">
                    Title
                  </label>
                  <input
                    type="text"
                    name="title"
                    value={formData.title}
                    onChange={handleInputChange}
                    placeholder={banner?.title}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-700 dark:text-white"
                  />
                </div>

                <div>
                  <label className="text-lg font-semibold text-gray-700 dark:text-white mb-1 block">
                    Subtitle
                  </label>
                  <input
                    type="text"
                    name="subTitle"
                    value={formData.subTitle}
                    onChange={handleInputChange}
                    placeholder={banner?.subTitle}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-700 dark:text-white"
                  />
                </div>

                <div>
                  <label className="text-lg font-semibold text-gray-700 dark:text-white mb-1 block">
                    Event
                  </label>
                  <input
                    type="text"
                    name="event"
                    value={formData.event}
                    onChange={handleInputChange}
                    placeholder={banner?.event}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-700 dark:text-white"
                  />
                </div>
              </>
            ) : (
              <>
                <div>
                  <h2 className="text-lg font-semibold text-gray-700 dark:text-white">
                    Title
                  </h2>
                  <p className="text-gray-600 dark:text-gray-300">
                    {banner?.title}
                  </p>
                </div>

                <div>
                  <h2 className="text-lg font-semibold text-gray-700 dark:text-white">
                    Subtitle
                  </h2>
                  <p className="text-gray-600 dark:text-gray-300">
                    {banner?.subTitle}
                  </p>
                </div>

                <div>
                  <h2 className="text-lg font-semibold text-gray-700 dark:text-white">
                    Event
                  </h2>
                  <p className="text-gray-600 dark:text-gray-300">
                    {banner?.event}
                  </p>
                </div>
              </>
            )}

            <div className="flex gap-4">
              {isEditing ? (
                <>
                  <button
                    onClick={handleSubmit}
                    disabled={isPending}
                    className="mt-2 px-5 py-2.5 bg-green-600 hover:bg-green-700 text-white text-sm font-medium rounded-lg shadow transition duration-200 disabled:opacity-50"
                  >
                    {isPending ? "Saving..." : "Save"}
                  </button>
                  <button
                    onClick={() => setIsEditing(false)}
                    disabled={isPending}
                    className="mt-2 px-5 py-2.5 bg-gray-600 hover:bg-gray-700 text-white text-sm font-medium rounded-lg shadow transition duration-200 disabled:opacity-50"
                  >
                    Cancel
                  </button>
                </>
              ) : (
                <button
                  onClick={() => {
                    setIsEditing(true);
                    setFormData({
                      title: banner?.title || "",
                      subTitle: banner?.subTitle || "",
                      event: banner?.event || "",
                      image: null,
                    });
                    setPreviewImage(banner?.imageUrl || "");
                  }}
                  className="mt-2 px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium rounded-lg shadow transition duration-200"
                >
                  Update
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};