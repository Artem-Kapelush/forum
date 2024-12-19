// Елементи DOM
const menuButton = document.getElementById("menu-button");
const menuIcon = document.getElementById("menu-icon");
const menuList = document.getElementById("menu-list");
const headerContent = document.querySelector(".header__content");
const logoImage = document.querySelector(".logo__image");

// Додати або знайти фон для приховування контенту
const overlay = document.querySelector(".overlay") || (() => {
  const newOverlay = document.createElement("div");
  newOverlay.className = "overlay";
  document.body.appendChild(newOverlay);
  return newOverlay;
})();

// Обробник кліку для кнопки меню
menuButton.addEventListener("click", () => {
  const isMenuOpen = menuList.classList.toggle("visible");

  // Змінити стан елементів
  // Змінити стан іконки меню
  menuIcon.src = isMenuOpen ? "img/svg/menu-close-light.svg" : "img/svg/menu-open-light.svg";

  // Змінити логотип
  logoImage.src = isMenuOpen ? "img/svg/logo-dark.svg" : "img/svg/logo.svg";
  // Змінити стан елементів
  headerContent.classList.toggle("fixed", isMenuOpen);
  overlay.classList.toggle("active", isMenuOpen);
});