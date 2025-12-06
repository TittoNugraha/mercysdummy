import express from "express";
import db from "../config/db.js";

const router = express.Router();

// REGISTER ADMIN
router.post("/register", async (req, res) => {
  const { username, password, name } = req.body;

  if (!username || !password || !name) {
    return res.status(400).json({ message: "Semua kolom wajib diisi!" });
  }

  try {
    // cek username / nama
    const [exist] = await db.query(
      "SELECT * FROM admin WHERE username = ? OR name = ?",
      [username, name]
    );

    if (exist.length > 0) {
      return res
        .status(400)
        .json({ message: "Username atau nama sudah digunakan!" });
    }

    // insert admin
    await db.query(
      "INSERT INTO admin (username, password, name) VALUES (?, ?, ?)",
      [username, password, name]
    );

    res.json({ message: "Registrasi admin berhasil" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});

// LOGIN ADMIN
router.post("/login", async (req, res) => {
  const { username, password } = req.body;

  try {
    const [rows] = await db.query(
      "SELECT * FROM admin WHERE username = ? AND password = ?",
      [username, password]
    );

    if (rows.length === 0) {
      return res.status(401).json({ message: "Username atau password salah!" });
    }

    res.json({
      message: "Login berhasil",
      admin: {
        id: rows[0].id,
        username: rows[0].username,
        name: rows[0].name,
      },
    });
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
});

export default router;
