"use client";

import React, { useState, useEffect } from "react";
import useTelegramAuth from "@/hooks/useTelegramAuth";
import TelegramContactPrompt from "@/components/TelegramContactPrompt";
import ReferralCard from "@/components/ReferralCard";
import GameModeCard from "@/components/GameModeCard";

// Game modes
const gameModes = [
  { id: "bingo", titleAmh: "ቢንጎ", titleEng: "Classic Bingo" },
  { id: "minibingo", titleAmh: "ሚኒ ቢንጎ", titleEng: "Mini Bingo" },
];

export default function HomePage() {
  const { user, token, isFirstTime, loading } = useTelegramAuth();
  const [activeGameMode, setActiveGameMode] = useState("bingo");
  const [phoneUpdated, setPhoneUpdated] = useState(false);
  const [pendingPhone, setPendingPhone] = useState<string | null>(null);

  // Only trigger handleContact when token is set
  useEffect(() => {
    if (token && pendingPhone) {
      const updatePhone = async () => {
        try {
          const res = await fetch(
            `${process.env.NEXT_PUBLIC_API_URL}/users/update-contact`,
            {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
              },
              body: JSON.stringify({ phone: pendingPhone }),
            },
          );
          if (res.ok) {
            setPhoneUpdated(true);
            setPendingPhone(null);
            console.log("[HomePage] Phone updated successfully");
          } else {
            console.error(
              "[HomePage] Failed to update phone:",
              await res.text(),
            );
          }
        } catch (err) {
          console.error("[HomePage] Error updating phone:", err);
        }
      };
      updatePhone();
    }
  }, [token, pendingPhone]);

  // This just queues the phone number until token exists
  const handleContact = (phone: string) => {
    if (!token) {
      console.log("[HomePage] Token not ready, queuing phone update:", phone);
      setPendingPhone(phone);
      return;
    }
    setPendingPhone(phone);
  };

  if (loading) {
    return <div className="text-white p-4">Logging in via Telegram...</div>;
  }

  if (isFirstTime && !phoneUpdated) {
    return <TelegramContactPrompt onContactReceived={handleContact} />;
  }

  return (
    <main className="px-4 pt-6 pb-24 space-y-6 max-w-[480px] mx-auto">
      <ReferralCard />
      <div className="flex space-x-4 overflow-x-auto pb-2">
        {gameModes.map((mode) => (
          <GameModeCard
            key={mode.id}
            id={mode.id}
            titleAmh={mode.titleAmh}
            titleEng={mode.titleEng}
            isActive={activeGameMode === mode.id}
            onSelect={() => setActiveGameMode(mode.id)}
          />
        ))}
      </div>
      {user && (
        <div className="text-sm text-gray-300 mt-4">
          Logged in as {user.first_name} {user.last_name} ({user.username})
        </div>
      )}
    </main>
  );
}
