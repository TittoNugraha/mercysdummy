import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { getOrderById } from "../services/orderService";

export default function CheckOrder() {
  const [orderId, setOrderId] = useState("");
  const [order, setOrder] = useState(null);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleCheck = async () => {
    if (!orderId.trim()) return;

    try {
      const data = await getOrderById(orderId.trim());

      if (data && data.order_id) {
        setError("");
        setOrder(data);
      } else {
        setError("❌ Order ID tidak ditemukan");
        setOrder(null);
      }
    } catch (err) {
      console.error(err);
      setError("❌ Order ID tidak ditemukan");
      setOrder(null);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.3, ease: "easeInOut" }}
      className="p-4"
    >
      <div className="min-h-screen bg-[#f5efe6] flex flex-col items-center justify-center p-6">
        <div className="bg-white p-6 rounded-lg shadow-md w-full max-w-md">
          <h1 className="text-center text-2xl font-bold text-black mb-4">
            Check My Order
          </h1>

          {/* Input Order ID */}
          <input
            type="text"
            value={orderId}
            onChange={(e) => setOrderId(e.target.value)}
            placeholder="Masukkan Order ID"
            maxLength={8}
            className="w-full border border-[#d3bfa6] rounded px-4 py-2 mb-3 focus:outline-none focus:ring-2 focus:ring-[#6F4E37]"
          />

          {/* Pesan error */}
          {error && <p className="text-red-500 text-sm mb-3">{error}</p>}

          {/* Tombol View My Order */}
          <button
            onClick={handleCheck}
            disabled={!orderId.trim()}
            className={`w-full px-4 py-2 rounded text-white transition ${
              orderId.trim()
                ? "bg-[#6F4E37] hover:bg-[#5c3f2d] active:scale-95"
                : "bg-gray-400 cursor-not-allowed"
            }`}
          >
            View My Order
          </button>

          {/* Detail Order */}
          {order && (
            <div className="mt-6 p-4 border border-[#d3bfa6] rounded bg-[#faf6f1]">
              <h2 className="font-bold text-lg mb-3 text-center">
                Order ID: {order.order_id}
              </h2>
              <p className="mb-2">
                <span className="font-semibold">Table:</span>{" "}
                {order.table_number}
              </p>
              <p className="mb-2">
                <span className="font-semibold">Status:</span>{" "}
                <span
                  className={`px-3 py-1 rounded-full text-sm font-semibold
      ${
        order.status === "pending"
          ? "bg-yellow-100 text-yellow-700"
          : order.status === "ongoing"
          ? "bg-blue-100 text-blue-700"
          : order.status === "done"
          ? "bg-green-100 text-green-700"
          : "bg-gray-100 text-gray-600"
      }`}
                >
                  {order.status}
                </span>
              </p>

              <h3 className="font-semibold mt-3 mb-2">Items:</h3>
              <div className="space-y-2">
                {order.items.map((item) => (
                  <div
                    key={item.id}
                    className="flex justify-between bg-white px-3 py-1 rounded shadow-sm"
                  >
                    <span>
                      {item.name} x {item.quantity}
                    </span>
                    <span>Rp{item.price.toLocaleString()}</span>
                  </div>
                ))}
              </div>

              <hr className="my-2" />
              <div className="flex justify-between font-bold">
                <span>Total</span>
                <span>Rp{order.total_price.toLocaleString()}</span>
              </div>
            </div>
          )}

          {/* Tombol kembali */}
          <button
            onClick={() => navigate("/order")}
            className="mt-5 w-full px-4 py-2 rounded border border-[#6F4E37] text-[#6F4E37] hover:bg-[#6F4E37] hover:text-white transition active:scale-95"
          >
            ← Back to Order
          </button>
        </div>
      </div>
    </motion.div>
  );
}
