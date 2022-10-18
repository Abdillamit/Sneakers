const drawerContent = document.querySelector(".drawer__content");
const drawerBottom = document.querySelector(".drawer__bottom");
const totalPrice = drawerBottom.querySelector(".totalPrice");
const zeket = drawerBottom.querySelector(".zeket");
// const abu = drawerBottom.querySelector(".abu");

export const cart = [];

export const  deleteCartItem = async (id) =>{
  await fetch("http://localhost:3000/cart/" + id, {
    method: "DELETE"
  })
}

export const renderCartItems = async () => {

  const response = await fetch("http://localhost:3000/cart/");
  const data = await response.json();

  data.forEach(item => cart.push(item))
  drawerContent.innerHTML = "";

  if (cart.length <= 0) {
    drawerContent.innerHTML += `
    <div class="empty">
    <img src="./assets/img/empty.svg" alt="empty-icon" class="empty__img" />
    <h2 class="empty__title">Корзина пустая</h2>
    <p class="empty__description">Добавьте хотя бы одну пару кроссовок, чтобы сделать заказ.</p>
    <button class="empty__btn drawer__btn">Вернуться назад</button>
    </div>
    `;
    drawerBottom.classList.add("active");

    const overlay = document.querySelector(".overlay");
    const closeOverlay = document.querySelector(".empty__btn");

    closeOverlay.addEventListener("click", () => {
      overlay.classList.remove("active");
      document.body.style.overflow = "visible";
    });
  } else {
    cart.forEach((item) => {
      drawerContent.innerHTML += `
          <div data-id="${item.id}" class="cart__item">
                          <div class="">
                            <img src="${item.imgURL}" alt="" />
                          </div>
                          <div class="cart__info">
                            <h3 class="cart__name">${item.name}</h3>
                            <span class="cart__price"> ${item.price} руб. </span>
                          </div>
                          <svg
                          class="cart__delete"
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
    });

    drawerBottom.classList.remove("active");

    totalPrice.innerText = `${cart.reduce((a, b) => a + b.price, 0)} руб.`;
    // abu.innerText = `${cart.reduce((a, b) => a + b.price, 0)} руб.`;
    zeket.innerText = `${Math.round(cart.reduce((a, b) => a + b.price, 0) *0.05)} руб.`;
  }

  const deleteCartBtn = document.querySelectorAll(".cart__delete");
  const cartItems = document.querySelectorAll(".cardItem");
  deleteCartBtn.forEach((cartDelete) => {
    cartDelete.addEventListener("click", () => {
      const itemId = cartDelete.parentElement.dataset.id;
      deleteCartItem(itemId);
      renderCartItems();

      cartItems[itemId].querySelector(".cart__added").classList.remove("active");
    });
  });
};


export default renderCartItems;
