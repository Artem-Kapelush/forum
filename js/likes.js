let heartIcon = document.querySelector(".heart-icon");
let likeCount = document.querySelector(".like-count");

heartIcon.addEventListener("click", () => {
    if (heartIcon.src.includes("img/svg/icon-heart-light.svg")) {
        heartIcon.src = "img/svg/icon-heart-light-added.svg";
        likeCount.textContent = parseInt(likeCount.textContent) + 1;
    } else {
        heartIcon.src = "img/svg/icon-heart-light.svg";
        likeCount.textContent = parseInt(likeCount.textContent) - 1;
    }
});