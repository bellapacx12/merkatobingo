"use client";

import { useState } from "react";
import CountdownTimer from "@/components/CountdownTimer";
import ReferralCard from "@/components/ReferralCard";
import GameModeCard from "@/components/GameModeCard";

const gameModes = [
  { id: "bingo", titleAmh: "ቢንጎ", titleEng: "Classic Bingo" },
  { id: "minibingo", titleAmh: "ሚኒ ቢንጎ", titleEng: "Mini Bingo" },
];

export default function HomePage() {
  const [activeGameMode, setActiveGameMode] = useState("bingo");

  return (
    <main className="px-4 pt-6 pb-24 space-y-6 max-w-[480px] mx-auto">
      {/* Countdown Timer (optional, can enable later) */}
      {/* <CountdownTimer /> */}

      {/* Referral Card */}
      <ReferralCard />

      {/* Game Mode Horizontal Scroll */}
      <div className="flex space-x-4 overflow-x-auto pb-2">
        {gameModes.map((mode) => (
          <GameModeCard
            key={mode.id}
            id={mode.id} // Important for navigation later
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
