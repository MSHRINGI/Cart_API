const express = require("express");
const router = express.Router();

// router.use("/products", require("./products"));
// router.use("/cart", require("./cart"));
router.use("/api", require("./api"));

module.exports = router;
