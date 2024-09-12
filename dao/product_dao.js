const Product = require("../model/product");

// Get all products
const getproduct = async () => {
  try {
    const products = await Product.find();
    console.log("Fetched products:", products);
    return products;
  } catch (error) {
    console.error("Error fetching products from DB:", error.message);
    throw new Error("Failed to fetch products");
  }
};

// Add a new product
const addProduct = async (productData) => {
  try {
    console.log("Adding product with data:", productData);
    const newProduct = new Product(productData);
    const savedProduct = await newProduct.save();
    console.log("Product saved:", savedProduct);
    return savedProduct;
  } catch (error) {
    console.error("Error adding product to DB:", error.message);
    throw new Error("Failed to add product");
  }
};

// Get a product by ID
const getProductById = async (id) => {
  try {
    const product = await Product.findById(id);
    if (!product) {
      throw new Error("Product not found");
    }
    return product;
  } catch (error) {
    console.error("Error fetching product from DB:", error.message);
    throw new Error("Failed to fetch product");
  }
};

// Delete a product by ID
const deleteProductById = async (id) => {
  try {
    const product = await Product.findByIdAndDelete(id);
    if (!product) {
      throw new Error("Product not found");
    }
    return product;
  } catch (error) {
    console.error("Error deleting product from DB:", error.message);
    throw new Error("Failed to delete product");
  }
};

// Update a product by ID
const updateProduct = async (id, updateData) => {
  try {
    console.log("Updating product with ID:", id, "and data:", updateData);
    const product = await Product.findByIdAndUpdate(id, updateData, {
      new: true,
      runValidators: true,
    });
    if (!product) {
      throw new Error("Product not found");
    }
    return product;
  } catch (error) {
    console.error("Error updating product in DB:", error.message);
    throw new Error("Failed to update product");
  }
};

module.exports = {
  getproduct,
  addProduct,
  getProductById,
  updateProduct,
  deleteProductById,
};
