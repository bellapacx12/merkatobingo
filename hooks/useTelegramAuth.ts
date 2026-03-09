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

export default function useTelegramAuth(): AuthData {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [isFirstTime, setIsFirstTime] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const init = async () => {
      try {
        // 1️⃣ Check token
        let storedToken = localStorage.getItem("token");
        if (storedToken) {
          const res = await fetch(
            `${process.env.NEXT_PUBLIC_API_URL}/auth/me`,
            {
              headers: { Authorization: `Bearer ${storedToken}` },
            },
          );
          if (res.ok) {
            const data = await res.json();
            setUser(data.user);
            setToken(storedToken);
            setIsFirstTime(data.isFirstTime ?? false);
            setLoading(false);
            return;
          } else {
            localStorage.removeItem("token");
            storedToken = null;
          }
        }
        // 2️⃣ Check if Telegram WebApp exists
        const tg = (window as any).Telegram?.WebApp;
        if (!tg) {
          console.warn("Not in Telegram WebApp — skipping Telegram login");
          setLoading(false); // exit gracefully
          return;
        }

        // 3️⃣ Wait until initData is ready (max 3s)
        let tries = 0;
        while (!tg.initData && tries < 30) {
          await new Promise((res) => setTimeout(res, 100));
          tries++;
        }

        if (!tg.initData || !tg.initDataUnsafe?.user) {
          console.warn("Telegram initData/user not available");
          setLoading(false);
          return;
        }

        const initData = tg.initData;
        const tgUser = tg.initDataUnsafe.user;

        console.log("Calling backend with Telegram data:", tgUser);

        // 4️⃣ Call backend
        const res = await fetch(
          `https://merkatoback.onrender.com/auth/telegram`,
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ initData, user: JSON.stringify(tgUser) }),
          },
        );

        const data = await res.json();
        if (data.token) {
          localStorage.setItem("token", data.token);
          setToken(data.token);
          setUser(data.user);
          setIsFirstTime(data.isFirstTime ?? false);
        }
      } catch (err) {
        console.error("Auth failed:", err);
      } finally {
        setLoading(false);
      }
    };

    init();
  }, []);

  return { user, token, isFirstTime, loading };
}
