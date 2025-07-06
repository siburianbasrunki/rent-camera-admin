import { Navigate, useLocation } from "react-router-dom";
import type { JSX } from "react";
import { useAuth } from "../../context/AuthContext";

export const ProtectedRoute = ({ children }: { children: JSX.Element }) => {
  const { token } = useAuth();
  const location = useLocation();

  if (!token) {
    return <Navigate to="/signin" state={{ from: location }} replace />;
  }

  return children;
};
