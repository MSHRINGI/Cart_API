# Cart_API
Here I just created a cart API where you can create items, render the list of created items, add product into the cart, update quantity in the cart and render the list of cart items.

## For run the code
* npm start

## URL'S
**1.Products**
  - http://localhost:8000/api/products/list -> For fetching the list of the available products
  - http://localhost:8000/api/products/add -> For creating the product

**2.Cart**
  - http://localhost:8000/api/cart/add/:productId -> For adding the product into the cart
  - http://localhost:8000/api/cart/list -> For rendering the list of cart items
  - http://localhost:8000/api/cart/update/:cartId -> For updating the quantity in the cart
