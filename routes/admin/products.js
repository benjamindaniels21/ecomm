const express = require("express");
const productsRepo = require("../../repositories/products");

const router = express.Router();

router.get("/admin/products", (req, rest) => {});

router.get("/admin/products/new", (req, res) => {});

module.exports = router;
