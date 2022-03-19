const btnStart = document.querySelector(".btn--start");
const headerTitle = document.querySelector(".title");
const headerSearch = document.querySelector(".header__search");
const results = document.querySelector(".results");
const container = document.querySelector(".container");
const navbar = document.querySelector(".nav");
const welcome = document.querySelector(".welcome");

export const startBtn = function () {
  btnStart.addEventListener("click", function () {
    console.log("btn clicked");
    headerTitle.classList.add("title--mobile");
    headerSearch.classList.add("show-scale-flex");
    welcome.classList.add("out");
    container.classList.add("padding-mobile");
    results.classList.add("show-scale-grid");
    navbar.classList.add("show");
  });
};
