export const paths = {
  home: {
    path: "/",
    getHref: () => "/",
  },

  auth: {
    signup: {
      path: "/auth/sign-up",
      getHref: (redirectTo?: string | null | undefined) =>
        `/auth/sign-up${
          redirectTo ? `?redirectTo=${encodeURIComponent(redirectTo)}` : ""
        }`,
    },
    signin: {
      path: "/auth/sign-in",
      getHref: (redirectTo?: string | null | undefined) =>
        `/auth/sign-in${
          redirectTo ? `?redirectTo=${encodeURIComponent(redirectTo)}` : ""
        }`,
    },
    verifyOTP: {
      path: "/auth/verify-otp",
      getHref: (redirectTo?: string | null | undefined) =>
        `/auth/verify-otp${
          redirectTo ? `?redirectTo=${encodeURIComponent(redirectTo)}` : ""
        }`,
    },
  },

  dashboard: {
    seller: {
      path: "/dashboard/seller",
      getHref: () => "/dashboard/seller",
    },
    admin: {
      path: "/dashboard/admin",
      getHref: () => "/dashboard/admin",
    },
  },
} as const;
