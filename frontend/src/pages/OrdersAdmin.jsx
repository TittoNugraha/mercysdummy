import React, { useEffect, useState } from "react";
import { getOrders, updateOrderStatus } from "../services/orderService";
import HeaderAdmin from "../components/HeaderAdmin";
import Sidebar from "../components/Sidebar";

export default function OrdersAdmin() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedProof, setSelectedProof] = useState(null);

  const fetchOrders = async () => {
    try {
      const data = await getOrders();
      setOrders(data);
    } catch (err) {
      console.error("Gagal ambil data orders:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  const handleStatusChange = async (order_id, newStatus) => {
    try {
      await updateOrderStatus(order_id, newStatus);

      setOrders((prevOrders) =>
        prevOrders.map((order) =>
          order.order_id === order_id ? { ...order, status: newStatus } : order
        )
      );
    } catch (error) {
      console.error("Failed to update status:", error);
    }
  };

  return (
    <div className="flex">
      <Sidebar />
      <div className="flex-1 ml-60">
        <HeaderAdmin />
        <div className="p-8 min-h-screen bg-[#fdfaf6]">
          <h1 className="text-2xl font-bold text-[#5c3d2e] mb-6">Orders</h1>

          <div className="overflow-x-auto bg-white shadow rounded-xl p-6">
            {loading ? (
              <p className="text-gray-500 text-center">Loading...</p>
            ) : (
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-[#f0e5d8] text-[#3b2f2f]">
                    <th className="px-4 py-2 text-sm">Order ID</th>
                    <th className="px-4 py-2 text-sm">No Meja</th>
                    <th className="px-4 py-2 text-sm">Items</th>
                    <th className="px-4 py-2 text-sm">Status</th>
                    <th className="px-4 py-2 text-sm">Bukti</th>
                    <th className="px-4 py-2 text-sm">Tanggal</th>
                  </tr>
                </thead>
                <tbody>
                  {orders.length > 0 ? (
                    orders.map((order) => (
                      <tr
                        key={order.id}
                        className="border-b hover:bg-[#fdf6f0] transition"
                      >
                        <td className="px-4 py-2 text-sm">{order.order_id}</td>
                        <td className="px-4 py-2 text-sm">
                          {order.table_number}
                        </td>
                        <td className="px-4 py-2 text-sm">
                          {order.items ? (
                            order.items
                              .split(", ")
                              .map((item, index) => (
                                <div key={index}>{item}</div>
                              ))
                          ) : (
                            <em>Tidak ada item</em>
                          )}
                        </td>
                        <td className="p-2">
                          <div className="flex gap-2">
                            {["pending", "ongoing", "done"].map((s) => (
                              <button
                                key={s}
                                onClick={() =>
                                  handleStatusChange(order.order_id, s)
                                }
                                className={`
                                  px-3 py-1 rounded-full text-xs font-semibold transition 
                                  ${
                                    order.status === s
                                      ? s === "pending"
                                        ? "bg-yellow-200 text-yellow-800 border border-yellow-400"
                                        : s === "ongoing"
                                        ? "bg-blue-200 text-blue-800 border border-blue-400"
                                        : "bg-green-200 text-green-800 border border-green-400"
                                      : "bg-gray-100 text-gray-500 border border-gray-300 hover:bg-gray-200"
                                  }
                                `}
                              >
                                {s === "pending"
                                  ? "Pending"
                                  : s === "ongoing"
                                  ? "Ongoing"
                                  : "Done"}
                              </button>
                            ))}
                          </div>
                        </td>
                        <td className="px-4 py-2 text-sm">
                          {order.payment_proof ? (
                            <button
                              onClick={() =>
                                setSelectedProof(
                                  `/uploads/${order.payment_proof}`
                                )
                              }
                              className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded shadow text-xs transition"
                            >
                              Lihat Bukti
                            </button>
                          ) : (
                            <span className="text-gray-400 text-sm">-</span>
                          )}
                        </td>
                        <td className="px-4 py-2 text-sm">
                          {new Date(order.createdAt).toLocaleString("id-ID")}
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td
                        colSpan="6"
                        className="text-center text-gray-500 py-4 text-sm"
                      >
                        Belum ada order
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            )}
          </div>
        </div>
      </div>

      {selectedProof && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
          onClick={() => setSelectedProof(null)}
        >
          <div
            className="bg-white rounded-lg shadow-lg max-w-lg w-full p-4 relative"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setSelectedProof(null)}
              className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
            >
              ✕
            </button>
            <h2 className="text-lg font-semibold mb-2">Bukti Pembayaran</h2>
            <img
              src={`http://localhost:5000${selectedProof}`}
              alt="Bukti Pembayaran"
              className="w-full h-auto rounded"
            />
          </div>
        </div>
      )}
    </div>
  );
}
