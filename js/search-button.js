document.addEventListener("DOMContentLoaded", () => {
  // Отримуємо елементи для роботи з пошуковим полем
  const searchButton = document.getElementById("search-button"); // Кнопка відкриття/закриття пошуку
  const searchContainer = document.querySelector(".search-container"); // Контейнер пошукового поля
  const searchInput = document.querySelector(".search-input"); // Поле введення для пошуку
  const searchResults = document.getElementById("search-results"); // Контейнер для результатів пошуку

  // Універсальна функція для роботи з localStorage
  const manageArticlesInLocalStorage = () => {
    // Перевіряємо, чи є вже статті в localStorage
    const storedArticles = localStorage.getItem("articles");
    if (storedArticles) {
      // Якщо є, повертаємо їх у вигляді масиву
      return JSON.parse(storedArticles);
    }

    // Якщо немає, зчитуємо статті з DOM
    const articles = [...document.querySelectorAll(".news-item")].map((item) => ({
      title: item.querySelector(".news__title").textContent, // Заголовок статті
      description: item.querySelector(".news__description").textContent, // Опис статті
      image: item.querySelector(".news__img").src, // URL зображення
      link: item.querySelector("a").href, // Посилання на статтю
      category: item.getAttribute("data-category"), // Категорія статті (за бажанням)
    }));

    // Зберігаємо зчитані статті у localStorage
    localStorage.setItem("articles", JSON.stringify(articles));
    return articles; // Повертаємо масив статей
  };

  // Функція для підсвічування знайденого тексту
  const highlightText = (text, query) =>
    text.replace(
      new RegExp(query, "gi"), // Знаходимо всі входження запиту, незалежно від регістру
      (match) => `<span class="highlight">${match}</span>` // Обгортаємо знайдений текст у тег із класом для підсвітки
    );

  // Функція для відкриття/закриття пошукового поля
  const toggleSearch = () => {
    const isActive = searchContainer.classList.toggle("active"); // Перемикаємо клас "active" у контейнера
    searchButton.classList.toggle("active", isActive); // Також перемикаємо клас "active" для кнопки
    if (isActive) searchInput.focus(); // Якщо поле стало активним, автоматично встановлюємо фокус
  };

  // Функція для скидання результатів пошуку та закриття поля
  const resetSearch = () => {
    searchContainer.classList.remove("active"); // Видаляємо клас "active" у пошуковому контейнері
    searchButton.classList.remove("active"); // Видаляємо клас "active" у кнопки
    searchInput.value = ""; // Очищаємо поле введення
    searchResults.classList.remove("active"); // Закриваємо результати пошуку
    searchResults.innerHTML = ""; // Очищаємо HTML контейнера для результатів
  };

  // Функція для виконання пошуку
  const performSearch = () => {
    const query = searchInput.value.toLowerCase().trim(); // Отримуємо введений запит і приводимо його до нижнього регістру
    searchResults.innerHTML = ""; // Очищаємо попередні результати пошуку

    if (query.length > 0) {
      searchResults.classList.add("active"); // Відображаємо контейнер для результатів
      const articles = manageArticlesInLocalStorage(); // Отримуємо статті з localStorage
      const filteredArticles = articles.filter(
        (article) =>
          article.title.toLowerCase().includes(query) || // Перевіряємо, чи є запит у заголовку
          article.description.toLowerCase().includes(query) // Або в описі статті
      );

      if (filteredArticles.length > 0) {
        // Якщо є збіги, створюємо HTML для кожної статті
        filteredArticles.forEach((article) => {
          const articleHTML = `
            <div class="search-item">
              <a href="${article.link}">
                <img src="${article.image}" alt="${article.title}">
              </a>
              <div>
                <a href="${article.link}">
                  <h3>${highlightText(article.title, query)}</h3>
                </a>
                <p>${highlightText(article.description, query)}</p>
              </div>
            </div>
          `;
          searchResults.insertAdjacentHTML("beforeend", articleHTML); // Додаємо статтю до результатів
        });
      } else {
        // Якщо немає збігів, відображаємо повідомлення "Нічого не знайдено"
        searchResults.innerHTML = `
          <div class="search-item no-results">
            <h3>Нічого не знайдено</h3>
          </div>
        `;
      }
    } else {
      // Якщо поле пошуку порожнє, приховуємо результати
      searchResults.classList.remove("active");
    }
  };

  // Обробник кліку на кнопку пошуку
  searchButton.addEventListener("click", (event) => {
    event.stopPropagation(); // Запобігаємо "спливанню" кліку
    toggleSearch(); // Відкриваємо/закриваємо поле пошуку
  });

  // Обробник кліку поза межами пошукового поля
  document.addEventListener("click", (event) => {
    if (
      !searchContainer.contains(event.target) && // Якщо клік не по контейнеру пошуку
      !searchButton.contains(event.target) && // І не по кнопці пошуку
      !searchResults.contains(event.target) // І не по результатах пошуку
    ) {
      resetSearch(); // Скидаємо пошук
    }
  });

  // Обробник натискання клавіші "Enter" у полі введення
  searchInput.addEventListener("keypress", (event) => {
    if (event.key === "Enter") {
      event.preventDefault(); // Запобігаємо стандартній поведінці
      performSearch(); // Виконуємо пошук
    }
  });

  // Обробник кліку на кнопку "Submit" для пошуку
  const submitSearchButton = document.getElementById("submit-search-button");
  if (submitSearchButton) {
    submitSearchButton.addEventListener("click", performSearch); // Виконуємо пошук при кліку на кнопку
  }

  // Ініціалізація: якщо на сторінці є статті, зберігаємо їх у localStorage
  manageArticlesInLocalStorage();
});
