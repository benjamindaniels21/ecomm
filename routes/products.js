const express = require("express");
const productsRepo = require("../repositories/products");
const productsIndexTemplate = require("../views/products/index");

const router = express.Router();

router.get("/", async (req, res) => {
  const products = await productsRepo.getAll(); //grab all products
  res.send(productsIndexTemplate({ products }));
});

module.exports = router;
