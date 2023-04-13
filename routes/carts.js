const express = require("express");
const cartsRepo = require("../repositories/carts");

const router = express.Router();

//Receive post request to add item to cart
router.post("/cart/products", async (req, res) => {
  //figure out the cart
  let cart;
  if (!req.session.cartId) {
    //we don't have a cart, we need to make one
    //store the cart id on the req.session.cartId
    cart = await cartsRepo.create({ items: [] });
    req.session.cartId = cart.id;
  } else {
    //we have a cart, let's get it from the repo
    cart = await cartsRepo.getOne(req.session.cartId);
  }

  //Either increment quantity for existing product
  //OR add new product to items array

  const existingItem = cart.items.find(
    (item) => item.id === req.body.productId
  );

  if (existingItem) {
    //increment quantity
    existingItem.quantity++;
  } else {
    //add to array
    cart.items.push({ id: req.body.productId, quantity: 1 });
  }
  await cartsRepo.update(cart.id, {
    items: cart.items,
  });

  res.send("Product Added to Cart");
});

//receive post request to delete item from cart

module.exports = router;
