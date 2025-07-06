import { useParams } from "react-router";
import { useBookingById } from "../../hooks/booking";
import { formatDate, formatRupiah } from "../../helper/formatter";
import { getPaymentStatusBadge } from "../../helper/statusBadges";

export const DetailBooking = () => {
  const { id } = useParams();
  const { data: booking, isLoading } = useBookingById(id || "");

  if (isLoading) return <div>Loading...</div>;
  if (!booking) return <div>Booking not found</div>;

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-md dark:bg-gray-800">
      <h1 className="text-2xl font-bold mb-6 text-gray-800 dark:text-white">
        Booking Details
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <div className="bg-gray-50 p-4 rounded-lg dark:bg-gray-700">
          <h2 className="text-lg font-semibold mb-4 text-gray-800 dark:text-white">
            Camera Information
          </h2>
          <div className="flex items-start gap-4">
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
                Price: {formatRupiah(Number(booking.camera.price) )}
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
              <span className="font-medium">Booking Date:</span> {formatDate(booking.date)}
            </p>
            <p className="text-gray-600 dark:text-gray-300">
              <span className="font-medium">Duration:</span> {booking.duration} day(s)
            </p>
            <p className="text-gray-600 dark:text-gray-300">
              <span className="font-medium">Purpose:</span> {booking.purpose}
            </p>
            <p className="text-gray-600 dark:text-gray-300">
              <span className="font-medium">Total Price:</span> {formatRupiah(booking.totalPrice)}
            </p>
            <p className="text-gray-600 dark:text-gray-300">
              <span className="font-medium">Booking Status:</span> {getPaymentStatusBadge(booking.status)}
            </p>
          </div>
        </div>
      </div>

      {/* Payment Details */}
      <div className="bg-gray-50 p-4 rounded-lg dark:bg-gray-700">
        <h2 className="text-lg font-semibold mb-4 text-gray-800 dark:text-white">
          Payment Details
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <p className="text-gray-600 dark:text-gray-300">
              <span className="font-medium">Payment Method:</span> {booking.payment.paymentMethod.replace("_", " ")}
            </p>
            <p className="text-gray-600 dark:text-gray-300">
              <span className="font-medium">Amount:</span> {formatRupiah(booking.payment.amount)}
            </p>
            <p className="text-gray-600 dark:text-gray-300">
              <span className="font-medium">Status:</span> {getPaymentStatusBadge(booking.payment.status)}
            </p>
          </div>
          <div>
            
            <p className="text-gray-600 dark:text-gray-300">
              <span className="font-medium">Payment Code:</span> {booking.payment.paymentCode}
            </p>
            <p className="text-gray-600 dark:text-gray-300">
              <span className="font-medium">Payment Date:</span> {formatDate(booking.payment.updatedAt)}
            </p>
          </div>
        </div>
      </div>

      <div className="mt-6 text-sm text-gray-500 dark:text-gray-400">
        <p>Created at: {formatDate(booking.createdAt)}</p>
      </div>
    </div>
  );
};