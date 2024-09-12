const express = require("express");
const order_services = require("../services/order_services");
const order = express.Router();
order.post("/", order_services.createOrder);
order.get("/", order_services.getAllOrders);
order.get("/:id", order_services.getOrderById);
order.put("/:id", order_services.updateOrderById);
order.delete("/:id", order_services.deleteOrderById);

module.exports = order;
