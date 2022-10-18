import overlayFunc from "./overlay.js";
const catalogContent = document.querySelector(".catalog__content");
const searchInput = document.querySelector(".catalog__search");
import{ cart, deleteCartItem, renderCartItems} from "./renderCartItems.js";

import { renderCartItemst } from "./renderSkeletonItems.js";

const animCards = () => {
  gsap.from(".cardItem", {
    duration: 0.5,
    opacity: 0,
    y: 30,
    delay: 0.1,
    stagger: 0.2,
  });
};

export const filterCart = (itemId) => {
  cart = cart.filter((item) => +item.id !== +itemId);
};

const response = async () => {
  const result = await fetch(
    "http://localhost:3000/goods"
  );

  const data = await result.json();

  const handleAdd = () => {
    const addCartItem = catalogContent.querySelectorAll(".addCartItem");
    addCartItem.forEach((cartAdd) => {
      cartAdd.addEventListener("click", () => {
        const itemId =
          cartAdd.parentElement.parentElement.parentElement.dataset.id;
        cart.push(data.find((item) => +item.id === +itemId));

        renderCartItems();
      });
    });

    const deleteCartBtn = catalogContent.querySelectorAll(".deleteCartItem");
    deleteCartBtn.forEach((cartDelete) => {
      cartDelete.addEventListener("click", () => {
        const itemId =
          cartDelete.parentElement.parentElement.parentElement.dataset.id;
        deleteCartItem(itemId);
        renderCartItems();
      });
    });

    const addFav = document.querySelectorAll(".card__liked");
    const addCart = document.querySelectorAll(".cart__added");

    addFav.forEach((item) => {
      item.addEventListener("click", () => {
        item.classList.toggle("active");
      });
    });

    addCart.forEach((item) => {
      item.addEventListener("click", () => {
        item.classList.toggle("active");
      });
    });
  };
  const renderGoods = (abdillamit) => {
    renderCartItemst();

    setTimeout(() =>{
      catalogContent.innerHTML = "";
      abdillamit.forEach((item) => {
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
  
        const cartItems = document.querySelectorAll(".cardItem");
  
        cart.forEach((cartItem) => {
          if (cartItem.id === item.id) {
            cartItems[item.id]
              .querySelector(".cart__added")
              .classList.add("active");
          }
        });
      });
      handleAdd();
      animCards();
    },2000)

  };

  renderGoods(data);
  renderCartItemst();

  searchInput.addEventListener("keypress", () => {
    catalogContent.innerHTML = "";
    const filterGoods = data.filter((element) =>
      element.name
        .toLowerCase()
        .includes(searchInput.value.trim().toLowerCase())
    );              

    if (searchInput.value.trim() === "") {
      renderGoods(data);
    } else {
      renderGoods(filterGoods);
    }
  });

  renderCartItems();

  return data;
};

response();

overlayFunc();
