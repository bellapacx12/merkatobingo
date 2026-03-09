"use client";

import { useState, useEffect } from "react";

interface User {
  id: string;
  username: string;
  first_name: string;
  last_name: string;
  phone?: string;
}

interface AuthData {
  user: User | null;
  token: string | null;
  isFirstTime: boolean;
  loading: boolean;
}

export default function useTelegramAuth(debug = false): AuthData {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [isFirstTime, setIsFirstTime] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const init = async () => {
      try {
        // 1️⃣ Check stored token
        const storedToken = localStorage.getItem("token");
        if (storedToken) {
          const res = await fetch(`https://merkatoback.onrender.com/auth/me`, {
            headers: { Authorization: `Bearer ${storedToken}` },
          });
          if (res.ok) {
            const data = await res.json();
            setUser(data.user);
            setToken(storedToken);
            setIsFirstTime(data.isFirstTime ?? false);
            setLoading(false);
            return;
          }
          localStorage.removeItem("token");
        }

        // 2️⃣ Telegram WebApp or debug override
        const tg = debug
          ? {
              initData: {},
              initDataUnsafe: {
                user: { id: "dev", first_name: "Dev", username: "dev" },
              },
            }
          : (window as any).Telegram?.WebApp;

        if (!tg) {
          console.warn("[Auth] Telegram WebApp not detected");
          setLoading(false);
          return;
        }

        // Wait for initData (max 3s)
        let tries = 0;
        while (!tg.initData && tries < 30) {
          await new Promise((res) => setTimeout(res, 100));
          tries++;
        }

        if (!tg.initData || !tg.initDataUnsafe?.user) {
          console.warn("[Auth] Telegram initData/user not available");
          setLoading(false);
          return;
        }

        // 3️⃣ Call backend
        const res = await fetch(
          `https://merkatoback.onrender.com/auth/telegram`,
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ initData: tg.initData }),
          },
        );

        const data = await res.json();
        console.log("[Auth] Backend response:", data);

        if (res.ok && data.token) {
          localStorage.setItem("token", data.token);
          setToken(data.token);
          setUser(data.user);
          setIsFirstTime(data.isFirstTime ?? false);
        } else {
          console.warn("[Auth] Telegram login failed", data);
        }
      } catch (err) {
        console.error("[Auth] Initialization error:", err);
      } finally {
        setLoading(false);
      }
    };

    init();
  }, [debug]);

  return { user, token, isFirstTime, loading };
}
