import { lazy } from "react";
import { Navigate, Route, Routes } from "react-router";

import { GuardedRoute } from "@/shared/components/GuardedRoute";
import NotFound from "@/shared/components/NotFound";
import SignIn from "@/features/auth/pages/SignIn";
import SignUp from "@/features/auth/pages/SignUp";

import { paths } from "@/shared/config/path";
import VerifyOTP from "@/features/auth/pages/VerifyOTP";
import AppLayout from "@/layout/AppLayout";

const Home = lazy(() => import("@/pages/Dashboard/Home"));

export const AppRouter = () => {
  return (
    <Routes>
      {/* Route Redirector */}
      <Route
        index
        element={<Navigate to={paths.auth.signin.getHref()} replace />}
      />

      {/* Public Routes */}
      <Route
        path={paths.auth.signin.getHref()}
        element={
          <GuardedRoute requireAuth={false}>
            <SignIn />
          </GuardedRoute>
        }
      />
      <Route
        path={paths.auth.signup.getHref()}
        element={
          <GuardedRoute requireAuth={false}>
            <SignUp />
          </GuardedRoute>
        }
      />

      <Route
        path={paths.auth.verifyOTP.getHref()}
        element={
          <GuardedRoute requireAuth={false}>
            <VerifyOTP />
          </GuardedRoute>
        }
      />

      {/* Protected Routes */}
      <Route element={<AppLayout />}>
        <Route
          path={paths.dashboard.seller.getHref()}
          element={
            <GuardedRoute requireAuth={true}>
              <Home />
            </GuardedRoute>
          }
        />
      </Route>

      {/* 404 */}
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};
