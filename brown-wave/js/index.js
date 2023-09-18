/*
=============
Navigation
=============
 */
const navOpen = document.querySelector(".nav__hamburger");
const navClose = document.querySelector(".close__toggle");
const menu = document.querySelector(".nav__menu");
const scrollLink = document.querySelectorAll(".scroll-link");
const navContainer = document.querySelector(".nav__menu");

navOpen.addEventListener("click", () => {
  menu.classList.add("open");
  document.body.classList.add("active");
  navContainer.style.left = "0";
  navContainer.style.width = "30rem";
});

navClose.addEventListener("click", () => {
  menu.classList.remove("open");
  document.body.classList.remove("active");
  navContainer.style.left = "-30rem";
  navContainer.style.width = "0";
});

/*
=============
Fixed Navigation
=============
 */

const navBar = document.querySelector(".navigation");
const gotoTop = document.querySelector(".goto-top");

// Smooth Scroll
Array.from(scrollLink).map((link) => {
  link.addEventListener("click", (e) => {
    const id = e.currentTarget.getAttribute("href").slice(1);
    const element = document.getElementById(id);
    const navHeight = navBar.getBoundingClientRect().height;
    const fixNav = navBar.classList.contains("fix__nav");
    let position = element.offsetTop - navHeight;

    if (!fixNav) {
      position = position - navHeight;
    }

    window.scrollTo({
      left: 0,
      top: position,
    });
    navContainer.style.left = "-30rem";
    document.body.classList.remove("active");
  });
});

// Fix NavBar

window.addEventListener("scroll", (e) => {
  const scrollHeight = window.pageYOffset;
  const navHeight = navBar.getBoundingClientRect().height;
  if (scrollHeight > navHeight) {
    navBar.classList.add("fix__nav");
  } else {
    navBar.classList.remove("fix__nav");
  }

  if (scrollHeight > 300) {
    gotoTop.classList.add("show-top");
  } else {
    gotoTop.classList.remove("show-top");
  }
});

let login = document.querySelector(".login-form");

document.querySelector("#login-btn").onclick = () => {
  login.classList.toggle("active");
  searchForm.classList.remove("active");
  shoppingCart.classList.remove("active");
};

let shoppingCart = document.querySelector(".shopping-cart");

document.querySelector("#cart-btn").onclick = () => {
  shoppingCart.classList.toggle("active");
  searchForm.classList.remove("active");
  login.classList.remove("active");
};
let searchForm = document.querySelector(".search-form");

document.querySelector("#search-btn").onclick = () => {
  searchForm.classList.toggle("active");
  shoppingCart.classList.remove("active");
  login.classList.remove("active");
};

///////////////////////////////////////////////////////////////////////////
// Letest product
const jsonData = {
  products: [
    {
      id: 30,
      title: "Chocolate Bar",
      image: "./img/product/image_processing20201102-3800-6p75sx.jpg",
      price: 5,
      category: "Chocolate Products",
    },
    {
      id: 31,
      title: "Chocolate Truffle",
      image: "./img/product/image_processing20201102-9786-m4uwt4.jpg",
      price: 8,
      category: "Chocolate Products",
    },
    {
      id: 32,
      title: "Chocolate Assortment",
      image: "./img/product/image_processing20201102-13957-bdbdjf.jpg",
      price: 12,
      category: "Chocolate Products",
    },
    {
      id: 33,
      title: "Dark Chocolate",
      image: "./img/product/original-44d69dbd609badf768ed481c0d3d6892.jpg",
      price: 6,
      category: "Chocolate Products",
    },
    {
      id: 34,
      title: "Milk Chocolate",
      image: "./img/product/original-6379b83660ece78008738322edf81deb.jpg",
      price: 6,
      category: "Chocolate Products",
    },
    {
      id: 35,
      title: "White Chocolate",
      image: "./img/product/original-bd395ecdb86080167dab450042ecba5c.jpg",
      price: 6,
      category: "Chocolate Products",
    },
    {
      id: 36,
      title: "Chocolate Cupcake",
      image: "./img/product/original-d91a43f625d591a11de3f4d4249645a7.jpg",
      price: 4,
      category: "Chocolate Products",
    },
    {
      id: 37,
      title: "Chocolate Donut",
      image: "./img/product/b616d94d23576ea0cce64c51f62b465f.jpg",
      price: 3,
      category: "Chocolate Products",
    },
    {
      id: 38,
      title: "Chocolate Icon",
      image: "./img/product/dribbble_cupcake-icon.jpg",
      price: 2,
      category: "Chocolate Products",
    },
    {
      id: 39,
      title: "Chocolate Bar",
      image: "./img/product/7059dee9e4744adba66bc332db9e867c.png",
      price: 5,
      category: "Chocolate Products",
    },
    {
      id: 40,
      title: "Chocolate Truffle",
      image: "./img/product/8e211b5bf19227b6dd9c09f2408a4725.png",
      price: 8,
      category: "Chocolate Products",
    },
    {
      id: 41,
      title: "Chocolate Assortment",
      image: "./img/product/4c7ea71bf0b7041cfdd4ae0b2229cdb4.jpg",
      price: 12,
      category: "Chocolate Products",
    },
    {
      id: 42,
      title: "Chocolate Bar",
      image: "./img/product/4_1_chocolate_dribbble_design123_4x.jpg",
      price: 5,
      category: "Chocolate Products",
    },
    {
      id: 43,
      title: "Chocolate Truffle",
      image: "./img/product/4_1_chocolate_dribbble_design1vs2_4x.jpg",
      price: 8,
      category: "Chocolate Products",
    },
  ],
};

// Get all the li elements with class "glide__slide"
const liElements = document.querySelectorAll("#letest_products .glide__slide");

// Loop through each li element and update the image source
liElements.forEach((li, index) => {
  const image = li.querySelector("img");

  const title = li.querySelector("h3");
  const price = li.querySelector("h4");
  const addTocart = li.querySelector(".product__footer a");

  if (image) {
    // Update the image source based on the JSON data
    image.src = jsonData.products[index].image;
    image.alt = jsonData.products[index].title;
    title.innerText = jsonData.products[index].title;
    price.innerText = `Rs ${jsonData.products[index].price}`;
    addTocart.href = `./checkout.html?id=${jsonData.products[index].id}`;
  }
});

//////////////////////////////////////////////////////////////////////////////
// Cart Details

let cart = localStorage.getItem("cart");
cart = JSON.parse(cart);

const shopingCart = document.querySelector(".cart-products");
const totalPrice = document.querySelector(".total");
const cartItemsNumber = document.getElementById("cart__total");

cartItemsNumber.innerText = cart.length;

//Cart list

const displayCartList = (items) => {
  const cartItemList = items.map((product, index) => {
    return `<div class="box">
    <i class="fas fa-trash"></i>
    <img src=${product.image}>
    <div class="content">
        <h3>${product.title}</h3>
        <span class="price">${product.price} Rs</span>
        <span class="quantity">qty : ${product.quantity}</span>
    </div>
</div>`;
  });
  const cartListHtml = cartItemList.join("");

  if (shopingCart) {
    shopingCart.innerHTML = cartListHtml;
  }

  const calculateTotalPrice = (items) => {
    let total = 0;
    items.forEach((product) => {
      total += product.price * product.quantity;
    });
    return total.toFixed(2);
  };

  if (totalPrice) {
    const total = calculateTotalPrice(items);
    totalPrice.innerText = `Rs ${total}`;
  }
};

displayCartList(cart);
