const wishlistDao = require("../dao/wishlist_dao");
const wishmodel = require("../model/wishlist");

const createWishlist = async (req, res) => {
  try {
    const wishlist = await wishlistDao.createWishlistDao(req.body);
    res.status(201).json(wishlist);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const removeItemFromWishlist = async (req, res) => {
  const { userId, productId } = req.body;
  try {
    const wishlist = await wishlistDao.updateWishlistDao(userId, {
      $pull: { items: { product: productId } },
    });
    res.status(200).json(wishlist);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const updateWishlist = async (req, res) => {
  try {
    const wishlist = await wishlistDao.updateWishlistDao(
      req.params.id,
      req.body
    );
    if (!wishlist) {
      return res.status(404).json({ error: "Wishlist not found" });
    }
    res.status(200).json(wishlist);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const getAllWishlists = async (req, res) => {
  try {
    const wishlists = await wishlistDao.getWishlistDao();
    res.status(200).json(wishlists);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getWishlistByUserId = async (req, res) => {
  try {
    const wishlist = await wishlistDao.getSingleWishlistByIdDao(req.params.id);
    if (!wishlist) {
      return res.status(404).json({ error: "Wishlist not found" });
    }
    res.status(200).json(wishlist);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const deleteWishlistByUserId = async (req, res) => {
  try {
    const wishlist = await wishlistDao.deleteWishlistDao(req.params.id);
    if (!wishlist) {
      return res.status(404).json({ error: "Wishlist not found" });
    }
    res.status(200).json({ message: "Wishlist deleted" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  createWishlist,
  removeItemFromWishlist,
  updateWishlist,
  getAllWishlists,
  getWishlistByUserId,
  deleteWishlistByUserId,
};
