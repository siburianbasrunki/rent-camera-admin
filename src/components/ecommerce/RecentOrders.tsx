import {
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableRow,
} from "../ui/table";
import { useGetRecentBooking } from "../../hooks/booking";
import { formatRupiah } from "../../helper/formatter";
import { getPaymentStatusBadge } from "../../helper/statusBadges";
import { useNavigate } from "react-router";

export default function RecentOrders() {
  const { data: recent } = useGetRecentBooking();
  const navigate = useNavigate();
  
  return (
    <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white px-4 pb-3 pt-4 dark:border-gray-800 dark:bg-white/[0.03] sm:px-6">
      <div className="flex flex-col gap-2 mb-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h3 className="text-lg font-semibold text-gray-800 dark:text-white/90">
            Recent Orders
          </h3>
        </div>
      </div>
      
      {/* Mobile View (Cards) */}
      <div className="sm:hidden space-y-4">
        {recent?.map((product) => (
          <div 
            key={product.id} 
            className="p-4 border border-gray-200 rounded-lg dark:border-gray-700"
            onClick={() => navigate(`/booking/${product.id}`)}
          >
            <div className="flex items-start gap-3">
              <div className="h-[60px] w-[60px] overflow-hidden rounded-md flex-shrink-0">
                <img
                  src={product.camera?.imageUrl || ""}
                  className="h-full w-full object-cover"
                  alt={product.camera?.name || "-"}
                />
              </div>
              <div className="flex-1">
                <p className="font-medium text-gray-800 text-sm dark:text-white/90 mb-1">
                  {product.camera?.name || "-"}
                </p>
                <p className="text-xs text-gray-500 dark:text-gray-400 mb-2">
                  {product.user.name}
                </p>
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium">
                    {formatRupiah(product.payment?.amount || 0)}
                  </span>
                  <div>
                    {product.payment
                      ? getPaymentStatusBadge(product.payment.status)
                      : "N/A"}
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
      
      {/* Desktop View (Table) */}
      <div className="hidden sm:block max-w-full overflow-x-auto">
        <Table>
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
                Customer
              </TableCell>
              <TableCell
                isHeader
                className="py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
              >
                Amount Paid
              </TableCell>
              <TableCell
                isHeader
                className="py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
              >
                Payment Status
              </TableCell>
              <TableCell
                isHeader
                className="py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
              >
                <h1></h1>
              </TableCell>
            </TableRow>
          </TableHeader>

          <TableBody className="divide-y divide-gray-100 dark:divide-gray-800">
            {recent?.map((product) => (
              <TableRow key={product.id} className="hover:bg-gray-50 dark:hover:bg-gray-800/50">
                <TableCell className="py-3">
                  <div className="flex items-center gap-3">
                    <div className="h-[50px] w-[50px] overflow-hidden rounded-md flex-shrink-0">
                      <img
                        src={product.camera?.imageUrl || ""}
                        className="h-full w-full object-cover"
                        alt={product.camera?.name || "-"}
                      />
                    </div>
                    <div>
                      <p className="font-medium text-gray-800 text-theme-sm dark:text-white/90">
                        {product.camera?.name || "-"}
                      </p>
                    </div>
                  </div>
                </TableCell>

                <TableCell className="py-3 text-gray-500 text-theme-sm dark:text-gray-400">
                  <div className="flex flex-col">
                    <span className="font-medium">{product.user.name}</span>
                    <span className="text-sm text-gray-500">
                      {product.user.email}
                    </span>
                    <span className="text-sm text-gray-500">
                      {product.user.phoneNumber}
                    </span>
                  </div>
                </TableCell>
                <TableCell className="py-3 text-gray-500 text-theme-sm dark:text-gray-400">
                  {formatRupiah(product.payment?.amount || 0)}
                </TableCell>
                <TableCell className="py-3 text-gray-500 text-theme-sm dark:text-gray-400">
                  {product.payment
                    ? getPaymentStatusBadge(product.payment.status)
                    : "N/A"}
                </TableCell>
                <TableCell className="py-3 text-gray-500 text-theme-sm dark:text-gray-400">
                  <button
                    className="text-blue-500 hover:text-blue-700 text-sm font-medium"
                    onClick={() => navigate(`/booking/${product.id}`)}
                  >
                    View Details
                  </button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}