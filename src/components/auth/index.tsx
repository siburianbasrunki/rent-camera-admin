import { useState } from "react";
import { useNavigate } from "react-router-dom";
import AuthService from "../../service/auth";
import { useAuth } from "../../context/AuthContext";

export const OtpPage = () => {
  const navigate = useNavigate();
  const [otp, setOtp] = useState(["", "", "", ""]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const { email, setToken, setUser,token } = useAuth();
  console.log("token", token);
  
  const handleChange = (index: number, value: string) => {
    if (value && !/^\d+$/.test(value)) return;

    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    // Auto focus to next input
    if (value && index < 3) {
      const nextInput = document.getElementById(`otp-${index + 1}`);
      if (nextInput) nextInput.focus();
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const otpCode = otp.join("");

    if (otpCode.length !== 4) {
      setError("Please enter a valid 4-digit OTP");
      return;
    }

    setLoading(true);
    setError("");

    try {
      const { token, user } = await AuthService.verifyOtp(email, otpCode);
      setToken(token);
      setUser(user);
      navigate("/");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Invalid OTP");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-blue-50 px-4">
      <div className="flex flex-col justify-center flex-1 w-full max-w-md mx-auto">
        <h2 className="text-2xl font-bold text-blue-700 text-center mb-6">
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
                  id={`otp-${index}`}
                  type="text"
                  className="w-full text-center px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="0"
                  maxLength={1}
                  value={digit}
                  onChange={(e) => handleChange(index, e.target.value)}
                  required
                />
              ))}
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 font-semibold disabled:opacity-50"
          >
            {loading ? "Verifying..." : "Verifikasi"}
          </button>
        </form>
      </div>
    </div>
  );
};
