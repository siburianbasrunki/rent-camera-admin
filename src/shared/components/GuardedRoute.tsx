import { Navigate, useLocation } from "react-router";

import LoadingSpinner from "./LoadingSpinner";

import { paths } from "../config/path";
import { useUser } from "../hooks/useUser";

interface GuardedRouteProps {
  children: React.ReactNode;
  requireAuth?: boolean;
  allowedRoles?: Array<string>;
}

export const GuardedRoute = ({
  children,
  requireAuth = true,
  allowedRoles,
}: GuardedRouteProps) => {
  const { data: user, isLoading } = useUser();
  const location = useLocation();
  const userData = user?.data?.data;

  if (isLoading) {
    return <LoadingSpinner />;
  }

  if (requireAuth) {
    if (!userData) {
      return (
        <Navigate to={paths.auth.signin.getHref()} state={{ from: location }} />
      );
    }

    if (userData && !allowedRoles?.includes(userData?.level.toString())) {
      if (userData?.level === 3) {
        <Navigate to={paths.dashboard.admin.getHref()} replace />;
      } else {
        <Navigate to={paths.dashboard.seller.getHref()} replace />;
      }
    }
  } else {
    if (userData) {
      const from = location.state?.from?.pathname || "/dashboard/seller";
      return <Navigate to={from} replace />;
    }
  }

  return <>{children}</>;
};
