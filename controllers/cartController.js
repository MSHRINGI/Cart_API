const Cart = require("../models/cart");
const Product = require("../models/product");

// checking given value of quantity in body is valid or not for adding/updating to the cart
let checkQuantity = function (productQuantity, cartQuantity) {
  if (cartQuantity > productQuantity) {
    return false;
  } else {
    return true;
  }
};

// for rendering the list of cart products
module.exports.list = async function (req, res) {
  try {
    let cartList = await Cart.find({}).populate("product");
    return res.status(200).json({
      data: {
        message: "Here is the list of all the products in cart",
        cartList: cartList,
      },
    });
  } catch (err) {
    console.log("Error in fetching cart list", err);
    return res.status(501).json({
      data: {
        message: "Error in fetching cart list",
      },
    });
  }
};

// for adding product into the cart
module.exports.add = async function (req, res) {
  try {
    if (!req.body.quantity) {
      return res.status(400).json({
        data: {
          message:
            "Please specify how much qunatity of this product you want to add in the cart",
        },
      });
    }
    let cartItem = await Cart.findOne({ product: req.params.productId });
    if (cartItem) {
      console.log("Product alreay in the cart");
      return res.status(400).json({
        data: {
          message: "Product alreay in the cart",
        },
      });
    } else {
      let product = await Product.findById(req.params.productId);
      let isQuantityValid = checkQuantity(product.quantity, req.body.quantity);
      if (isQuantityValid) {
        cartItem = await Cart.create({
          product: req.params.productId,
          quantity: req.body.quantity,
        });
      } else {
        console.log(
          "Quantity exceeded!! Please choose the quantity that much available only"
        );
        return res.status(400).json({
          data: {
            message:
              "Quantity exceeded!! Please choose the quantity that much available only",
          },
        });
      }
    }
    await cartItem.populate("product");
    return res.status(200).json({
      data: {
        message: "Product added successfully to the cart",
        cartItem: cartItem,
      },
    });
  } catch (err) {
    console.log("Error in adding product to cart", err);
    return res.status(501).json({
      data: {
        message: "Error in adding product to cart",
      },
    });
  }
};

// for updating the quantity in the cart
module.exports.update = async function (req, res) {
  try {
    if (!req.body.quantity) {
      return res.status(400).json({
        data: {
          message:
            "Please specify how much qunatity of this product you want to update in the cart",
        },
      });
    }
    let cartItem = await Cart.findById(req.params.cartId).populate("product");
    if (!cartItem) {
      console.log("Product not found in the Cart");
      return res.status(400).json({
        message: "Product not found in the Cart",
      });
    } else {
      let isQuantityValid = checkQuantity(
        cartItem.product.quantity,
        req.body.quantity
      );
      if (isQuantityValid) {
        cartItem.quantity = req.body.quantity;
        cartItem.save();
        return res.status(200).json({
          data: {
            message: "Cart quantity updated successfully",
            cartItem: cartItem,
          },
        });
      } else {
        return res.status(400).json({
          data: {
            message:
              "Quantity exceeded!! Please choose the quantity that much available only",
          },
        });
      }
    }
  } catch (err) {
    console.log("Error in updating the quantity");
    return res.status(501).json({
      data: {
        message: "Error in updating the quantity",
      },
    });
  }
};
