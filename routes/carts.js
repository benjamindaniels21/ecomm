const express = require("express");

const router = express.Router();

//Receive post request to add item to cart
router.post("/cart/products", (req, res) => {
  console.log(req.body.productId);

  res.send("Product added to cart!");
});
//receive GET request to show all items in cart

//receive post request to delete item from cart

module.exports = router;
