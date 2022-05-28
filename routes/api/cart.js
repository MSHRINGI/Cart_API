const express = require("express");
const router = express.Router();

const cartController = require("../../controllers/cartController");

router.get("/list", cartController.list);
router.post("/add/:productId", cartController.add);
router.post("/update/:cartId", cartController.update);

module.exports = router;
