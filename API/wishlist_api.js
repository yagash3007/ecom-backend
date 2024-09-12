const express = require("express");
const wishlist = express.Router();
const wishlist_services = require("../services/wishlist_services");

wishlist.post("/", wishlist_services.createWishlist);

wishlist.get("/", wishlist_services.getAllWishlists);
wishlist.get("/:id", wishlist_services.getAllWishlists);

wishlist.post("/", wishlist_services.createWishlist);

wishlist.post("/remove", wishlist_services.removeItemFromWishlist);

wishlist.delete("/:id", wishlist_services.deleteWishlistByUserId);

module.exports = wishlist;
