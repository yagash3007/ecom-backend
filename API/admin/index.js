const express = require("express");
// const user = require("./API/user_api");
// const payment = require("./API/payment_api");

const product = require("./product_api");
const users = require("./user_api");
const orders = require("./orders_api");
const category = require("./category_api");
const adminRoleMiddleware = require("../middleware/adminRolemiddleware");

const adminRoutes = express.Router();
adminRoutes.use(express.json());

adminRoutes.use(adminRoleMiddleware);

adminRoutes.use("/category", category);
adminRoutes.use("/users", users);
adminRoutes.use("/order", orders);
adminRoutes.use("/product", product);

module.exports = adminRoutes;
