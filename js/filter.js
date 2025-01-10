// Елементи для фільтрування
let filterButton = document.getElementById("filter-button");
let filterOptions = document.getElementById("filter-options");
let arrow = document.querySelector(".filter__arrow");
let filterTitle = document.querySelector(".filter__title");

// Елементи для сортування
let listIcon = document.getElementById("list-icon");
let gridIcon = document.getElementById("grid-icon");
let newsBlock = document.querySelector(".news");
let newsItems = document.querySelectorAll(".news-item");
let newsImages = document.querySelectorAll(".news__img");
let newsContents = document.querySelectorAll(".news-content");

// Логіка для сортування
listIcon.addEventListener("click", () => {
  if (!listIcon.classList.contains("active")) {
    // Активуємо вигляд списку
    listIcon.classList.add("active");
    gridIcon.classList.remove("active");
    listIcon.querySelector("img").src = "img/svg/list-light-checked.svg";
    gridIcon.querySelector("img").src = "img/svg/grid-light.svg";

    // Змінюємо класи для стандартного вигляду
    newsBlock.classList.remove("news-column");
    newsBlock.classList.add("news");
    newsItems.forEach(item => {
      item.classList.remove("news-item-column");
      item.classList.add("news-item");
    });

    newsImages.forEach(img => {
      img.classList.remove("news__img-column");
      img.classList.add("news__img");
    });

    // Повернення до стандартного вигляду контенту
    newsContents.forEach(content => {
      content.classList.remove("article-content");
      content.classList.add("news-content");
    });
    
    // Оновлення класів для теми
    updateThemeClasses();    
  }
});

gridIcon.addEventListener("click", () => {
  if (!gridIcon.classList.contains("active")) {
    // Активуємо вигляд плитки
    gridIcon.classList.add("active");
    listIcon.classList.remove("active");
    gridIcon.querySelector("img").src = "img/svg/grid-light-checked.svg";
    listIcon.querySelector("img").src = "img/svg/list-light.svg";

    // Змінюємо класи для вигляду плитки
    newsBlock.classList.remove("news");
    newsBlock.classList.add("news-column");
    newsItems.forEach(item => {
      item.classList.remove("news-item");
      item.classList.add("news-item-column");
    });

    newsImages.forEach(img => {
      img.classList.remove("news__img");
      img.classList.add("news__img-column");
    });

    // Зміна класу на article-content
    newsContents.forEach(content => {
      content.classList.remove("news-content");
      content.classList.add("article-content");
    });
    
    // Оновлення класів для теми
    updateThemeClasses();      
  }
});

// Логіка для стрілки фільтру
filterButton.addEventListener("click", () => {
  filterOptions.classList.toggle("hidden");
  arrow.classList.toggle("rotated");
});

// Фільтрація новин
filterOptions.addEventListener("click", ({ target }) => {
  if (!target.classList.contains("filter__option")) return; // Переконаємося, що клік по опції

  const selectedCategory = target.dataset.category || "all"; // Отримуємо data-category або "all"
  filterTitle.textContent = target.textContent; // Оновлення тексту кнопки
  filterOptions.classList.add("hidden");
  arrow.classList.remove("rotated");

  // Показ/приховування новин
  newsItems.forEach(item => {
    const itemCategory = item.dataset.category.toLowerCase();
    item.style.display = 
      selectedCategory === "all" || itemCategory === selectedCategory
        ? "flex"
        : "none";
  });
});