window.addEventListener("DOMContentLoaded", async function () {
  ////////////////////////////////////////////////////////////////////
  // Fetching the product using query
  const urlSearchParams = new URLSearchParams(window.location.search);
  const id = urlSearchParams.get("id");

  const getProduct = async () => {
    try {
      const results = await fetch("./data/products.json");
      const data = await results.json();
      const products = data.products;

      const product = products.find((product) => product.id === parseInt(id));

      if (product) {
        return product;
      } else {
        throw new Error("Product not found");
      }
    } catch (err) {
      console.log(err);
    }
  };

  /////////////////////////////////////
  // Rendering Html dynamically for the product

  const categoryCenter = document.querySelector(".product-details__section");
  let product = await getProduct();
  const displayProductItem = `<div class="product-detail__container">
      <div class="product-detail__left">
        <div class="details__container--left">
          <div class="product__pictures">
            <div class="pictures__container">
              <img class="picture" src="${product.image}" id="pic1" alt="${
    product.title
  }" />
            </div>
            <!-- Add other image containers here if needed -->
          </div>
          <div class="product__picture" id="product__picture">
            <!-- <div class="rect" id="rect"></div> -->
            <div class="picture__container">
              <img src="${product.image}" id="pic" alt="${product.title}" />
            </div>
          </div>
          <div class="zoom" id="zoom"></div>
        </div>
  
        <div class="product-details__btn">
          <button class="add">
            <span>
              <svg>
                <use xlink:href="./img/sprite.svg#icon-cart-plus"></use>
              </svg>
            </span>
            ADD TO CART</button>
          <button class="buy">
            <span>
              <svg>
                <use xlink:href="./img/sprite.svg#icon-credit-card"></use>
              </svg>
            </span>
            BUY NOW
          </button>
        </div>
      </div>
  
      <div class="product-detail__right">
        <div class="product-detail__content">
          <h3>${product.title}</h3>
          <div class="price">
            <span class="new__price">${product.price} Rs</span>
          </div>
          <div class="product__review">
            <div class="rating">
              <svg>
                <use xlink:href="./img/sprite.svg#icon-star-full"></use>
              </svg>
              <svg>
                <use xlink:href="./img/sprite.svg#icon-star-full"></use>
              </svg>
              <svg>
                <use xlink:href="./img/sprite.svg#icon-star-full"></use>
              </svg>
              <svg>
                <use xlink:href="./img/sprite.svg#icon-star-full"></use>
              </svg>
              <svg>
                <use xlink:href="./img/sprite.svg#icon-star-empty"></use>
              </svg>
            </div>
            <a href="#" class="rating__quatity">3 reviews</a>
          </div>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Sunt
            a doloribus iste natus et facere?
            dolor sit amet consectetur adipisicing elit. Sunt
            a doloribus iste natus et facere?
          </p>
          <div class="product__info-container">
            <ul class="product__info">
              <li>
                <div class="input-counter">
                  <span>Quantity:</span>
                  <div>
                    <span class="minus-btn">
                      <svg>
                        <use xlink:href="./img/sprite.svg#icon-minus"></use>
                      </svg>
                    </span>
                    <input type="text" min="1" value="1" max="10" class="counter-btn" id="quantity-input"/>
                    <span class="plus-btn">
                      <svg>
                        <use xlink:href="./img/sprite.svg#icon-plus"></use>
                      </svg>
                    </span>
                  </div>
                </div>
              </li>
              <li>
                <span>Subtotal:</span>
                <a href="#" class="new__price">$${product.price.toFixed(2)}</a>
              </li>
              <li>
                <span>Brand:</span>
                <a href="#">Apple</a>
              </li>
              <li>
                <span>Product Type:</span>
                <a href="#">Phone</a>
              </li>
              <li>
                <span>Availability:</span>
                <a href="#" class="in-stock">${product.availability}</a>
              </li>
            </ul>
            <div class="product-info__btn">
              <a href="#">
                <span>
                  <svg>
                    <use xlink:href="./img/sprite.svg#icon-crop"></use>
                  </svg>
                </span>&nbsp;
                SIZE GUIDE
              </a>
              <a href="#">
                <span>
                  <svg>
                    <use xlink:href="./img/sprite.svg#icon-truck"></use>
                  </svg>
                </span>&nbsp;
                SHIPPING
              </a>
              <a href="#">
                <span>
                  <svg>
                    <use xlink:href="./img/sprite.svg#icon-envelope-o"></use>
                  </svg>&nbsp;
                </span>
                ASK ABOUT THIS PRODUCT
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  
    <div class="product-detail__bottom">
      <div class="title__container tabs">
        <div class="section__titles category__titles ">
          <div class="section__title detail-btn active" data-id="description">
            <span class="dot"></span>
            <h1 class="primary__title">Description</h1>
          </div>
        </div>
  
        <div class="section__titles">
          <div class="section__title detail-btn" data-id="reviews">
            <span class="dot"></span>
            <h1 class="primary__title">Reviews</h1>
          </div>
        </div>
  
        <div class="section__titles">
          <div class="section__title detail-btn" data-id="shipping">
            <span class="dot"></span>
            <h1 class="primary__title">Shipping Details</h1>
          </div>
        </div>
      </div>
      <!-- Rest of your HTML template... -->
    </div>
  </div>`;

  if (categoryCenter) {
    categoryCenter.innerHTML = displayProductItem;
  }
  const page__title = document.querySelector(".page__title");
  page__title.textContent = product.title;

  //////////////////////////////////////////////////////////////////////////////////////
  // Handle the quanity click event for selection of the product
  const quantityInput = document.getElementById("quantity-input");
  const minusBtn = document.querySelector(".minus-btn");
  const plusBtn = document.querySelector(".plus-btn");

  minusBtn.addEventListener("click", () => {
    const currentValue = parseInt(quantityInput.value);

    if (currentValue > 1) {
      quantityInput.value = currentValue - 1;
    }
  });

  plusBtn.addEventListener("click", () => {
    const currentValue = parseInt(quantityInput.value);

    quantityInput.value = currentValue + 1;
  });

  ///////////////////////////////////////////////////////////////////////////////
  // Add the product to cart and save the cart in localStorage and reload the page

  const addToCartButton = document.querySelector(".add");

  addToCartButton.addEventListener("click", () => {
    const existingCartData = localStorage.getItem("cart");

    let cart = [];
    product = { ...product, quantity: quantityInput.value };

    if (existingCartData) {
      cart = JSON.parse(existingCartData);
    }

    const existingProductIndex = cart.findIndex(
      (item) => item.id === product.id
    );

    if (existingProductIndex !== -1) {
      cart[existingProductIndex] = product;
      this.alert("the item is already in the card");
    } else {
      cart.push(product);
    }

    const sum = cart.reduce(
      (accumulator, product) => accumulator + parseInt(product.quantity),
      0
    );

    if (sum > 8) {
      alert("You can add up to 8 items only");
      return;
    }

    const updatedCartJson = JSON.stringify(cart);

    localStorage.setItem("cart", updatedCartJson);

    window.location.reload();
  });
});
