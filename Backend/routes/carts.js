const express = require("express");
const router = express.Router();
const { Cart } = require("../models/cart");

// Get cart for a user
router.get("/:userId", async (req, res) => {
  const cart = await Cart.findOne({ user: req.params.userId }).populate(
    "items.product"
  );
  if (!cart) return res.status(404).send("Cart not found");
  res.send(cart);
});

// Add item to cart
router.post("/", async (req, res) => {
  const { user, productId, quantity } = req.body;
  let cart = await Cart.findOne({ user });

  if (!cart) {
    cart = new Cart({ user, items: [{ product: productId, quantity }] });
  } else {
    const existingItem = cart.items.find(
      (item) => item.product.toString() === productId
    );
    if (existingItem) {
      existingItem.quantity += quantity;
    } else {
      cart.items.push({ product: productId, quantity });
    }
  }

  await cart.save();
  res.send(cart);
});

// Update quantity
router.put("/", async (req, res) => {
  const { user, productId, quantity } = req.body;
  const cart = await Cart.findOne({ user });
  if (!cart) return res.status(404).send("Cart not found");

  const item = cart.items.find((item) => item.product.toString() === productId);
  if (item) {
    item.quantity = quantity;
    await cart.save();
    return res.send(cart);
  }

  res.status(404).send("Product not found in cart");
});

// Remove item
router.delete("/", async (req, res) => {
  const { user, productId } = req.body;
  const cart = await Cart.findOne({ user });
  if (!cart) return res.status(404).send("Cart not found");

  cart.items = cart.items.filter(
    (item) => item.product.toString() !== productId
  );
  await cart.save();
  res.send(cart);
});

module.exports = router;
