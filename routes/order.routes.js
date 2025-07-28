const express = require("express");
const { isUser, isAdmin } = require("../middleware/middleware");
const {
  createOrder,
  getAllOrders,
  getOrderById,
  updateOrderStatus,
  deleteOrder,
  getTotalSales,
  getUserOrders,
} = require("../controllers/order.controller");
const router = express.Router();

router.use(isUser);

router.post("/", createOrder);
router.get("/", getAllOrders);
router.get("/:id", getOrderById);
router.put("/:id", isAdmin, updateOrderStatus);
router.delete("/:id", isAdmin, deleteOrder);
router.get("/get/totalsales", isAdmin, getTotalSales);
router.get("/user/:userId", getUserOrders);

module.exports = router;
