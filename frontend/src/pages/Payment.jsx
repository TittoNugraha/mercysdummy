import { useLocation, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import qris from "../assets/images/qris2.png";

export default function Payment() {
  const { state } = useLocation();
  const navigate = useNavigate();

  const [proof, setProof] = useState(null);
  const [orderId, setOrderId] = useState("");
  const [showConfirmBack, setShowConfirmBack] = useState(false);

  useEffect(() => {
    const randomId = Math.floor(100000 + Math.random() * 900000);
    setOrderId(`MC${randomId}`);
  }, []);

  if (!state) {
    return (
      <div className="p-4">
        <p>Data pembayaran tidak ditemukan.</p>
        <button
          onClick={() => navigate("/")}
          className="mt-4 px-4 py-2 bg-coffee text-white rounded"
        >
          Kembali ke Menu
        </button>
      </div>
    );
  }

  const { tableNumber, selectedItems, totalPrice } = state;

  const handleProofUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setProof(file);
    }
  };

  const handleBackConfirm = () => {
    setShowConfirmBack(true);
  };

  const confirmBackYes = () => {
    navigate("/order");
  };

  const confirmBackNo = () => {
    setShowConfirmBack(false);
  };

  // === DUMMY CONFIRM METHOD (TANPA BACKEND) ===
  const handleConfirm = () => {
    const orderData = {
      orderId,
      tableNumber,
      selectedItems,
      totalPrice,
      status: "pending",
      proofName: proof?.name || "",
    };

    // Simpan dummy ke localStorage
    localStorage.setItem("dummy_order", JSON.stringify(orderData));

    // Redirect ke success page
    navigate("/payment-success", {
      state: { orderId, selectedItems, totalPrice },
    });
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.3, ease: "easeInOut" }}
      className="p-4"
    >
      <div className="pt-20 px-4 pb-24 bg-cream min-h-screen relative">
        {/* Tombol Back */}
        <button
          onClick={handleBackConfirm}
          className="absolute top-4 left-4 p-2 rounded-full hover:bg-gray-200 transition"
          aria-label="Kembali"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6 text-black"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M15 19l-7-7 7-7"
            />
          </svg>
        </button>

        <h1 className="text-2xl font-bold text-center mb-6 text-coffee">
          Pembayaran
        </h1>

        {/* Order ID */}
        <div className="bg-white rounded-lg shadow p-4 mb-4">
          <p className="font-semibold text-coffee">Order ID:</p>
          <p className="text-lg">{orderId}</p>
        </div>

        {/* List Pesanan */}
        <div className="bg-white rounded-lg shadow p-4 mb-4">
          <p className="mb-2">
            No Meja: <strong>{tableNumber}</strong>
          </p>
          <ul className="divide-y divide-gray-200">
            {selectedItems.map((item) => (
              <li key={item.id} className="py-2 flex justify-between">
                <span>
                  {item.name} x {item.quantity}
                </span>
                <span>Rp {(item.price * item.quantity).toLocaleString()}</span>
              </li>
            ))}
          </ul>
          <div className="mt-4 flex justify-between font-bold text-coffee">
            <span>Total Harga:</span>
            <span>Rp {totalPrice.toLocaleString()}</span>
          </div>
        </div>

        {/* QRIS */}
        <div className="bg-white rounded-lg shadow p-4 text-center mb-4">
          <p className="font-semibold mb-2 text-coffee">
            Scan QRIS untuk Membayar
          </p>
          <img
            src={qris}
            alt="QRIS Mercy’s Coffee"
            className="w-48 h-48 mx-auto mb-4 border border-gray-300 rounded"
          />
        </div>

        {/* Upload Bukti Pembayaran */}
        <div className="bg-white rounded-lg shadow p-4 mb-4">
          <p className="font-semibold text-coffee mb-2">
            Upload Bukti Pembayaran
          </p>
          <input
            type="file"
            accept="image/*"
            onChange={handleProofUpload}
            className="block w-full border border-gray-300 rounded p-2"
          />

          {proof && (
            <div className="mt-3">
              <p className="text-sm text-gray-500">Preview:</p>
              <img
                src={URL.createObjectURL(proof)}
                alt="Bukti Pembayaran"
                className="mt-2 w-40 h-40 object-cover border rounded"
              />
            </div>
          )}
        </div>

        {/* Tombol Konfirmasi */}
        <button
          onClick={handleConfirm}
          disabled={!proof}
          className={`mt-4 w-full py-3 rounded text-white font-semibold transition-all duration-200 ${
            proof
              ? "bg-green-600 hover:bg-green-700"
              : "bg-gray-400 cursor-not-allowed"
          }`}
        >
          Konfirmasi Pembayaran
        </button>

        {/* Popup Konfirmasi Back */}
        {showConfirmBack && (
          <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg shadow-lg p-6 max-w-sm w-full">
              <h2 className="text-lg font-bold text-coffee mb-4">
                Apakah Anda yakin ingin kembali?
              </h2>
              <p className="mb-6 text-sm text-gray-600">
                Pesanan Anda akan dibatalkan jika kembali ke halaman sebelumnya.
              </p>
              <div className="flex justify-end gap-3">
                <button
                  onClick={confirmBackNo}
                  className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
                >
                  Batal
                </button>
                <button
                  onClick={confirmBackYes}
                  className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
                >
                  Ya, Kembali
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </motion.div>
  );
}
