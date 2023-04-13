const express = require("express");
const cartsRepo = require("../carts");

const router = express.Router();

//Receive post request to add item to cart
router.post("/cart/products", async (req, res) => {
  //figure out the cart
  if (!req.session.cartId) {
    //we don't have a cart, we need to make one
    //store the cart id on the req.session.cartId
    const cart = await cartsRepo.create({ items: [] });
  } else {
    //we have a cart, let's get it from the repo
  }
});

//receive post request to delete item from cart

module.exports = router;
