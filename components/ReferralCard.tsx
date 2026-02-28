export default function ReferralCard() {
  return (
    <div className="bg-white/10 p-4 rounded-xl backdrop-blur-md space-y-3">
      <div className="flex justify-between items-center">
        <span className="font-bold">LEVEL 1</span>
        <span className="text-yellow-400">0/10</span>
      </div>

      <div className="w-full bg-black/40 h-2 rounded-full">
        <div className="bg-yellow-400 h-2 w-1/4 rounded-full"></div>
      </div>

      <input
        value="https://merkato-bingo.app/ref/123"
        readOnly
        className="w-full bg-black/30 p-2 rounded-lg text-sm"
      />
    </div>
  );
}
