"use client";
import { createContext, useContext, ReactNode } from "react";
import useTelegramAuth from "@/hooks/useTelegramAuth";

interface AuthContextProps {
  user: any;
  token: string | null;
  isFirstTime: boolean;
  loading: boolean;
}

const AuthContext = createContext<AuthContextProps | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const auth = useTelegramAuth();
  return <AuthContext.Provider value={auth}>{children}</AuthContext.Provider>;
};

export const useAuth = (): AuthContextProps => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used inside AuthProvider");
  return context;
};
