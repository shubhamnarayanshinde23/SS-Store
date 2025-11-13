const productContainer = document.querySelector(".service-container");
const cartBtn = document.querySelector(".cart-btn");
const cartCheck = document.querySelector(".cart");
const openCartBox = document.querySelector(".cart-section");
const closeCartBox = document.querySelector(".close-btn");
const addBox = document.querySelector(".cart-section");

cartCheck.addEventListener("click", () => {
  openCartBox.classList.add("active");
});
closeCartBox.addEventListener("click", () => {
  openCartBox.classList.remove("active");
});
let productData = [];
let existingProduct = [];

const showCards = () => {
  productData.forEach((items) => {
    const cardsData = document.createElement("div");
    cardsData.classList.add("services");
    cardsData.innerHTML = `
        <div class="service-img">
                <img src="${items.images}" alt="laptop">
            </div>
            <div class="service-text">
              <h3>${items.name}</h3>
              <p>Rs. ${items.price}</p>
              <span class="cart-btn">Add To Cart</span>
            </div>
        `;
    productContainer.appendChild(cardsData);
    let cardData = cardsData.querySelector(".cart-btn");
    cardData.addEventListener("click", (e) => {
      e.preventDefault();
      AddToCart(items);
    });
  });
};

const AddToCart = (items) => {
  // console.log(currProduct);

  const sameProduct = existingProduct.find(
    (currProduct) => items.id === currProduct.id
  );
  if (sameProduct) {
    alert("Same product exists in cart list");
    return;
  }
  existingProduct.push(items);
  let quantity = 1;
  // let price = parseFloat(items.price.replace("Rs.", ""));

  const cartBoxData = document.createElement("div");
  cartBoxData.classList.add("cart-products");
  cartBoxData.innerHTML = `
<div class="cart-img">
                <img src="${items.images}" alt="laptop">
            </div>
            <div class="cart-text">
                <h3>${items.name}</h3>
                <p class="item-price">${`Rs. ${items.price}`}</p>
            </div>
            <div class="cart-price">
                <i class="fa-solid fa-plus cart-icon plus"></i>
                <span class="qty">${quantity}</span>
              <i class="fa-solid fa-minus cart-icon minus"></i>
            </div>
`;
  addBox.appendChild(cartBoxData);

  let Increment = cartBoxData.querySelector(".plus");
  let Decrement = cartBoxData.querySelector(".minus");
  let qt = cartBoxData.querySelector(".qty");
  let totalprice = cartBoxData.querySelector('.item-price');

  Increment.addEventListener("click", (e) => {
    e.preventDefault();
    quantity++;
    qt.textContent = quantity;
    // totalprice.textContent = `RS. ${(price * quantity).toFixed(2)}`;
  });
Decrement.addEventListener('click', (e) => {
  e.preventDefault();
  if(quantity > 1){
  quantity--;
  qt.textContent = quantity;
  }else{
    cartBoxData.classList.add("slider");
    setTimeout(() => {
        existingProduct.remove();
        existingProduct = existingProduct.filter((currProd) => currProd.id !== items.id);
        // UpdateTotal();
      }, 300);
  }

})
};


const fetchData = () => {
  fetch("products.json")
    .then((response) => response.json())
    .then((data) => {
      productData = data;
      showCards();
    });
};

fetchData();
