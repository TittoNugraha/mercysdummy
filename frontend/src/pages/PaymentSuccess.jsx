import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

export default function PaymentSuccess() {
  const [order, setOrder] = useState(null);
  const navigate = useNavigate();
  const { state } = useLocation();
  const { orderId, selectedItems, totalPrice } = state || {};

  if (!orderId || !selectedItems) {
    return <p>Data pesanan tidak ditemukan.</p>;
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.3, ease: "easeInOut" }}
      className="p-4"
    >
      <div className="min-h-screen flex flex-col items-center justify-center bg-cream px-4">
        <h1 className="text-2xl font-bold text-coffee text-center">
          Selamat, pesanan akan segera kami buatkan.
        </h1>
        <h1 className="text-2xl font-bold text-coffee text-center">
          Jangan lupa Order ID nya jika kamu mau cek pesananmu.
        </h1>

        <div className="mt-4 bg-white shadow-md rounded-lg px-6 py-3">
          <p className="text-lg font-semibold text-center">
            Order ID: <span className="text-coffee">{orderId}</span>
          </p>
        </div>

        <div className="mt-6 w-full max-w-md bg-white shadow-md rounded-lg p-4">
          <h2 className="font-bold text-lg mb-3">Pesanan Anda</h2>
          {selectedItems.map((item) => (
            <div key={item.id} className="flex justify-between mb-2">
              <span>
                {item.name} x {item.quantity}
              </span>
              <span>Rp{(item.price * item.quantity).toLocaleString()}</span>
            </div>
          ))}
          <hr className="my-2" />
          <div className="flex justify-between font-bold">
            <span>Total</span>
            <span>Rp{totalPrice.toLocaleString()}</span>
          </div>
        </div>

        <div className="flex gap-4 mt-6">
          <button
            onClick={() => navigate("/order")}
            className="bg-[#6F4E37] text-white px-4 py-2 rounded shadow-md hover:shadow-lg hover:bg-[#5c3f2d] active:scale-95 transition"
          >
            Order More
          </button>
          <button
            onClick={() => navigate("/check-order")}
            className="bg-green-600 text-white px-4 py-2 rounded shadow-md hover:shadow-lg hover:bg-green-800 active:scale-95 transition"
          >
            Check My Order
          </button>
        </div>
      </div>
    </motion.div>
  );
}
