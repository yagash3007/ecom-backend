const Cart = require("../model/card");

// Create a new cart
const createCart = async (cartData) => {
  try {
    const cart = new Cart(cartData);
    return await cart.save();
  } catch (error) {
    throw new Error("Failed to create cart: " + error.message);
  }
};
const removeProductFromCart = async (userId, productId) => {
  try {
    const cart = await Cart.findOneAndUpdate(
      { user: userId },
      { $pull: { items: { product: productId } } },
      { new: true, runValidators: true }
    ).populate("items.product");
    console.log("sdijasoidjaoidjaoisjdajdoi");

    return cart;
  } catch (error) {
    throw new Error("Failed to remove product from cart: " + error.message);
  }
};
// const updateCartByUserId = async (userId, productId) => {
//   try {
//     return await Cart.findOneAndUpdate(
//       { user: userId },
//       { $pull: { items: { product: productId } } }, // Remove the product from the cart
//       {
//         new: true,
//         runValidators: true,
//       }
//     ).populate("items.product"); // Populate if needed
//   } catch (error) {
//     throw new Error("Failed to update cart: " + error.message);
//   }
// };

const updateCartByUserId = async (userId, updateData) => {
  try {
    return await Cart.findOneAndUpdate({ user: userId }, updateData, {
      new: true,
      runValidators: true,
    }).populate("items.product");
  } catch (error) {
    throw new Error("Failed to update cart: " + error.message);
  }
};

// Get all carts
const getAllCarts = async () => {
  try {
    return await Cart.find(); // Add .populate() if needed
  } catch (error) {
    throw new Error("Failed to fetch carts: " + error.message);
  }
};
const getCartByUserId = async (userId) => {
  try {
    const cart = await Cart.findOne({
      user: userId,
    }).populate("items.product");
    return cart;
  } catch (error) {
    throw new Error("Failed to fetch cart: " + error.message);
  }
};
// Update a cart by user ID
// const updateCartByUserId = async (userId, updateData) => {
//   try {
//     return await Cart.findOneAndUpdate({ user: userId }, updateData, {
//       // Changed from _id to user
//       new: true,
//       runValidators: true,
//     }).populate("items.product"); // Populate if needed
//   } catch (error) {
//     throw new Error("Failed to update cart: " + error.message);
//   }
// };

// Delete a cart by user ID
const deleteCartByUserId = async (userId) => {
  try {
    return await Cart.findOneAndDelete({ user: userId }); // Changed from _id to user
  } catch (error) {
    throw new Error("Failed to delete cart: " + error.message);
  }
};

module.exports = {
  createCart,
  getAllCarts,
  getCartByUserId,
  updateCartByUserId,
  deleteCartByUserId,
  removeProductFromCart,
};
