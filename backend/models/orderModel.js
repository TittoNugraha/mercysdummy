import db from "../config/db.js";

export const getAllOrders = async () => {
  const [rows] = await db.query(`
    SELECT 
      o.order_id,
      o.table_number,
      o.status,
      o.payment_proof,
      o.createdAt,
      GROUP_CONCAT(CONCAT(m.name, ' x', oi.quantity) SEPARATOR ', ') AS items
    FROM orders o
    JOIN order_items oi ON o.order_id = oi.order_id
    JOIN menu m ON oi.menu_id = m.id
    GROUP BY o.order_id
    ORDER BY o.createdAt DESC
  `);

  return rows;
};

export const createOrder = async (data, items) => {
  const { order_id, table_number, total_price, status, payment_proof } = data;

  const [result] = await db.query(
    "INSERT INTO orders (order_id, table_number, total_price, status, payment_proof) VALUES (?, ?, ?, ?, ?)",
    [order_id, table_number, total_price, status, payment_proof]
  );

  const orderId = result.insertId;

  for (let item of items) {
    await db.query(
      "INSERT INTO order_items (order_id, menu_id, quantity, subtotal) VALUES (?, ?, ?, ?)",
      [orderId, item.menu_id, item.quantity, item.subtotal]
    );
  }
};

export const updateOrderStatus = async (order_id, status) => {
  const [result] = await db.execute(
    "UPDATE orders SET status = ? WHERE order_id = ?",
    [status, order_id]
  );

  return result;
};
