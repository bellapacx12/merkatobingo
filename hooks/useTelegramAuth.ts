// hooks/useTelegramAuth.ts
"use client";

import { useEffect, useState } from "react";

export default function useTelegramAuth() {
  const [user, setUser] = useState<any>(null);
  const [token, setToken] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const initData = (window as any).Telegram?.WebApp?.initData;
    if (!initData) return setLoading(false);

    const login = async () => {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/auth/telegram`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ initData }),
        },
      );
      const data = await res.json();
      if (data.token) {
        localStorage.setItem("token", data.token);
        setToken(data.token);
        setUser(data.user);
      }
      setLoading(false);
    };

    login();
  }, []);

  return { user, token, loading };
}
