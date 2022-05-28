const Product = require("../models/product");

// for fetching the list of all the product created
module.exports.productsList = async function (req, res) {
  try {
    let products = await Product.find({});
    return res.status(200).json({
      data: {
        message: "List of all the products available",
        products: products,
      },
    });
  } catch (err) {
    console.log("Error in rendering the list", err);
    res.status(501).json({
      data: {
        message: "Error in rendering the list",
      },
    });
  }
};

// For adding the product
module.exports.addProduct = async function (req, res) {
  try {
    let product = await Product.create({});

    // call the static fuction from Product
    Product.uploadedImage(req, res, function (err) {
      if (err) {
        console.log("Error in uploading file with multer", err);
        return res.status(501).json({
          data: {
            message: "Error in uploading file with multer",
          },
        });
      }

      // checking required field is filled or not
      if (
        !req.body.product_name ||
        !req.file ||
        !req.body.quantity ||
        !req.body.description ||
        !req.body.unit_price
      ) {
        product.remove();
        return res.status(400).json({
          data: {
            message:
              "Please fill all the details in multipart form data, like below example(please use same key name)",
            product_name: "Please provide name of your product",
            product_image:
              "You need to upload an image file(should be in .jpeg/.jpg/.png only)",
            quantity: "Please provide the quntity of product you want to add",
            description: "This is description related product",
            unit_price: "Please set the price of a product",
          },
        });
      }

      // adding all the details of product
      product.product_name = req.body.product_name;
      product.description = req.body.description;
      product.quantity = req.body.quantity;
      product.unit_price = req.body.unit_price;
      product.product_image = req.file.path;

      product.save().then((result) => {
        return res.status(200).json({
          data: {
            message: "Product added successfully",
            product: product,
          },
        });
      });
    });
  } catch (err) {
    console.log("Error in adding the product", err);
    return res.status(501).json({
      message: "Error in adding the product",
    });
  }
};
