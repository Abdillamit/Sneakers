export const renderCartItemst = () => {
    const catalogContent = document.querySelector(".catalog__content");

    catalogContent.innerHTML = `
        <img class="catalog__sceletion" src="./assets/img/Skelet.svg" alt="logo">
        <img class="catalog__sceletion" src="./assets/img/Skelet.svg" alt="logo">
        <img class="catalog__sceletion" src="./assets/img/Skelet.svg" alt="logo">
        <img class="catalog__sceletion" src="./assets/img/Skelet.svg" alt="logo">
    `
}