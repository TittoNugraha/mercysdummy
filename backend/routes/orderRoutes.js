import express from "express";
import multer from "multer";
import path from "path";
import crypto from "crypto";
import { fileURLToPath } from "url";
import {
  getOrders,
  createOrder,
  updateOrderStatus,
  getOrderById,
} from "../controllers/orderController.js";

const router = express.Router();
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(__dirname, "../uploads"));
  },
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname);
    const uniqueName = crypto.randomBytes(16).toString("hex") + ext;
    cb(null, uniqueName);
  },
});

const upload = multer({ storage });

router.get("/orders", getOrders);
router.post("/orders", upload.single("payment_proof"), createOrder);
router.patch("/orders/:order_id/status", updateOrderStatus);
router.get("/orders/:orderId", getOrderById);

export default router;
