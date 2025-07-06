// import { getEndpoints } from "./config";

// export const authFetch = async (url: string, options: RequestInit = {}) => {
//   const token = localStorage.getItem('token');
  
//   const headers = {
//     ...options.headers,
//     'Authorization': `Bearer ${token}`,
//     'Content-Type': 'application/json'
//   };
  
//   const fullUrl = `${getEndpoints().baseUrl}${url}`;
  
//   const response = await fetch(fullUrl, { ...options, headers });
  
//   if (!response.ok) {
//     const errorData = await response.json();
//     throw new Error(errorData.message || 'Request failed');
//   }
  
//   return response.json();
// };