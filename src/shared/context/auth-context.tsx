import { useQueryClient } from "@tanstack/react-query";
import { createContext, useContext } from "react";
import { useCookies } from "react-cookie";
import { AUTH_TOKEN_COOKIE, USER_QUERY_KEY } from "../constant/auth";

type AuthContextType = {
  token: string | null;
  isAuthenticated: boolean;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const queryClient = useQueryClient();
  const [cookies, _setCookie, removeCookie] = useCookies([AUTH_TOKEN_COOKIE]);

  const logout = () => {
    removeCookie(AUTH_TOKEN_COOKIE);
    queryClient.removeQueries({
      queryKey: [USER_QUERY_KEY],
    });
  };

  const value = {
    token: cookies[AUTH_TOKEN_COOKIE],
    isAuthenticated: !!cookies[AUTH_TOKEN_COOKIE],
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
