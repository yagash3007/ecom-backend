const express = require("express");
const category_services = require("../services/category_services");
const category = express.Router();

category.post("/", category_services.createCategory);
category.get("/", category_services.getAllCategories);
category.get("/:id", category_services.getCategoryById);
category.put("/:id", category_services.updateCategoryById);
category.delete("/:id", category_services.deleteCategoryById);

module.exports = category;
