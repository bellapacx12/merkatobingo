"use client";

export default function GameBoard() {
  return (
    <div className="grid grid-cols-5 gap-2">
      {Array.from({ length: 25 }).map((_, i) => (
        <div
          key={i}
          className="aspect-square bg-white/10 rounded-lg flex items-center justify-center font-bold"
        >
          {i + 1}
        </div>
      ))}
    </div>
  );
}
