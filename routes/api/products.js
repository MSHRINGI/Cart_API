const express = require("express");
const router = express.Router();

const productsController = require("../../controllers/productsController");

router.get("/list", productsController.productsList);
router.post("/add", productsController.addProduct);

module.exports = router;
