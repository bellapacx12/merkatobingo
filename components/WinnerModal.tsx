"use client";

export default function WinnerModal() {
  return (
    <div className="fixed inset-0 bg-black/60 flex items-center justify-center">
      <div className="bg-white text-black p-6 rounded-xl text-center">
        <h2 className="text-2xl font-bold mb-4">🎉 You Won!</h2>
        <button className="bg-yellow-400 px-4 py-2 rounded-lg font-bold">
          Close
        </button>
      </div>
    </div>
  );
}
