import Link from "next/link";

export default function RoomCard() {
  return (
    <Link href="/room/123">
      <div className="bg-white/10 p-4 rounded-xl backdrop-blur-md hover:bg-white/20 transition">
        <div className="flex justify-between items-center">
          <div>
            <h3 className="font-bold text-lg">Bingo Room #123</h3>
            <p className="text-sm text-gray-300">Entry: 10 ETB</p>
          </div>

          <button className="bg-yellow-400 text-black px-4 py-2 rounded-full font-bold">
            Play
          </button>
        </div>
      </div>
    </Link>
  );
}
