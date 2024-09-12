const Product = require("../model/product");

const product_dao = require("../dao/product_dao");

const getcategoryproduct = async (req, res) => {
  const { category_id } = req.params;
  console.log(category_id);
  try {
    const products = await Product.find({ category: category_id });
    console.log();
    res.json(products);
  } catch (err) {
    console.log(err);
    res.json(err);
  }
};

// Get all products
const getproduct = async (req, res) => {
  try {
    const products = await product_dao.getproduct();
    console.log("Fetched products:", products);

    if (products.length === 0) {
      return res.status(404).json({ message: "No products found" });
    }

    return res.status(200).json(products);
  } catch (error) {
    console.error("Error fetching products:", error.message);
    return res.status(500).json({ error: error.message });
  }
};
const addProduct = async (req, res) => {
  try {
    const { name, description, price, category, imageUrls } = req.body;

    // Validate required fields
    if (!name || !description || !price || !category || !imageUrls) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    // Validate price
    if (typeof price !== "number" || price <= 0) {
      return res
        .status(400)
        .json({ message: "Price must be a positive number" });
    }

    // Validate imageUrls
    if (!Array.isArray(imageUrls)) {
      return res
        .status(400)
        .json({ message: "imageUrls must be an array of strings" });
    }

    for (const url of imageUrls) {
      if (
        typeof url !== "string" ||
        !url.match(/https?:\/\/.+\.(jpg|jpeg|png|webp|gif)$/)
      ) {
        return res
          .status(400)
          .json({ message: "Each image URL must be a valid string" });
      }
    }

    // Save the product
    const savedProduct = await product_dao.addProduct({
      name,
      description,
      price,
      category,
      imageUrls,
    });

    return res.status(201).json(savedProduct);
  } catch (error) {
    console.error("Error adding product:", error.message);
    return res.status(500).json({ error: "Failed to add product" });
  }
};

// Get a product by ID
const getProductById = async (req, res) => {
  try {
    console.log("Insdei FunctiohOIdoi");

    const { id } = req.params;

    if (!id) {
      return res.status(400).json({ message: "Product ID is required" });
    }

    const product = await product_dao.getProductById(id);

    if (!product) {
      return res.status(404).json({ error: "Product not found" });
    }

    return res.status(200).json(product);
  } catch (error) {
    console.error("Error fetching product:", error.message);
    return res.status(500).json({ error: error.message });
  }
};

// Delete a product by ID
const deleteProductById = async (req, res) => {
  try {
    const { id } = req.params;

    if (!id) {
      return res.status(400).json({ message: "Product ID is required" });
    }

    const product = await product_dao.deleteProductById(id);

    if (!product) {
      return res.status(404).json({ error: "Product not found" });
    }

    return res.status(200).json({ message: "Product deleted" });
  } catch (error) {
    console.error("Error deleting product:", error.message);
    return res.status(500).json({ error: error.message });
  }
};

// Edit a product by ID
const editProductById = async (req, res) => {
  try {
    const { id } = req.params;
    const updateData = req.body;

    if (!id) {
      return res.status(400).json({ message: "Product ID is required" });
    }

    for (const key in updateData) {
      if (
        (typeof updateData[key] === "string" &&
          updateData[key].trim() === "") ||
        (key === "price" && isNaN(updateData[key])) ||
        (key === "stock" && isNaN(updateData[key])) ||
        (key === "imageUrls" && !Array.isArray(updateData[key]))
      ) {
        return res.status(400).json({ message: `${key} invalid ` });
      }
    }

    const product = await product_dao.updateProduct(id, updateData);

    if (!product) {
      return res.status(404).json({ error: "Product not found" });
    }

    return res.status(200).json(product);
  } catch (error) {
    console.error("Error updating product:", error.message);
    return res.status(500).json({ error: "Server error" });
  }
};

module.exports = {
  getproduct,
  addProduct,
  getProductById,
  deleteProductById,
  editProductById,
  getcategoryproduct,
};
