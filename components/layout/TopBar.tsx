"use client";

import { X, MoreVertical } from "lucide-react";

export default function TopBar() {
  return (
    <div className="fixed top-0 left-1/2 -translate-x-1/2 w-full max-w-[480px] z-50 backdrop-blur-md bg-black/20 border-b border-white/10">
      <div className="flex items-center justify-between px-4 h-14">
        <X size={20} />
        <h1 className="font-bold">Merkato Bingo</h1>
        <MoreVertical size={20} />
      </div>
    </div>
  );
}
