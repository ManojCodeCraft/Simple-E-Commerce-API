const express = require("express");
const { isUser, isAdmin } = require("../middleware/middleware");
const router = express.Router();
const {
  createProduct,
  getAllProducts,
  getProductById,
  updateProduct,
  deleteProduct,
} = require("../controllers/product.controller");

router.use(isUser);

router.post("/", isAdmin, createProduct);
router.get("/", getAllProducts);
router.get("/:id", getProductById);
router.put("/:id", isAdmin, updateProduct);
router.delete("/:id", isAdmin, deleteProduct);

module.exports = router;
