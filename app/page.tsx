"use client";

import { useState } from "react";
import CountdownTimer from "@/components/CountdownTimer";
import ReferralCard from "@/components/ReferralCard";
import GameModeCard from "@/components/GameModeCard";
import useTelegramAuth from "@/hooks/useTelegramAuth";
import TelegramContactPrompt from "@/components/TelegramContactPrompt";

const gameModes = [
  { id: "bingo", titleAmh: "ቢንጎ", titleEng: "Classic Bingo" },
  { id: "minibingo", titleAmh: "ሚኒ ቢንጎ", titleEng: "Mini Bingo" },
];

export default function HomePage() {
  const [activeGameMode, setActiveGameMode] = useState<string>("bingo");
  const [phoneUpdated, setPhoneUpdated] = useState<boolean>(false);

  // Telegram auth hook
  const { user, token, isFirstTime, loading } = useTelegramAuth();

  // Handle first-time contact update
  const handleContact = async (phone: string) => {
    if (!token) return;
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/users/update-contact`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ phone }),
        },
      );
      if (res.ok) setPhoneUpdated(true);
    } catch (err) {
      console.error("Failed to update phone:", err);
    }
  };

  // Loading state
  if (loading)
    return <div className="text-white p-4">Logging in via Telegram...</div>;

  // First-time user without phone → show Telegram contact prompt
  if (isFirstTime && !phoneUpdated) {
    return <TelegramContactPrompt onContactReceived={handleContact} />;
  }

  // Main page content
  return (
    <main className="px-4 pt-6 pb-24 space-y-6 max-w-[480px] mx-auto">
      {/* Countdown Timer (optional) */}
      {/* <CountdownTimer /> */}

      {/* Referral Card */}
      <ReferralCard />

      {/* Game Mode Horizontal Scroll */}
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
    </main>
  );
}
