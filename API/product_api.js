const express = require("express");

const product = express.Router();
const product_services = require("../services/product_services");

product.get("/", product_services.getproduct);
product.get("/:id", product_services.getProductById);
product.get("/by_category/:category_id", product_services.getcategoryproduct);
module.exports = product;
