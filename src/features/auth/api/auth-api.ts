import { api } from "@/lib/api/api-client";
import { APIResponse, User } from "@/shared/types/api";
import {
  VerifyOTPCredentials,
  VerifyOTPResponse,
  SignInCredentials,
  SignUpCredentials,
} from "../types";

export const authApi = {
  requestOtp: (credentials: SignInCredentials) =>
    api.post<APIResponse<null>>("/auth/send-otp", credentials),

  signup: (credentials: SignUpCredentials) =>
    api.post<APIResponse<null>>("auth/register-seller", credentials),

  verifyOtp: (credentials: VerifyOTPCredentials) =>
    api.post<APIResponse<VerifyOTPResponse>>("/auth/verify-otp", credentials),

  getCurrentUser: () => api.get<APIResponse<User>>("/user"),
};
