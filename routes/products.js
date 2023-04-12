const express = require("express");
const productsRepo = require("../repositories/products");

const router = express.Router();

router.get("/", async (req, res) => {
  const products = await productsRepo.getAll(); //grab all products
  res.send("Products!!!");
});

module.exports = router;
