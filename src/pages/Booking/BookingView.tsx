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
    <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white px-4 pb-6 pt-4 shadow-sm dark:border-gray-800 dark:bg-white/[0.03] sm:px-6">
      <div className="mb-6 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex w-full flex-col">
          <h3 className="text-xl font-semibold text-gray-800 dark:text-white/90">
            Booking List
          </h3>
          <p className="text-sm text-gray-500 mt-1">
            Total {bookings?.length} bookings found
          </p>
        </div>
      </div>

      {/* Desktop Table */}
      <div className="hidden w-full overflow-x-auto md:block">
        <Table className="w-full">
          <TableHeader className="border-b border-gray-100 dark:border-gray-800">
            <TableRow className="bg-gray-50 dark:bg-gray-800/50">
              <TableCell isHeader className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 dark:text-white sm:pl-6">
                Customer
              </TableCell>
              <TableCell isHeader className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900 dark:text-white">
                Camera
              </TableCell>
              <TableCell isHeader className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900 dark:text-white">
                Date/Duration
              </TableCell>
              <TableCell isHeader className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900 dark:text-white">
                Amount
              </TableCell>
              <TableCell isHeader className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900 dark:text-white">
                Status
              </TableCell>
              <TableCell isHeader className="relative py-3.5 pl-3 pr-4 sm:pr-6">
                <span className="sr-only">Actions</span>
              </TableCell>
            </TableRow>
          </TableHeader>
          {isLoading ? (
            <CardSkeleton height="h-[200px]" />
          ) : (
            <TableBody className="divide-y divide-gray-100 dark:divide-gray-800">
              {bookings?.map((booking) => (
                <TableRow key={booking.id} className="hover:bg-gray-50 dark:hover:bg-gray-800/30">
                  <TableCell className="whitespace-nowrap py-4 pl-4 pr-3 text-sm sm:pl-6">
                    <div className="flex flex-col">
                      <span className="font-medium text-gray-900 dark:text-white">
                        {booking.user.name}
                      </span>
                      <span className="text-xs text-gray-500">
                        {booking.user.email}
                      </span>
                    </div>
                  </TableCell>
                  <TableCell className="whitespace-nowrap px-3 py-4 text-sm">
                    <div className="flex items-center gap-3">
                      <img
                        src={booking.camera.imageUrl}
                        alt={booking.camera.name}
                        className="h-10 w-10 rounded object-cover"
                      />
                      <div>
                        <span className="font-medium text-gray-900 dark:text-white">
                          {booking.camera.name}
                        </span>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                    <div className="flex flex-col">
                      <span>{formatDate(booking.date)}</span>
                      <span className="text-xs">{booking.duration} day(s)</span>
                    </div>
                  </TableCell>
                  <TableCell className="whitespace-nowrap px-3 py-4 text-sm text-gray-900 dark:text-white">
                    {formatRupiah(booking.totalPrice)}
                  </TableCell>
                  <TableCell className="whitespace-nowrap px-3 py-4 text-sm">
                    <div className="flex flex-col gap-1">
                      {getStatusBadge(booking.status)}
                      {booking.payment && getPaymentStatusBadge(booking.payment.status)}
                    </div>
                  </TableCell>
                  <TableCell className="relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-6">
                    <button
                      onClick={() => navigate(`/booking/${booking.id}`)}
                      className="text-blue-600 hover:text-blue-900 dark:text-blue-400 dark:hover:text-blue-300"
                    >
                      View
                    </button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          )}
        </Table>
      </div>

      {/* Mobile Cards */}
      <div className="space-y-4 md:hidden">
        {isLoading ? (
          <CardSkeleton height="h-[200px]" />
        ) : (
          bookings?.map((booking) => (
            <div
              key={booking.id}
              className="rounded-lg border border-gray-200 p-4 shadow-sm dark:border-gray-800"
            >
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-3">
                  <img
                    src={booking.camera.imageUrl}
                    alt={booking.camera.name}
                    className="h-12 w-12 rounded object-cover"
                  />
                  <div>
                    <h4 className="font-medium text-gray-900 dark:text-white">
                      {booking.camera.name}
                    </h4>
                    <p className="text-sm text-gray-500">
                      {formatRupiah(booking.totalPrice)}
                    </p>
                  </div>
                </div>
                <div className="flex flex-col items-end gap-1">
                  {getStatusBadge(booking.status)}
                  {booking.payment && getPaymentStatusBadge(booking.payment.status)}
                </div>
              </div>

              <div className="mt-4 grid grid-cols-2 gap-3 text-sm">
                <div>
                  <p className="text-xs text-gray-500">Customer</p>
                  <p className="font-medium">{booking.user.name}</p>
                  <p className="text-xs text-gray-500">{booking.user.phoneNumber}</p>
                </div>
                <div>
                  <p className="text-xs text-gray-500">Date/Duration</p>
                  <p>{formatDate(booking.date)}</p>
                  <p className="text-xs">{booking.duration} day(s)</p>
                </div>
              </div>

              <div className="mt-4 flex justify-end gap-2">
                <button
                  onClick={() => navigate(`/booking/${booking.id}`)}
                  className="rounded-md bg-blue-50 px-3 py-1.5 text-sm font-medium text-blue-600 hover:bg-blue-100 dark:bg-blue-900/30 dark:text-blue-400 dark:hover:bg-blue-900/50"
                >
                  View Details
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};