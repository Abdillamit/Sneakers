// const headerCart = document.querySelector(".header__cart");
// const overlay = document.querySelector(".overlay");
// const drawerClose = document.querySelector(".drawer__close");

// headerCart.addEventListener("click", () => {
//   headerCart.classList.toggle("active");
//   overlay.classList.toggle(".overlay");
// });

const catalogContent = document.querySelector(".catalog__content");

let cart = [];

const response = async () => {
  const result = await fetch(
    "https://6331fdf03ea4956cfb6b0f3b.mockapi.io/goods"
  );
  const data = await result.json();

  console.log(data);

  data.forEach(item => {
    catalogContent.innerHTML += `
    <div data-id="${item.id}" class="cardItem">
              <div class="card__top">
                <div class="card__liked">
                  <img src="./assets/img/unliked.svg" alt="liked-icon" />
                  <img src="./assets/img/liked.svg" alt="liked-icon" />
                </div>
                <img
                  class="card__img"
                  src="${item.imgURL}"
                  alt="sneaker-img"
                />
              </div>
              <h2>${item.name}</h2>
              <div class="card__bottom">
                <div class="price">
                  Цена:
                  <p>${item.price} руб.</p>
                </div>
                <div class="cart__added">
                  <img class="addCartItem" src="./assets/img/add.svg" alt="add-icon" />
                  <img class="deleteCartItem" src="./assets/img/added.svg" alt="added-icon" />
                </div>
              </div>
            </div>
    `;
  });

  const addFav = document.querySelectorAll(".card__liked");
  const addCart = document.querySelectorAll(".cart__added");

  addFav.forEach(item => {
    item.addEventListener("click", () => {
      item.classList.toggle("active");
    });
  });

  addCart.forEach(item => {
    item.addEventListener("click", () => {
      item.classList.toggle("active");
    });
  });

  const addCartItem = catalogContent.querySelectorAll(".addCartItem");
  addCartItem.forEach(cartAdd => {
    cartAdd.addEventListener("click", () => {
      const itemId =
        cartAdd.parentElement.parentElement.parentElement.dataset.id;
      cart.push(data.find(item => +item.id === +itemId));
    });
  });

  const deleteCartItem = catalogContent.querySelectorAll(".deleteCartItem");
  deleteCartItem.forEach(cartDelete => {
    cartDelete.addEventListener("click", () => {
      const itemId =
        cartDelete.parentElement.parentElement.parentElement.dataset.id;

      cart = cart.filter(item => +item.id !== +itemId);
    });
  });

  const drawerContent = document.querySelector(".drawer__content");

  drawerContent.innerHTML += `
<div class="cart__item">
                <div class="">
                  <img src="./assets/img/sneaker-1.jpg" alt="" />
                </div>
                <div class="cart__info">
                  <h3 class="cart__name">Мужские Кроссовки Nike Air Max 270</h3>
                  <span class="cart__price"> 12 999 руб. </span>
                </div>
                <svg
                  width="52"
                  height="52"
                  viewBox="0 0 32 32"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <rect
                    x="0.5"
                    y="0.5"
                    width="31"
                    height="31"
                    rx="7.5"
                    fill="white"
                    stroke="#DBDBDB"
                  />
                  <path
                    d="M20.0799 18.6155L17.6311 16.1667L20.0798 13.718C21.0241 12.7738 19.5596 11.3093 18.6154 12.2536L16.1667 14.7023L13.7179 12.2535C12.7738 11.3095 11.3095 12.7738 12.2535 13.7179L14.7023 16.1667L12.2536 18.6154C11.3093 19.5596 12.7738 21.0241 13.718 20.0798L16.1667 17.6311L18.6155 20.0799C19.5597 21.0241 21.0241 19.5597 20.0799 18.6155Z"
                    fill="#B5B5B5"
                  />
                </svg>
              </div>
              
`;


  return data;
};

response();

const openOverlay = document.querySelector(".openOverlay");
const closeOverlay = document.querySelector(".closeOverlay");
const overlay = document.querySelector(".overlay");

openOverlay.addEventListener("click", () => {
  overlay.classList.add("active");
});

closeOverlay.addEventListener("click", () => {
  overlay.classList.remove("active");
});

