const Category = require("../model/Category");

// Create a new category
const createCategory = async (categoryData) => {
  try {
    const category = new Category(categoryData);
    console.log("hfbchsdbchsb", category);
    return await category.save();
  } catch (error) {
    throw new Error("Failed to create categdfsdfsdfsdory: " + error.message);
  }
};

// Get all categories
const getAllCategories = async () => {
  try {
    return await Category.find();
  } catch (error) {
    throw new Error("Failed to fetch categories: " + error.message);
  }
};

// Get a category by ID
const getCategoryById = async (id) => {
  try {
    return await Category.findById(id);
  } catch (error) {
    throw new Error("Failed to fetch category: " + error.message);
  }
};

// Update a category by ID
const updateCategoryById = async (id, updateData) => {
  try {
    return await Category.findByIdAndUpdate(id, updateData, {
      new: true,
      runValidators: true,
    });
  } catch (error) {
    throw new Error("Failed to update category: " + error.message);
  }
};

// Delete a category by ID
const deleteCategoryById = async (id) => {
  try {
    return await Category.findByIdAndDelete(id);
  } catch (error) {
    throw new Error("Failed to delete category: " + error.message);
  }
};

module.exports = {
  createCategory,
  getAllCategories,
  getCategoryById,
  updateCategoryById,
  deleteCategoryById,
};
