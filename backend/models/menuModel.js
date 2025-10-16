import db from "../config/db.js";

export const getAllMenu = async () => {
  const [rows] = await db.query("SELECT * FROM menu");
  return rows;
};

export const createMenu = async (data) => {
  const { name, price, category, available, photo } = data;
  await db.query(
    "INSERT INTO menu (name, price, category, available, photo) VALUES (?, ?, ?, ?, ?)",
    [name, price, category, available, photo]
  );
};

export const updateMenu = async (id, data) => {
  const { name, price, category, photo } = data;
  await db.query(
    "UPDATE menu SET name=?, price=?, category=?, photo=? WHERE id=?",
    [name, price, category, photo, id]
  );
};

export const toggleMenuAvailability = async (id, available) => {
  await db.query("UPDATE menu SET available=? WHERE id=?", [available, id]);
};
