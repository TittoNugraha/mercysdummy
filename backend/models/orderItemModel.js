import db from "../config/db.js";

const OrderItem = {
  async add(orderId, menuId, quantity, subtotal) {
    await db.query(
      "INSERT INTO order_items (order_id, menu_id, quantity, subtotal) VALUES (?, ?, ?, ?)",
      [orderId, menuId, quantity, subtotal]
    );
  },

  async getByOrder(orderId) {
    const [rows] = await db.query(
      `SELECT oi.*, m.name, m.price 
       FROM order_items oi 
       JOIN menu m ON oi.menu_id = m.id 
       WHERE oi.order_id = ?`,
      [orderId]
    );
    return rows;
  },
};

export default OrderItem;
