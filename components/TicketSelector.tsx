export default function TicketSelector() {
  return (
    <div className="bg-white/10 p-4 rounded-xl space-y-3">
      <h3 className="font-bold">Select Tickets</h3>

      <div className="flex gap-2">
        {[1, 2, 3, 5].map((num) => (
          <button key={num} className="bg-black/40 px-4 py-2 rounded-lg">
            {num}
          </button>
        ))}
      </div>

      <button className="w-full bg-yellow-400 text-black py-2 rounded-lg font-bold">
        Buy Ticket
      </button>
    </div>
  );
}
