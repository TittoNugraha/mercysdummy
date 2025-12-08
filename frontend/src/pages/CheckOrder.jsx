import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

export default function CheckOrder() {
  const [orderId, setOrderId] = useState("");
  const [order, setOrder] = useState(null);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleCheck = () => {
    if (!orderId.trim()) return;

    // Ambil dari localStorage
    const data = localStorage.getItem(`order_${orderId.trim()}`);

    if (data) {
      setOrder(JSON.parse(data));
      setError("");
    } else {
      setError("❌ Order ID tidak ditemukan");
      setOrder(null);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.3 }}
      className="p-4"
    >
      <div className="min-h-screen bg-[#f5efe6] flex flex-col items-center justify-center p-6">
        <div className="bg-white p-6 rounded-lg shadow-md w-full max-w-md">
          <h1 className="text-center text-2xl font-bold mb-4">
            Check My Order
          </h1>

          <input
            type="text"
            value={orderId}
            onChange={(e) => setOrderId(e.target.value)}
            placeholder="Masukkan Order ID"
            className="w-full border rounded px-4 py-2 mb-3"
          />

          {error && <p className="text-red-500 text-sm mb-3">{error}</p>}

          <button
            onClick={handleCheck}
            disabled={!orderId.trim()}
            className={`w-full px-4 py-2 rounded text-white transition ${
              orderId.trim() ? "bg-[#6F4E37]" : "bg-gray-400 cursor-not-allowed"
            }`}
          >
            View My Order
          </button>

          {order && (
            <div className="mt-6 p-4 border rounded bg-[#faf6f1]">
              <h2 className="font-bold text-lg text-center">
                Order ID: {order.order_id}
              </h2>

              <p className="mt-2">
                <strong>Table:</strong> {order.table_number}
              </p>

              <p className="mt-2">
                <strong>Status:</strong> {order.status}
              </p>

              <h3 className="font-semibold mt-3 mb-1">Items:</h3>
              {order.items.map((item) => (
                <div
                  key={item.id}
                  className="flex justify-between bg-white px-3 py-1 rounded shadow-sm mb-1"
                >
                  <span>
                    {item.name} x {item.quantity}
                  </span>
                  <span>Rp {item.price.toLocaleString()}</span>
                </div>
              ))}

              <hr className="my-2" />
              <div className="flex justify-between font-bold">
                <span>Total</span>
                <span>Rp {order.total_price.toLocaleString()}</span>
              </div>
            </div>
          )}

          <button
            onClick={() => navigate("/")}
            className="mt-4 w-full px-4 py-2 rounded border text-[#6F4E37]"
          >
            ← Back to Order
          </button>
        </div>
      </div>
    </motion.div>
  );
}
