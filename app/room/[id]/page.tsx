"use client";

import { useParams } from "next/navigation";
import GameBoard from "@/components/GameBoard";
import TicketSelector from "@/components/TicketSelector";
import WinnerModal from "@/components/WinnerModal";

export default function RoomPage() {
  const params = useParams();
  const roomId = params.id;

  return (
    <main className="p-4 space-y-6">
      <h1 className="text-lg font-bold">Room #{roomId}</h1>

      <GameBoard />
      <TicketSelector />

      <WinnerModal />
    </main>
  );
}
