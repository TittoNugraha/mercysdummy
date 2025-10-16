import express from "express";
import multer from "multer";
import path from "path";
import crypto from "crypto";
import {
  getMenu,
  addMenu,
  editMenu,
  deleteMenu,
  updateAvailability,
} from "../controllers/menuController.js";

const router = express.Router();

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname);
    const uniqueName = crypto.randomBytes(16).toString("hex") + ext;
    cb(null, uniqueName);
  },
});

const upload = multer({ storage });

router.get("/", getMenu);
router.post("/", upload.single("photo"), addMenu);
router.put("/:id", upload.single("photo"), editMenu);
router.patch("/:id/availability", updateAvailability);
router.delete("/:id", deleteMenu);
export default router;
