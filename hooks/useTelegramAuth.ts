"use client";

import { useState, useEffect } from "react";
import { retrieveLaunchParams } from "@telegram-apps/sdk";

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

export default function useTelegramAuthSDK(): AuthData {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [isFirstTime, setIsFirstTime] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const init = async () => {
      try {
        // 1️⃣ Check localStorage
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

        // 2️⃣ Retrieve Telegram initData using SDK
        const { initDataRaw } = retrieveLaunchParams();

        if (!initDataRaw) {
          setLoading(false);
          return;
        }

        // 3️⃣ Send signed initData to backend
        const res = await fetch(
          `https://merkatoback.onrender.com/auth/telegram`,
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ initData: initDataRaw }),
          },
        );

        const data = await res.json();
        if (res.ok && data.token) {
          localStorage.setItem("token", data.token);
          setToken(data.token);
          setUser(data.user);
          setIsFirstTime(data.isFirstTime ?? false);
        }
      } catch (err) {
        console.error("Auth error:", err);
      } finally {
        setLoading(false);
      }
    };

    init();
  }, []);

  return { user, token, isFirstTime, loading };
}
