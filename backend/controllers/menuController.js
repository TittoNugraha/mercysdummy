import * as Menu from "../models/menuModel.js";
import db from "../config/db.js";

export const getMenu = async (req, res) => {
  try {
    const menu = await Menu.getAllMenu();
    res.json(menu);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const addMenu = async (req, res) => {
  try {
    console.log("REQ BODY:", req.body);
    console.log("REQ FILE:", req.file?.filename);
    const data = {
      name: req.body.name,
      price: req.body.price,
      category: req.body.category,
      available: req.body.available === "true" ? 1 : 0,
      photo: req.file ? `/uploads/${req.file.filename}` : null,
    };
    await Menu.createMenu(data);
    res.json({ message: "Menu berhasil ditambahkan" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const editMenu = async (req, res) => {
  try {
    const data = {
      ...req.body,
      photo: req.file ? `/uploads/${req.file.filename}` : req.body.photo,
    };
    await Menu.updateMenu(req.params.id, data);
    res.json({ message: "Menu berhasil diupdate" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const toggleMenu = async (req, res) => {
  try {
    const { available } = req.body;
    await Menu.toggleMenuAvailability(req.params.id, available);
    res.json({ message: "Status menu berhasil diubah" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const updateAvailability = async (req, res) => {
  const { id } = req.params;
  const { available } = req.body;

  try {
    await db.query("UPDATE menu SET available=? WHERE id=?", [available, id]);

    const [rows] = await db.query("SELECT * FROM menu WHERE id=?", [id]);

    res.json(rows[0]);
  } catch (err) {
    console.error(err);
    res
      .status(500)
      .json({ message: "Gagal update availability", error: err.message });
  }
};

export const deleteMenu = async (req, res) => {
  const { id } = req.params;
  try {
    await db.query("DELETE FROM order_items WHERE menu_id = ?", [id]);

    await db.query("DELETE FROM menu WHERE id = ?", [id]);

    res.json({ message: "Menu berhasil dihapus" });
  } catch (err) {
    console.error("Error hapus menu:", err);
    res.status(500).json({ message: "Gagal hapus menu", error: err.message });
  }
};
