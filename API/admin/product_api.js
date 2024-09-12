const express = require("express");

const product = express.Router();
const product_services = require("../../services/product_services");

product.get("/", product_services.getproduct);
product.post("/", product_services.addProduct);
product.get("/:id", product_services.getProductById);
product.delete("/:id", product_services.deleteProductById);
product.put("/:id", product_services.editProductById);

module.exports = product;
