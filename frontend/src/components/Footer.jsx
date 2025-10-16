export default function Footer({ total, count, disabled, onProceed }) {
  if (count === 0) return null;

  return (
    <footer className="fixed bottom-4 left-1/2 transform -translate-x-1/2 w-[95%] max-w-md bg-[#f5efe6] border border-[#b68d5a] px-4 py-3 rounded-xl shadow-lg flex justify-between items-center z-50">
      <div>
        <p className="font-bold text-[#6b4c32]">
          Total: Rp{total.toLocaleString("id-ID")}
        </p>
        <p className="text-sm text-[#6b4c32]">{count} item</p>
      </div>
      <button
        disabled={disabled}
        onClick={onProceed}
        className={`px-4 py-2 rounded font-semibold transition duration-200 ${
          disabled
            ? "bg-gray-300 text-gray-600 cursor-not-allowed"
            : "bg-[#6b4c32] text-white hover:opacity-90"
        }`}
      >
        Bayar
      </button>
    </footer>
  );
}
