const Order = require("../model/orders");

// Create a new order
const createOrder = async (orderData) => {
  try {
    const order = new Order(orderData);
    return await order.save();
  } catch (error) {
    throw new Error("Failed to create order: " + error.message);
  }
};

// Get all orders
const getAllOrders = async () => {
  try {
    return await Order.find();
  } catch (error) {
    throw new Error("Failed to fetch orders: " + error.message);
  }
};

// Get an order by ID
const getOrderById = async (id) => {
  try {
    return await Order.findById(id);
  } catch (error) {
    throw new Error("Failed to fetch order: " + error.message);
  }
};

// Update an order by ID
const updateOrderById = async (id, updateData) => {
  try {
    return await Order.findByIdAndUpdate(id, updateData, {
      new: true,
      runValidators: true,
    });
  } catch (error) {
    throw new Error("Failed to update order: " + error.message);
  }
};

// Delete an order by ID
const deleteOrderById = async (id) => {
  try {
    return await Order.findByIdAndDelete(id);
  } catch (error) {
    throw new Error("Failed to delete order: " + error.message);
  }
};

module.exports = {
  createOrder,
  getAllOrders,
  getOrderById,
  updateOrderById,
  deleteOrderById,
};
