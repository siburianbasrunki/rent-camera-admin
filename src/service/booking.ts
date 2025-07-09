import { getEndpoints } from "../config/config";
import { BookingModel, DetailBookingModel } from "../model/booking";

const BookingService = {
  async getAllBookings(token: string): Promise<BookingModel[]> {
    const { booking } = getEndpoints();
    const res = await fetch(booking.allBookings, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });

    if (!res.ok) {
      const errorData = await res.json();
      throw new Error(errorData.message || "Failed to fetch bookings");
    }

    const json = await res.json();
    return json.data || [];
  },
  async getRecentBooking(token: string): Promise<BookingModel[]> {
    const { booking } = getEndpoints();
    const res = await fetch(booking.getRecent, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });

    if (!res.ok) {
      const errorData = await res.json();
      throw new Error(errorData.message || "Failed to fetch bookings");
    }

    const json = await res.json();
    return json.data || [];
  },
  async getBookingById(id: string, token: string): Promise<DetailBookingModel> {
    const { booking } = getEndpoints();
    const res = await fetch(`${booking.base}/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });

    if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
    const json = await res.json();
    return json.data;
  },
};

export default BookingService;
