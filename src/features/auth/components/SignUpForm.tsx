import { useState } from "react";
import { Link, useNavigate } from "react-router";

import Label from "@/components/form/Label";
import Input from "@/components/form/input/InputField";
import Button from "@/components/ui/button/Button";

import { authApi } from "@/features/auth/api/auth-api";
import { paths } from "@/shared/config/path";

export default function SignUpForm() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    try {
      await authApi.signup({ email, name });
      navigate(paths.auth.signin.getHref());
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to Sign Up");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col flex-1">
      <div className="flex flex-col justify-center flex-1 w-full max-w-md mx-auto">
        <div>
          <div className="mb-5 sm:mb-8">
            <h1 className="mb-2 font-semibold text-gray-800 text-title-sm dark:text-white/90 sm:text-title-md">
              Sign Up
            </h1>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Enter your email and your fullname for join with us.
            </p>
          </div>
          <div>
            <form onSubmit={handleSubmit}>
              <div className="space-y-6">
                <div>
                  {error && (
                    <div className="mb-4 p-2 bg-red-100 text-red-700 rounded-md">
                      {error}
                    </div>
                  )}

                  {/* Email Input */}
                  <div className="space-y-4">
                    <div>
                      <Label>
                        Email <span className="text-error-500">*</span>{" "}
                      </Label>
                      <Input
                        required
                        placeholder="example@gmail.com"
                        value={email}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                          setEmail(e.target.value)
                        }
                        type="email"
                      />
                    </div>

                    {/* Name Input */}
                    <div>
                      <Label>
                        Name <span className="text-error-500">*</span>{" "}
                      </Label>
                      <Input
                        required
                        placeholder="john doe"
                        value={name}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                          setName(e.target.value)
                        }
                        type="text"
                      />
                    </div>
                  </div>
                </div>

                <div>
                  <Button className="w-full" size="sm" disabled={isLoading}>
                    {isLoading ? "Sending..." : <>Sign Up</>}
                  </Button>
                </div>
              </div>
            </form>

            <div className="mt-5">
              <p className="text-sm font-normal text-center text-gray-700 dark:text-gray-400 sm:text-start">
                Already have an account? {""}
                <Link
                  to={paths.auth.signin.getHref()}
                  className="text-brand-500 hover:text-brand-600 dark:text-brand-400"
                >
                  Sign In
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
