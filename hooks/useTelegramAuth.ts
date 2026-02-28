// hooks/useTelegramAuth.ts
"use client";
import { useState, useEffect } from "react";

interface User {
  id?: string;
  name?: string;
  telegramId?: string;
  // add other fields as needed
}

interface AuthData {
  user: User | null;
  token: string | null;
  isFirstTime: boolean;
  loading: boolean;
}

export default function useTelegramAuth(): AuthData {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [isFirstTime, setIsFirstTime] = useState<boolean>(false); // must default
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const initData = (window as any).Telegram?.WebApp?.initData;
    if (!initData) return setLoading(false);

    const login = async () => {
      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/auth/telegram`,
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ initData }),
          },
        );

        const data = await res.json();

        if (data.accessToken) {
          localStorage.setItem("token", data.accessToken);
          setToken(data.accessToken);
          setUser(data.user);
          setIsFirstTime(data.isFirstTime ?? false); // always set
        }
      } catch (err) {
        console.error(err);
        setIsFirstTime(false); // fallback
      } finally {
        setLoading(false);
      }
    };

    login();
  }, []);

  return { user, token, isFirstTime, loading };
}
