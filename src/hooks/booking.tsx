// src/hooks/booking.ts
import { useQuery } from "@tanstack/react-query";
import BookingService from "../service/booking";
import { useAuth } from "@/shared/context/auth-context";

export const useAllBooking = () => {
  const { token } = useAuth();

  return useQuery({
    queryKey: ["booking"],
    queryFn: () => BookingService.getAllBookings(token || ""),
    enabled: !!token,
    retry: false,
  });
};

export const useGetRecentBooking = () => {
  const { token } = useAuth();

  return useQuery({
    queryKey: ["bookings"],
    queryFn: () => BookingService.getRecentBooking(token || ""),
    enabled: !!token,
    retry: false,
  });
};

export const useBookingById = (id: string) => {
  const { token } = useAuth();

  return useQuery({
    queryKey: ["bookings", id],
    queryFn: () => BookingService.getBookingById(id, token || ""),
    enabled: !!id,
  });
};
