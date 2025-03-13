// Elements references
const productsContainer = document.getElementById("productsContainer");
const cartContainer = document.getElementById("cartContainer");
const feedback = document.getElementById("feedback");
const totalAmount = document.getElementById("totalAmount");
const sortByPriceEl = document.getElementById("sortByPrice");
const clearCartEl = document.getElementById("clearCart");

// default products array
const products = [
  {
    id: 1,
    name: "Laptop",
    price: 50000,
  },
  {
    id: 2,
    name: "Mobile",
    price: 25000,
  },
  {
    id: 3,
    name: "Tablet",
    price: 30000,
  },
  {
    id: 4,
    name: "Shoes",
    price: 1000,
  },
  {
    id: 5,
    name: "Rice Bag",
    price: 800,
  },
  {
    id: 6,
    name: "Cricket Bat",
    price: 500,
  },
  {
    id: 7,
    name: "Ear Buds",
    price: 1300,
  },
  {
    id: 8,
    name: "Mouse",
    price: 300,
  },
];

// empty cart array
const cart = [];

// timer for the feedback to display
let timerId;

clearCartEl.addEventListener("click", clearCart);

sortByPriceEl.addEventListener("click", sortByPrice);

// function to clear cart
function clearCart() {
  cart.length = 0;
  renderCartDetails();
  updateUserFeedback(`Cart is Cleared`, "success");
}

// function to sort products by price
function sortByPrice() {
  cart.sort((item1, item2) => {
    return item1.price - item2.price;
  });
  renderCartDetails();
}

// function to add available product
function renderProductDetails() {
  products.forEach((product) => {
    const { name, price, id } = product;
    const productRow = `
      <div class="product-row">
            <p>${name} - Rs. ${price}</p>
            <button onclick="addToCart(${id})">Add to Cart</button>
          </div>
      `;
    productsContainer.insertAdjacentHTML("beforeend", productRow);
  });
}

// function to add products to the cart (render the cart)
function renderCartDetails() {
  cartContainer.innerHTML = "";
  cart.forEach((item) => {
    const { name, price, id } = item;
    const cartItemRow = `
    <div class="product-row">
          <p>${name} - Rs. ${price}</p>
          <button onclick="removeFromCart(${id})">Remove</button>
        </div>
    `;
    feedback.textContent = `${name} is added to Cart`;
    cartContainer.insertAdjacentHTML("beforeend", cartItemRow);
  });

  const totalPrize = cart.reduce(function (acc, currProduct) {
    return acc + currProduct.price;
  }, 0);
  // this will give the total price
  totalAmount.textContent = `Rs. ${totalPrize}`;
}

// function to add product to cart
function addToCart(id) {
  const isProductAvailable = cart.some(function (product) {
    return product.id === id;
  });

  if (isProductAvailable) {
    updateUserFeedback("Already Available in Cart", "failure");
    return; // product is already in cart
  }
  const product = products.find((product) => product.id === id);
  cart.push(product);
  renderCartDetails();
  updateUserFeedback(`${product.name} is added to Cart`, "success");
}

// function to remove product from cart
function removeFromCart(id) {
  const product = cart.find((product) => {
    return product.id === id;
  });
  // find index
  const productIndex = cart.findIndex((product) => product.id === id);
  cart.splice(productIndex, 1);
  renderCartDetails();
  updateUserFeedback(`${product.name} is Removed from Cart`, "failure");
}

// function to update user feedback
function updateUserFeedback(msg, type) {
  clearTimeout(timerId);

  feedback.style.display = "block";
  if (type === "success") {
    feedback.style.backgroundColor = "green";
  }
  if (type === "failure") {
    feedback.style.backgroundColor = "red";
  }
  feedback.textContent = msg;
  timerId = setTimeout(function () {
    feedback.style.display = "none";
  }, 3000);
}

renderProductDetails();
