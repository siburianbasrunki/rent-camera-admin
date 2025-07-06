export function getEndpoints() {
  const BASE_URL = import.meta.env.VITE_API_BASE_URL;
  return {
    brand: `${BASE_URL}/brands`,
    camera: `${BASE_URL}/cameras`,
    banner: `${BASE_URL}/banner`,
    auth: `${BASE_URL}/auth`,
    user: `${BASE_URL}/users`,
    regiter: `${BASE_URL}/auth/register`,
    booking: {
      base: `${BASE_URL}/booking`,
      allBookings: `${BASE_URL}/booking/admin/all`,
      getRecent: `${BASE_URL}/booking/admin/newest`,
      
    }
  };
}
