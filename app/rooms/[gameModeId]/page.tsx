"use client";

import { useParams, useRouter } from "next/navigation";
import RoomRow from "@/components/RoomRow";
import { useState } from "react";
import { motion } from "framer-motion";

export default function RoomsPage() {
  const params = useParams();
  const router = useRouter();
  const { gameModeId } = params;
  const [activeRoom, setActiveRoom] = useState<string | null>(null);

  // MOCK rooms - in production, fetch based on gameModeId
  const roomsMock = [
    { id: "r1", entryFee: 3, players: 5, prizePool: 50, nextGameIn: 38 },
    { id: "r2", entryFee: 10, players: 12, prizePool: 120, nextGameIn: 120 },
    { id: "r3", entryFee: 20, players: 8, prizePool: 200, nextGameIn: 300 },
  ];

  const handlePlay = (id: string) => {
    setActiveRoom(id);
    router.push(`/room/${id}`);
  };

  return (
    <div className="mt-4 space-y-4 px-2">
      <motion.div
        layout
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -10 }}
        className={`flex flex-col sm:flex-row items-start sm:items-center justify-between p-4 mb-2 rounded-xl backdrop-blur-md bg-white/10 transition ${""}`}
      >
        <div className="flex-1 text-white">ባለ</div>
        <div className="w-20 text-center text-white">ተጫዋቾች</div>
        <div className="w-20 text-center text-white">ሰአት</div>
        <div className="w-28 text-center text-white">ደራሽ </div>
        <div className="w-24 text-center text-white">ተጫወት</div>
      </motion.div>
      <div className="space-y-1">
        {roomsMock.map((room) => (
          <RoomRow
            key={room.id}
            roomId={room.id}
            entryFee={room.entryFee}
            players={room.players}
            prizePool={room.prizePool}
            nextGameIn={room.nextGameIn}
            isActive={activeRoom === room.id}
            onPlay={handlePlay}
          />
        ))}
      </div>
    </div>
  );
}
