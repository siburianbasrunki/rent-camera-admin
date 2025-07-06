import { useAllBooking } from "../../hooks/booking";
import {
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableRow,
} from "../../components/ui/table";
import { CardSkeleton } from "../../components/ui/skeleton/Skeleton";
import { formatDate, formatRupiah } from "../../helper/formatter";
import {
  getPaymentStatusBadge,
  getStatusBadge,
} from "../../helper/statusBadges";
import { useNavigate } from "react-router";

export const BookingView = () => {
  const { data: bookings, isLoading } = useAllBooking();
  const navigate = useNavigate();

  return (
    <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white px-4 pb-3 pt-4 dark:border-gray-800 dark:bg-white/[0.03] sm:px-6">
      <div className="flex flex-col gap-2 mb-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex flex-col justify-between w-full">
          <h3 className="text-xl font-semibold text-gray-800 dark:text-white/90">
            Booking List
          </h3>
          <div className="flex flex-row gap-2 items-center justify-between w-full">
            <p className="text-sm font-medium text-gray-800 dark:text-white/90">
              Total Bookings: {bookings?.length}
            </p>
          </div>
        </div>
      </div>

      {/* Desktop Table (shown on md screens and up) */}
      <div className="hidden md:block w-full overflow-x-auto">
        <Table className="min-w-[900px] w-full">
          <TableHeader className="border-y border-gray-100 dark:border-gray-800">
            <TableRow>
              <TableCell isHeader className="py-3 font-medium text-start">
                Customer
              </TableCell>
              <TableCell isHeader className="py-3 font-medium text-start">
                Camera
              </TableCell>
              <TableCell isHeader className="py-3 font-medium text-start">
                Booking Date
              </TableCell>
              <TableCell isHeader className="py-3 font-medium text-start">
                Duration
              </TableCell>
              <TableCell isHeader className="py-3 font-medium text-start">
                Total Price
              </TableCell>
              <TableCell isHeader className="py-3 font-medium text-start">
                Booking Status
              </TableCell>
              <TableCell isHeader className="py-3 font-medium text-start">
                Payment Status
              </TableCell>
              <TableCell isHeader className="py-3 font-medium text-start">
                Actions
              </TableCell>
            </TableRow>
          </TableHeader>
          {isLoading ? (
            <CardSkeleton height="h-[200px]" />
          ) : (
            <TableBody className="divide-y divide-gray-100 dark:divide-gray-800">
              {bookings?.map((booking) => (
                <TableRow key={booking.id}>
                  <TableCell>
                    <div className="flex flex-col">
                      <span className="font-medium">{booking.user.name}</span>
                      <span className="text-sm text-gray-500">
                        {booking.user.email}
                      </span>
                      <span className="text-sm text-gray-500">
                        {booking.user.phoneNumber}
                      </span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <img
                        src={booking.camera.imageUrl}
                        alt={booking.camera.name}
                        className="w-10 h-10 rounded object-cover"
                      />
                      <div>
                        <span className="font-medium block">
                          {booking.camera.name}
                        </span>
                        <span className="text-sm text-gray-500">
                          {formatRupiah(booking.totalPrice)}
                        </span>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>{formatDate(booking.date)}</TableCell>
                  <TableCell>{booking.duration} day(s)</TableCell>
                  <TableCell>
                    {formatRupiah(booking.totalPrice)}
                  </TableCell>
                  <TableCell>{getStatusBadge(booking.status)}</TableCell>
                  <TableCell>
                    {booking.payment ? getPaymentStatusBadge(booking.payment.status) : 'N/A'}
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <button className="text-blue-500 hover:text-blue-700 text-sm" onClick={() => navigate(`/booking/${booking.id}`)}>
                        View
                      </button>
                      
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          )}
        </Table>
      </div>

      {/* Mobile Cards (shown on screens smaller than md) */}
      <div className="md:hidden space-y-4">
        {isLoading ? (
          <CardSkeleton height="h-[200px]" />
        ) : (
          bookings?.map((booking) => (
            <div
              key={booking.id}
              className="p-4 border border-gray-200 rounded-lg dark:border-gray-800"
            >
              <div className="flex justify-between items-start">
                <div className="flex items-center gap-3 mb-3">
                  <img
                    src={booking.camera.imageUrl}
                    alt={booking.camera.name}
                    className="w-12 h-12 rounded object-cover"
                  />
                  <div>
                    <h4 className="font-medium">{booking.camera.name}</h4>
                    <p className="text-sm text-gray-500">
                      {formatRupiah(booking.totalPrice)}
                    </p>
                  </div>
                </div>
                <div className="flex flex-col items-end gap-2">
                  {getStatusBadge(booking.status)}
                  {booking.payment ? getPaymentStatusBadge(booking.payment.status) : 'N/A'}
                </div>
              </div>

              <div className="grid grid-cols-2 gap-2 mt-3 text-sm">
                <div>
                  <p className="text-gray-500">Customer</p>
                  <p className="font-medium">{booking.user.name}</p>
                </div>
                <div>
                  <p className="text-gray-500">Date</p>
                  <p>{formatDate(booking.date)}</p>
                </div>
                <div>
                  <p className="text-gray-500">Duration</p>
                  <p>{booking.duration} day(s)</p>
                </div>
                <div>
                  <p className="text-gray-500">Contact</p>
                  <p>{booking.user.phoneNumber}</p>
                </div>
              </div>

              <div className="flex justify-end gap-2 mt-3">
                <button className="text-blue-500 hover:text-blue-700 text-sm px-3 py-1 border border-blue-500 rounded">
                  View
                </button>
                <button className="text-red-500 hover:text-red-700 text-sm px-3 py-1 border border-red-500 rounded">
                  Cancel
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};