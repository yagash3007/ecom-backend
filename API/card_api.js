const express = require("express");
const cart_services = require("../services/cart_services");
const userRoleMiddleware = require("./middleware/userRolemiddleware");
const authenticateToken = require("./middleware/authenticateToken");
const cart = express.Router();

// Apply userRoleMiddleware to all cart routes
cart.post("/", userRoleMiddleware, cart_services.createCart);
cart.get("/", userRoleMiddleware, cart_services.getAllCarts);
cart.get("/:id", userRoleMiddleware, cart_services.getCartByUserId);
cart.put("/updatecart/", userRoleMiddleware, cart_services.updateCartByUserId);
cart.put("/", cart_services.removeProductFromCart);

// cart.delete(
//   "/cart/:cartId/items/:itemId",
//   authenticateToken,
//   async (req, res) => {
//     try {
//       const { cartId, itemId } = req.params;
//       const userId = req.user.userId;

//       const cart = await cart_services.findOne({ _id: cartId, user: userId });
//       if (!cart) return res.status(404).send("Cart not found");

//       cart.items = cart.items.filter((item) => item._id.toString() !== itemId);
//       await cart.save();

//       res.status(200).json(cart);
//     } catch (err) {
//       res.status(500).send("Server error");
//     }
//   }
// );

module.exports = cart;
