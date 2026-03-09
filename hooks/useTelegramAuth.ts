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
        console.log("[Auth] Initializing...");

        // 1️⃣ Check localStorage token
        let storedToken = localStorage.getItem("token");
        console.log("[Auth] Stored token:", storedToken);

        if (storedToken) {
          const res = await fetch(`https://merkatoback.onrender.com/auth/me`, {
            headers: { Authorization: `Bearer ${storedToken}` },
          });
          if (res.ok) {
            const data = await res.json();
            console.log("[Auth] Token valid, user data:", data);
            setUser(data.user);
            setToken(storedToken);
            setIsFirstTime(data.isFirstTime ?? false);
            setLoading(false);
            return;
          } else {
            console.warn("[Auth] Stored token invalid, removing...");
            localStorage.removeItem("token");
            storedToken = null;
          }
        }

        // 2️⃣ Check for Telegram WebApp
        const tg = (window as any).Telegram?.WebApp;
        if (!tg) {
          console.warn(
            "[Auth] Not in Telegram WebApp, skipping Telegram login",
          );
          setLoading(false);
          return;
        }

        // 3️⃣ Wait until Telegram initData is ready (max 3s)
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

        const initData = tg.initData;
        const tgUser = tg.initDataUnsafe.user;

        console.log("[Auth] Telegram user found:", tgUser);

        // 4️⃣ Call backend to login via Telegram
        const res = await fetch(
          `https://merkatoback.onrender.com/auth/telegram`,
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ initData, user: tgUser }),
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
          console.warn("[Auth] Telegram login failed:", data);
        }
      } catch (err) {
        console.error("[Auth] Initialization error:", err);
      } finally {
        setLoading(false);
        console.log("[Auth] Done loading");
      }
    };

    init();
  }, []);

  return { user, token, isFirstTime, loading };
}
