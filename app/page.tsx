"use client";

import React, { useState } from "react";
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

  // Update user's phone after Telegram contact
  const handleContact = async (phone: string) => {
    if (!token) return;
    try {
      const res = await fetch(
        `https://merkatoback.onrender.com/users/update-contact`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ phone }),
        },
      );
      if (res.ok) {
        setPhoneUpdated(true);
        console.log("[HomePage] Phone updated successfully");
      } else {
        console.error("[HomePage] Failed to update phone:", await res.text());
      }
    } catch (err) {
      console.error("[HomePage] Error updating phone:", err);
    }
  };

  // Show loading while auth is in progress
  if (loading) {
    return <div className="text-white p-4">Logging in via Telegram...</div>;
  }

  // Show Telegram contact prompt for first-time users
  if (isFirstTime && !phoneUpdated) {
    return <TelegramContactPrompt onContactReceived={handleContact} />;
  }

  // Main page content
  return (
    <main className="px-4 pt-6 pb-24 space-y-6 max-w-[480px] mx-auto">
      {/* Referral Card */}
      <ReferralCard />

      {/* Game Mode Selector */}
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

      {/* Optional: show user info for debugging */}
      {user && (
        <div className="text-sm text-gray-300 mt-4">
          Logged in as {user.first_name} {user.last_name} ({user.username})
        </div>
      )}
    </main>
  );
}
