const Wishlist = require("../model/wishlist");

const getWishlistDao = async () => {
  try {
    const wishlists = await Wishlist.find().populate("items.product");
    console.log(wishlists);
    return wishlists;
  } catch (error) {
    console.error("Error fetching wishlists:", error);
    return [];
  }
};

const createWishlistDao = async (data) => {
  try {
    const wishlist = new Wishlist(data);
    await wishlist.save();
    console.log(wishlist);
    return wishlist;
  } catch (error) {
    console.error("Error saving wishlist:", error);
    return null;
  }
};

const getSingleWishlistByIdDao = async (id) => {
  try {
    const wishlist = await Wishlist.findById(id).populate("items.product");
    console.log(wishlist);
    return wishlist;
  } catch (error) {
    console.error("Error fetching wishlist:", error);
    return null;
  }
};

const updateWishlistDao = async (id, updateData) => {
  try {
    const wishlist = await Wishlist.findByIdAndUpdate(id, updateData, {
      new: true,
      runValidators: true,
    }).populate("items.product");
    console.log(wishlist);
    return wishlist;
  } catch (error) {
    console.error("Error updating wishlist in DB:", error.message);
    throw new Error("Failed to update wishlist");
  }
};

const deleteWishlistDao = async (id) => {
  try {
    const wishlist = await Wishlist.findByIdAndDelete(id);
    console.log(wishlist);
    return wishlist;
  } catch (error) {
    console.error("Error deleting wishlist:", error);
    return null;
  }
};

module.exports = {
  getWishlistDao,
  createWishlistDao,
  getSingleWishlistByIdDao,
  updateWishlistDao,
  deleteWishlistDao,
};
