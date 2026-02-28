"use client";
import { useState, useEffect } from "react";

export default function useTelegramAuth() {
  const [user, setUser] = useState<any>(null);
  const [token, setToken] = useState<string | null>(null);
  const [isFirstTime, setIsFirstTime] = useState(false); // <-- add this
  const [loading, setLoading] = useState(true);

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
          setIsFirstTime(data.isFirstTime ?? false); // <-- set it
        }
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    login();
  }, []);

  return { user, token, isFirstTime, loading };
}
