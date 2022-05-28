const mongoose = require("mongoose");
const multer = require("multer");
const path = require("path");

const productSchema = new mongoose.Schema(
  {
    product_name: {
      type: String,
    },
    product_image: {
      type: String,
    },
    description: {
      type: String,
    },
    quantity: {
      type: Number,
    },
    unit_price: {
      type: Number,
    },
  },
  {
    timestamps: true,
  }
);

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/");
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + "-" + file.originalname);
  },
});

const fileFilter = (req, file, cb) => {
  if (
    file.mimetype === "image/jpeg" ||
    file.mimetype === "image/jpg" ||
    file.mimetype === "image/png"
  ) {
    cb(null, true);
  } else {
    cb(null, false);
  }
};

// static method
productSchema.statics.uploadedImage = multer({
  storage: storage,
  limits: {
    fieldSize: 1024 * 1024 * 5,
  },
  fileFilter: fileFilter,
}).single("product_image");

const Product = mongoose.model("Product", productSchema);
module.exports = Product;
