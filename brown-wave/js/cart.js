/////////////////////////////////////////////////////////////////////////////////////////////
// Render the Procut using the local storage

let cartData = localStorage.getItem("cart");
cartData = JSON.parse(cartData);

const cartListContainer = document.getElementById("cart__list");

const priceTotal = document.getElementById("total__price");
const subTotal = document.getElementById("sub__total");

const displayCart = (items) => {
  const cartItemList = items.map((product, index) => {
    return `<div class="cart-item">
    <div class="product__thumbnail">
      <a href="./checkout.html?id=${product.id}">
        <img src="${product.image}" alt="${product.title}">
      </a>
    </div>
    <div class="product__name">
      <a href="#">${product.title}</a>
    </div>
    <div class="product__price">
      <div class="price">
        <span class="new__price"> Unit Price: ${product.price} Rs</span>
      </div>
    </div>
    <div class="product__quantity">
      <div class="input-counter">
        <p>Quantity: ${product.quantity}</p>
      </div>
    </div>
    <div class="product__subtotal">
      <div class="price">
        <span class="new__price">Total Price: ${(
          product.price * product.quantity
        ).toFixed(2)} Rs</span>
      </div>
      <button class="remove__cart-item" data-index="${index}">
        <svg>
          <use xlink:href="./img/sprite.svg#icon-trash"></use>
        </svg>
      </button>
    </div>
  </div>
  `;
  });

  const cartListHtml = cartItemList.join("");

  if (cartListContainer) {
    cartListContainer.innerHTML = cartListHtml;
  }

  const calculatepriceTotal = (items) => {
    let total = 0;
    items.forEach((product) => {
      total += product.price * product.quantity;
    });
    return total.toFixed(2);
  };

  if (priceTotal) {
    const total = calculatepriceTotal(items);
    priceTotal.innerText = `Rs ${total}`;
    subTotal.innerText = `Rs ${total}`;
  }
};

displayCart(cartData);

//////////////////////////////////////////////////////////////////////////////////////
// Update the cart and local storage when removing an item
document
  .querySelectorAll(".remove__cart-item")
  .forEach((removeButton, index) => {
    console.log(removeButton);
    removeButton.addEventListener("click", (event) => {
      const indexToRemove = event.target.getAttribute("data-index");
      console.log(indexToRemove);

      if (indexToRemove !== null) {
        cartData.splice(indexToRemove, 1);

        localStorage.setItem("cart", JSON.stringify(cartData));

        cartListContainer.removeChild(cartListContainer.childNodes[index]);

        const total = calculatepriceTotal(cart);
        priceTotal.innerText = `Rs ${total}`;
        subTotal.innerText = `RS ${total}`;
        window.location.reload();
      }
    });
  });
