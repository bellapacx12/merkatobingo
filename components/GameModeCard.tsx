// components/GameModeCard.tsx
"use client";

import { motion } from "framer-motion";
import { Gamepad } from "lucide-react";
import { useRouter } from "next/navigation";

type GameModeCardProps = {
  id: string; // game mode ID
  titleAmh: string;
  titleEng: string;
  icon?: React.ReactNode;
  isActive?: boolean;
  onSelect?: () => void; // ✅ Add this line
};

export default function GameModeCard({
  id,
  titleAmh,
  titleEng,
  icon,
  isActive = false,
  onSelect,
}: GameModeCardProps) {
  const router = useRouter();

  const handlePlay = () => {
    if (onSelect) {
      onSelect(); // call the callback if provided
    }
    router.push(`/rooms/${id}`); // navigate to the rooms page
  };

  return (
    <motion.div
      layout
      whileHover={{ scale: 1.05 }}
      className={`min-w-[140px] p-4 rounded-xl backdrop-blur-md bg-white/10 flex flex-col items-center justify-between cursor-pointer border-2 transition ${
        isActive ? "border-yellow-400" : "border-transparent"
      }`}
    >
      <div className="text-3xl mb-2">{icon || <Gamepad size={32} />}</div>

      <h3 className="font-bold text-white">{titleAmh}</h3>
      <p className="text-gray-300 text-sm">{titleEng}</p>

      <button
        onClick={handlePlay}
        className={`mt-2 px-4 py-1 rounded-full font-bold text-black ${
          isActive ? "bg-green-400" : "bg-yellow-400"
        }`}
      >
        ይጫወቱ
      </button>
    </motion.div>
  );
}
