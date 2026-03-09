export default function WalletDisplay() {
  return (
    <div className="space-y-6 text-center">
      <h1 className="text-4xl font-bold">0 ETB</h1>

      <div className="flex justify-center gap-4">
        <button className="bg-black/40 px-4 py-2 rounded-lg">Deposit</button>
        <button className="bg-black/40 px-4 py-2 rounded-lg">Withdraw</button>
        <button className="bg-black/40 px-4 py-2 rounded-lg">Transfer</button>
      </div>

      <div className="text-gray-400 text-sm">Transactions will appear here</div>
    </div>
  );
}
