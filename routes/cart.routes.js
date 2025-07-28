const express = require("express");
const { isUser } = require("../middleware/middleware");
const router = express.Router();
const {
  addToCart,
  getCart,
  updateCartItem,
  removeItemFromCart,
  clearCart,
} = require("../controllers/cart.controller");
router.use(isUser);

router.post("/add", addToCart);
router.get("/:userId", getCart);
router.put("/update", updateCartItem);
router.put("/remove", removeItemFromCart);
router.delete("/clear/:userId", clearCart);

module.exports = router;
