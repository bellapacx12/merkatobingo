"use client";

import { useEffect, useState } from "react";
import { User, Clock, Coffee } from "lucide-react";
import { motion } from "framer-motion";

type RoomRowProps = {
  roomId: string;
  entryFee: number;
  players: number;
  prizePool: number;
  nextGameIn: number; // seconds
  isActive?: boolean;
  onPlay: (roomId: string) => void;
};

export default function RoomRow({
  roomId,
  entryFee,
  players,
  prizePool,
  nextGameIn,
  isActive = false,
  onPlay,
}: RoomRowProps) {
  const [timeLeft, setTimeLeft] = useState(nextGameIn);

  useEffect(() => {
    const interval = setInterval(() => {
      setTimeLeft((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const formatTime = (sec: number) => {
    const m = String(Math.floor(sec / 60)).padStart(2, "0");
    const s = String(sec % 60).padStart(2, "0");
    return `${m}:${s}`;
  };

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      className={`flex flex-col sm:flex-row items-start sm:items-center justify-between p-4 mb-2 rounded-xl backdrop-blur-md bg-white/10 transition ${
        isActive ? "border-2 border-green-400" : ""
      }`}
    >
      {/* Left Info */}
      <div className="flex flex-col sm:flex-row flex-1 gap-4 sm:gap-6 w-full">
        {/* Entry Fee */}
        <div className="flex items-center gap-2">
          <span className="font-bold text-lg">{entryFee} ብር</span>
        </div>

        {/* Players */}
        <div className="flex items-center gap-1 text-gray-200 text-sm">
          <User size={16} /> {players}
        </div>

        {/* Timer */}
        <div className="flex items-center gap-1 text-red-400 text-sm">
          <Clock size={16} /> {formatTime(timeLeft)}
        </div>

        {/* Prize Pool */}
        <div className="flex items-center gap-1 text-yellow-400 text-sm">
          <Coffee size={16} /> {prizePool} ብር
        </div>
      </div>

      {/* Play Button */}
      <button
        onClick={() => onPlay(roomId)}
        className={`mt-3 sm:mt-0 px-4 py-2 rounded-full font-bold text-black ${
          isActive ? "bg-green-400" : "bg-yellow-400"
        }`}
      >
        {isActive ? "ይጫወቱ" : "ተጫወት"}
      </button>
    </motion.div>
  );
}
