import db from "../config/db.js";
import * as Order from "../models/orderModel.js";
import { updateOrderStatus as updateOrderStatusModel } from "../models/orderModel.js";

export const getOrders = async (req, res) => {
  try {
    const orders = await Order.getAllOrders();
    res.json(orders);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const createOrder = async (req, res) => {
  try {
    console.log("📥 Request body:", req.body);
    console.log("📎 Request file:", req.file);

    const { orderId, tableNumber, totalPrice, status } = req.body;

    let items = [];
    if (typeof req.body.items === "string") {
      try {
        items = JSON.parse(req.body.items);
      } catch (e) {
        console.error("❌ Gagal parse items:", e);
      }
    } else {
      items = req.body.items || [];
    }

    const paymentProof = req.file ? req.file.filename : null;

    await db.query(
      "INSERT INTO orders (order_id, table_number, total_price, status, payment_proof) VALUES (?, ?, ?, ?, ?)",
      [orderId, tableNumber, totalPrice, status || "pending", paymentProof]
    );

    if (items.length > 0) {
      for (const item of items) {
        const price = parseFloat(item.price);
        const quantity = parseInt(item.quantity);

        if (!item.id || isNaN(price) || isNaN(quantity)) {
          console.warn("⚠️ Data item tidak valid:", item);
          continue;
        }

        const subtotal = price * quantity;

        await db.query(
          "INSERT INTO order_items (order_id, menu_id, quantity, subtotal) VALUES (?, ?, ?, ?)",
          [orderId, item.id, quantity, subtotal]
        );
      }
    }

    res.status(201).json({ message: "✅ Order created successfully", orderId });
  } catch (err) {
    console.error("❌ Error di createOrder:", err);
    res.status(500).json({ message: "Gagal simpan order", error: err.message });
  }
};

export const updateOrderStatus = async (req, res) => {
  try {
    const { order_id } = req.params;
    const { status } = req.body;

    const result = await updateOrderStatusModel(order_id, status);

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: "Order not found" });
    }

    res.json({ message: "Status updated successfully" });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ message: "Failed to update status", error: error.message });
  }
};

export const getOrderById = async (req, res) => {
  const { orderId } = req.params;
  try {
    const [orders] = await db.query("SELECT * FROM orders WHERE order_id = ?", [
      orderId,
    ]);

    if (orders.length === 0)
      return res.status(404).json({ message: "Order not found" });

    const [items] = await db.query(
      `SELECT oi.menu_id, m.name, oi.quantity, oi.subtotal AS price
       FROM order_items oi
       JOIN menu m ON oi.menu_id = m.id
       WHERE oi.order_id = ?`,
      [orderId]
    );

    res.json({ ...orders[0], items });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Gagal ambil order", error: err.message });
  }
};
