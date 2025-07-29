import React, { useState } from "react";
import { BrowserRouter } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { queryConfig } from "@/lib/api/query-client";
import { ThemeProvider } from "@/shared/context/theme-context";
import { AuthProvider } from "@/shared/context/auth-context";
import { CookiesProvider } from "react-cookie";
import { HelmetProvider } from "react-helmet-async";
import { ErrorBoundary } from "react-error-boundary";
import { ErrorFallback } from "@/shared/components/ErrorFallback";
import LoadingSpinner from "@/shared/components/LoadingSpinner";
import { ConfirmationProvider } from "@/components/ui/alert/PopUp";

export const AppProviders = ({ children }: { children: React.ReactNode }) => {
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: queryConfig,
      })
  );

  return (
    <BrowserRouter>
      <React.Suspense fallback={<LoadingSpinner />}>
        <ErrorBoundary FallbackComponent={ErrorFallback}>
          <HelmetProvider>
            <QueryClientProvider client={queryClient}>
              <ThemeProvider>
                <ConfirmationProvider>
                  <CookiesProvider
                    defaultSetOptions={{
                      path: "/",
                      maxAge: 604800,
                    }}
                  >
                    <AuthProvider>{children}</AuthProvider>
                  </CookiesProvider>
                </ConfirmationProvider>
              </ThemeProvider>
            </QueryClientProvider>
          </HelmetProvider>
        </ErrorBoundary>
      </React.Suspense>
    </BrowserRouter>
  );
};
