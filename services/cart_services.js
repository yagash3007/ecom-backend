const cart_dao = require("../dao/cart_dao");

// Create a new cart
const createCart = async (req, res) => {
  try {
    const cart = await cart_dao.createCart(req.body);
    res.status(201).json(cart);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
const removeProductFromCart = async (req, res) => {
  const userId = req.body.userId;
  const productId = req.body.productId;
  console.log(userId, productId);
  try {
    const cart = await cart_dao.removeProductFromCart(userId, productId);
    res.status(200).json(cart);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const updateCartByUserId = async (req, res) => {
  try {
    const cart = await cart_dao.updateCartByUserId(req.body.user, req.body);
    if (!cart) {
      return res.status(404).json({ error: "Cart not found" });
    }
    res.status(200).json(cart);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
// };
// const updateCartByUserId = async (req, res) => {
//   try {
//     const cart = await cart_dao.updateCartByUserId(
//       req.params.id,
//       req.body.productId
//     );
//     if (!cart) {
//       return res.status(404).json({ error: "Cart not found" });
//     }
//     res.status(200).json(cart);
//   } catch (error) {
//     res.status(400).json({ error: error.message });
//   }
// };

// Get all carts
const getAllCarts = async (req, res) => {
  try {
    const carts = await cart_dao.getAllCarts();
    res.status(200).json(carts);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// // Get a single cart by user ID
const getCartByUserId = async (req, res) => {
  try {
    const { id } = req.params;
    console.log(id, "id caRT");

    const cart = await cart_dao.getCartByUserId(id);
    if (!cart) {
      return res.status(404).json({ error: "Cart not found" });
    }
    res.status(200).json(cart);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Delete a cart by user ID
const deleteCartByUserId = async (req, res) => {
  try {
    const cart = await cart_dao.deleteCartByUserId(req.params.id);
    if (!cart) {
      return res.status(404).json({ error: "Cart not found" });
    }
    res.status(200).json({ message: "Cart deleted" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  getCartByUserId,
  createCart,
  getAllCarts,
  deleteCartByUserId,
  removeProductFromCart,
  updateCartByUserId,
};
