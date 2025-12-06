import React, { useEffect, useState } from "react";
import HeaderAdmin from "../components/HeaderAdmin";
import Sidebar from "../components/Sidebar";
import { getOrders } from "../services/orderService";
import { getMenus } from "../services/menuService";
import {
  ClipboardDocumentListIcon,
  ClockIcon,
  CheckCircleIcon,
  Squares2X2Icon,
} from "@heroicons/react/24/outline";

const Dashboard = () => {
  const [stats, setStats] = useState({
    totalOrders: 0,
    pendingOrders: 0,
    ongoingOrders: 0,
    doneOrders: 0,
  });

  const [recentOrders, setRecentOrders] = useState([]);

  const admin = JSON.parse(localStorage.getItem("admin"));

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const orders = await getOrders();
        const menus = await getMenus();

        setStats({
          totalOrders: orders.length,
          pendingOrders: orders.filter((o) => o.status === "pending").length,
          ongoingOrders: orders.filter((o) => o.status === "ongoing").length,
          doneOrders: orders.filter((o) => o.status === "done").length,
        });

        const sortedOrders = [...orders]
          .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
          .slice(0, 5);

        setRecentOrders(sortedOrders);
      } catch (err) {
        console.error("Gagal ambil data dashboard", err);
      }
    };

    fetchStats();
  }, []);

  const cards = [
    {
      title: "Total Orders",
      value: stats.totalOrders,
      icon: <ClipboardDocumentListIcon className="h-8 w-8 text-[#a47148]" />,
      bg: "bg-[#f0e5d8]",
    },
    {
      title: "Pending Orders",
      value: stats.pendingOrders,
      icon: <ClockIcon className="h-8 w-8 text-yellow-600" />,
      bg: "bg-yellow-100",
    },
    {
      title: "Ongoing Orders",
      value: stats.ongoingOrders,
      icon: <CheckCircleIcon className="h-8 w-8 text-green-600" />,
      bg: "bg-blue-100",
    },
    {
      title: "Done Orders",
      value: stats.ongoingOrders,
      icon: <CheckCircleIcon className="h-8 w-8 text-green-600" />,
      bg: "bg-green-100",
    },
  ];

  return (
    <div className="flex">
      <Sidebar />
      <div className="flex-1 ml-60">
        <HeaderAdmin />
        <div className="p-8 min-h-screen bg-[#fdfaf6]">
          <h1 className="text-2xl font-bold text-[#5c3d2e] mb-6">
            Welcome, {admin?.name || "Admin"}
          </h1>

          {/* Statistik Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
            {/* Total Orders */}
            <div className="bg-[#f0e5d8] p-6 rounded-xl shadow hover:shadow-lg transition">
              <p className="text-sm text-gray-600">Total Orders</p>
              <h2 className="text-2xl font-bold text-[#3b2f2f]">
                {stats.totalOrders}
              </h2>
            </div>

            {/* Pending Orders */}
            <div className="bg-yellow-100 p-6 rounded-xl shadow hover:shadow-lg transition">
              <p className="text-sm text-gray-600">Pending Orders</p>
              <h2 className="text-2xl font-bold text-yellow-700">
                {stats.pendingOrders}
              </h2>
            </div>

            {/* Ongoing Orders */}
            <div className="bg-blue-100 p-6 rounded-xl shadow hover:shadow-lg transition">
              <p className="text-sm text-gray-600">Ongoing Orders</p>
              <h2 className="text-2xl font-bold text-blue-700">
                {stats.ongoingOrders}
              </h2>
            </div>

            {/* Done Orders */}
            <div className="bg-green-100 p-6 rounded-xl shadow hover:shadow-lg transition">
              <p className="text-sm text-gray-600">Done Orders</p>
              <h2 className="text-2xl font-bold text-green-700">
                {stats.doneOrders}
              </h2>
            </div>
          </div>

          {/* Tabel Order Terbaru */}
          <div className="bg-white shadow rounded-xl p-6">
            <h2 className="text-lg font-semibold text-[#5c3d2e] mb-4">
              Order Terbaru
            </h2>
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-[#f0e5d8] text-[#3b2f2f]">
                    <th className="px-4 py-2 text-sm">Order ID</th>
                    <th className="px-4 py-2 text-sm">No Meja</th>
                    <th className="px-4 py-2 text-sm">Status</th>
                    <th className="px-4 py-2 text-sm">Tanggal</th>
                  </tr>
                </thead>
                <tbody>
                  {recentOrders.length > 0 ? (
                    recentOrders.map((order) => (
                      <tr
                        key={order.id}
                        className="border-b hover:bg-[#fdf6f0] transition"
                      >
                        <td className="px-4 py-2 text-sm">{order.order_id}</td>
                        <td className="px-4 py-2 text-sm">
                          {order.table_number}
                        </td>
                        <td className="px-4 py-2 text-sm">{order.status}</td>
                        <td className="px-4 py-2 text-sm">
                          {new Date(order.createdAt).toLocaleString("id-ID")}
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td
                        colSpan="5"
                        className="text-center text-gray-500 py-4 text-sm"
                      >
                        Belum ada order terbaru
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
