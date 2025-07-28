const Product = require("../models/product.model");
const Category = require("../models/category.model");

const createProduct = async (req, res) => {
  try {
    const {
      name,
      description,
      richDescription,
      image,
      images,
      brand,
      price,
      category,
      countInStock,
      rating,
      numReviews,
      isFeatured,
    } = req.body;

    if (!name || !description || !category || countInStock === undefined) {
      return res.status(400).json({ message: "Required fields are missing" });
    }

    if (typeof name !== "string" || name.trim() === "") {
      return res.status(400).json({ message: "Invalid product name" });
    }

    if (typeof price !== "undefined" && typeof price !== "number") {
      return res.status(400).json({ message: "Price must be a number" });
    }

    if (
      typeof countInStock !== "number" ||
      countInStock < 0 ||
      countInStock > 255
    ) {
      return res.status(400).json({ message: "Invalid countInStock" });
    }

    const categoryExists = await Category.findById(category);
    if (!categoryExists) {
      return res.status(400).json({ message: "Invalid category ID" });
    }

    const product = new Product({
      name: name.trim(),
      description: description.trim(),
      richDescription: richDescription || "",
      image: image || "",
      images: Array.isArray(images) ? images : [],
      brand: brand || "",
      price: price || 0,
      category,
      countInStock,
      rating: rating || 0,
      numReviews: numReviews || 0,
      isFeatured: isFeatured || false,
    });

    const savedProduct = await product.save();
    res.status(201).json(savedProduct);
  } catch (error) {
    console.error("Create Product Error:", error);
    res.status(500).json({ message: "Server error" });
  }
};

const getAllProducts = async (req, res) => {
  try {
    const productList = await Product.find().populate("category", "name");
    res.status(200).json(productList);
  } catch (error) {
    console.error("Get Products Error:", error);
    res.status(500).json({ message: "Server error" });
  }
};

const getProductById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id).populate(
      "category",
      "name"
    );
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }
    res.status(200).json(product);
  } catch (error) {
    console.error("Get Product by ID Error:", error);
    res.status(500).json({ message: "Server error" });
  }
};

const updateProduct = async (req, res) => {
  try {
    const productId = req.params.id;
    const updates = req.body;

    const productExists = await Product.findById(productId);
    if (!productExists) {
      return res.status(404).json({ message: "Product not found" });
    }

    if (updates.category) {
      const categoryExists = await Category.findById(updates.category);
      if (!categoryExists) {
        return res.status(400).json({ message: "Invalid category ID" });
      }
    }

    if (
      updates.countInStock &&
      (updates.countInStock < 0 || updates.countInStock > 255)
    ) {
      return res.status(400).json({ message: "Invalid countInStock" });
    }

    const updatedProduct = await Product.findByIdAndUpdate(productId, updates, {
      new: true,
    });
    res.status(200).json(updatedProduct);
  } catch (error) {
    console.error("Update Product Error:", error);
    res.status(500).json({ message: "Server error" });
  }
};

const deleteProduct = async (req, res) => {
  try {
    const productId = req.params.id;
    const deleted = await Product.findByIdAndDelete(productId);
    if (!deleted) {
      return res.status(404).json({ message: "Product not found" });
    }
    res.status(200).json({ message: "Product deleted successfully" });
  } catch (error) {
    console.error("Delete Product Error:", error);
    res.status(500).json({ message: "Server error" });
  }
};

module.exports = {
  createProduct,
  getAllProducts,
  getProductById,
  updateProduct,
  deleteProduct,
};
