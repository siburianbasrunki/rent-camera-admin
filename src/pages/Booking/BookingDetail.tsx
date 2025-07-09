import { useNavigate, useParams } from "react-router";
import { useBookingById } from "../../hooks/booking";
import { formatDate, formatRupiah } from "../../helper/formatter";
import { getPaymentStatusBadge } from "../../helper/statusBadges";
import { IoChevronBackOutline } from "react-icons/io5";
export const DetailBooking = () => {
  const { id } = useParams();
  const { data: booking, isLoading } = useBookingById(id || "");
  const navigate = useNavigate();
  if (isLoading) return <div>Loading...</div>;
  if (!booking) return <div>Booking not found</div>;

  return (
    <>
      <div className="flex items-center">
        <IoChevronBackOutline className="" />
        <button onClick={() => navigate("/booking")}>Back</button>
      </div>

      <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-md dark:bg-gray-800">
        <h1 className="text-2xl font-bold mb-6 text-gray-800 dark:text-white">
          Booking Details
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <div className="bg-gray-50 p-4 rounded-lg dark:bg-gray-700">
            <h2 className="text-lg font-semibold mb-4 text-gray-800 dark:text-white">
              Camera Information
            </h2>
            <div className="flex items-center gap-4">
              <img
                src={booking.camera.imageUrl}
                alt={booking.camera.name}
                className="w-24 h-24 object-cover rounded-md"
              />
              <div>
                <h3 className="font-medium text-gray-800 dark:text-white">
                  {booking.camera.name}
                </h3>
                <p className="text-gray-600 dark:text-gray-300">
                  Price: {formatRupiah(Number(booking.camera.price))}
                </p>
              </div>
            </div>
          </div>

          {/* Booking Summary */}
          <div className="bg-gray-50 p-4 rounded-lg dark:bg-gray-700">
            <h2 className="text-lg font-semibold mb-4 text-gray-800 dark:text-white">
              Booking Summary
            </h2>
            <div className="space-y-2">
              <p className="text-gray-600 dark:text-gray-300">
                <span className="font-medium">Booking Date:</span>{" "}
                {`${formatDate(booking.startDate)} - ${formatDate(
                  booking.endDate
                )}`}
              </p>
              <p className="text-gray-600 dark:text-gray-300">
                <span className="font-medium">Duration:</span>{" "}
                {booking.duration} day(s)
              </p>
              <p className="text-gray-600 dark:text-gray-300">
                <span className="font-medium">Purpose:</span> {booking.purpose}
              </p>
              <p className="text-gray-600 dark:text-gray-300">
                <span className="font-medium">Total Price:</span>{" "}
                {formatRupiah(booking.totalPrice)}
              </p>
              <p className="text-gray-600 dark:text-gray-300">
                <span className="font-medium">Booking Status:</span>{" "}
                {getPaymentStatusBadge(booking.status)}
              </p>
            </div>
          </div>
        </div>

        {/* Payment Details - Only show if payment exists */}
        {booking.payment && (
          <div className="bg-gray-50 p-4 rounded-lg dark:bg-gray-700">
            <h2 className="text-lg font-semibold mb-4 text-gray-800 dark:text-white">
              Payment Details
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <p className="text-gray-600 dark:text-gray-300">
                  <span className="font-medium">Payment Method:</span>{" "}
                  {booking.payment.paymentMethod.replace("_", " ")}
                </p>
                <p className="text-gray-600 dark:text-gray-300">
                  <span className="font-medium">Amount:</span>{" "}
                  {formatRupiah(booking.payment.amount)}
                </p>
                <p className="text-gray-600 dark:text-gray-300">
                  <span className="font-medium">Status:</span>{" "}
                  {getPaymentStatusBadge(booking.payment.status)}
                </p>
              </div>
              <div>
                <p className="text-gray-600 dark:text-gray-300">
                  <span className="font-medium">Payment Code:</span>{" "}
                  {booking.payment.paymentCode}
                </p>
                <p className="text-gray-600 dark:text-gray-300">
                  <span className="font-medium">Payment Date:</span>{" "}
                  {formatDate(booking.payment.updatedAt)}
                </p>
              </div>
            </div>
          </div>
        )}
        {/* Customer Identity & Details */}
        <div className="bg-gray-50 p-4 rounded-lg shadow md:flex gap-6 mb-8 mt-10 dark:bg-gray-700">
          {/* Identity image */}
          <div className="md:w-1/3 mb-4 md:mb-0">
            <img
              src={booking.identityProofUrl}
              alt={booking.user.name}
              className="w-full h-40 object-contain rounded-md"
            />
          </div>

          {/* Detail text */}
          <div className="flex-1 space-y-2">
            <h2 className="text-lg font-semibold mb-2 text-gray-800 dark:text-white">
              Customer Details
            </h2>
            <p className="text-gray-600 dark:text-gray-300">
              <span className="font-medium">Name:</span> {booking.user.name}
            </p>
            <p className="text-gray-600 dark:text-gray-300">
              <span className="font-medium">Email:</span> {booking.user.email}
            </p>
            <p className="text-gray-600 dark:text-gray-300">
              <span className="font-medium">Phone:</span>{" "}
              {booking.user.phoneNumber}
            </p>
          </div>
        </div>

        {booking.isReturned && booking.hasReturnProof && (
          <div className="bg-gray-50 p-4 rounded-lg shadow md:flex gap-6 mb-8 mt-10 dark:bg-gray-700">
            {/* Return proof image */}
            <div className="md:w-1/3 mb-4 md:mb-0">
              <img
                src={booking.returnProofUrl || ""}
                alt="Return Proof"
                className="w-full h-40 object-contain rounded-md"
              />
            </div>

            {/* Detail text */}
            <div className="flex-1 space-y-2">
              <h2 className="text-lg font-semibold mb-2 text-gray-800 dark:text-white">
                Return Information
              </h2>
              <p className="text-gray-600 dark:text-gray-300">
                <span className="font-medium">Return Date:</span>{" "}
                {formatDate(booking.returnDate || "")}
              </p>
            </div>
          </div>
        )}

        {!booking.payment && (
          <div className="bg-gray-50 p-4 rounded-lg dark:bg-gray-700">
            <h2 className="text-lg font-semibold mb-4 text-gray-800 dark:text-white">
              Payment Details
            </h2>
            <p className="text-gray-600 dark:text-gray-300">
              No payment information available yet.
            </p>
          </div>
        )}

        <div className="mt-6 text-sm text-gray-500 dark:text-gray-400">
          <p>Created at: {formatDate(booking.createdAt)}</p>
        </div>
      </div>
    </>
  );
};
