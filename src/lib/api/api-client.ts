import Axios, { InternalAxiosRequestConfig } from "axios";

const COOKIE_AUTH = "auth-token";

function authRequestInterceptor(config: InternalAxiosRequestConfig) {
  if (config.headers) {
    config.headers.Accept = "application/json";

    const token = getCookieValue(COOKIE_AUTH);
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
  }

  config.withCredentials = true;
  return config;
}

function getCookieValue(name: string): string | null {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) {
    return parts.pop()?.split(";").shift() || null;
  }
  return null;
}

export const api = Axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
});

api.interceptors.request.use(authRequestInterceptor);
api.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    const message = error.response?.data?.message || error.message;
    console.error(message);

    if (error.response?.status === 401) {
      document.cookie = `${COOKIE_AUTH}=; expires=Thu, 01 Jan 1970 00:00:01 GMT; path=/`;

      window.location.href = `/auth/sign-in`;
    }

    return Promise.reject(error);
  }
);
