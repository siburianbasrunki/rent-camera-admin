import { useState, useRef, useEffect } from "react";
import { useCookies } from "react-cookie";
import { useLocation } from "react-router";

import Button from "@/components/ui/button/Button";

import { authApi } from "../api/auth-api";
import { AUTH_TOKEN_COOKIE } from "@/shared/constant/auth";

export const VerifyOTPForm = () => {
  const location = useLocation();
  const email = location.state?.email;
  const [_cookies, setCookies] = useCookies([AUTH_TOKEN_COOKIE]);
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  const [otp, setOtp] = useState(["", "", "", ""]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (inputRefs.current[0]) {
      inputRefs.current[0].focus();
    }
  }, []);

  const handleChange = (index: number, value: string) => {
    if (value && !/^\d+$/.test(value)) return;

    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    if (value && index < 3) {
      const nextInput = inputRefs.current[index + 1];
      if (nextInput) nextInput.focus();
    }
  };

  const handlePaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
    e.preventDefault();
    const pastedData = e.clipboardData.getData("text/plain").trim();

    if (/^\d{4}$/.test(pastedData)) {
      const pastedOtp = pastedData.split("");
      const newOtp = [...otp];

      pastedOtp.forEach((digit, index) => {
        if (index < 4) {
          newOtp[index] = digit;
        }
      });

      setOtp(newOtp);

      const lastInput = inputRefs.current[Math.min(3, pastedOtp.length - 1)];
      if (lastInput) lastInput.focus();
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    const otpCode = otp.join("");

    if (otpCode.length !== 4) {
      setError("Please enter a valid 4-digit OTP!");
      return;
    }

    if (!email) {
      setError("Please login first!");
      return;
    }

    try {
      const { data } = await authApi.verifyOtp({
        email,
        code: otpCode,
        level: 2,
      });

      const authData = data?.data;
      setCookies(AUTH_TOKEN_COOKIE, authData?.token);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Invalid OTP");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-blue-50 px-4 w-full">
      <div className="flex flex-col justify-center flex-1 w-full max-w-md mx-auto">
        <h2 className="text-2xl font-bold text-rentbq-dark-blue text-center mb-6">
          OTP Verification
        </h2>

        {error && (
          <div className="mb-4 p-2 bg-red-100 text-red-700 rounded-md">
            {error}
          </div>
        )}

        <form className="space-y-5" onSubmit={handleSubmit}>
          <div>
            <p className="text-sm text-gray-600 mb-4 text-center">
              Enter the 4-digit code sent to {email}
            </p>
            <div className="flex space-x-2">
              {otp.map((digit, index) => (
                <input
                  key={index}
                  ref={(el) => {
                    inputRefs.current[index] = el;
                  }}
                  id={`otp-${index}`}
                  type="text"
                  className="w-full text-center px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="0"
                  maxLength={1}
                  value={digit}
                  onChange={(e) => handleChange(index, e.target.value)}
                  onPaste={handlePaste}
                  required
                />
              ))}
            </div>
          </div>

          <Button type="submit" disabled={loading} className="w-full ">
            {loading ? "Verifying..." : "Verifikasi"}
          </Button>
        </form>
      </div>
    </div>
  );
};
