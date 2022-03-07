// Variables
const btnStart = document.querySelector(".btn--start");
const headerTitle = document.querySelector(".title");
const headerSearch = document.querySelector(".header__search");
const results = document.querySelector(".results");
const recipe = document.querySelector(".recipe");

btnStart.addEventListener("click", function () {
  console.log("btn clicked");
  headerTitle.classList.add("title--mobile");
  headerSearch.classList.add("header__search--mobile");
  results.classList.add("show");
  recipe.classList.add("hidden");
});

// Fixing mobile browsers 100vh issue
const appHeight = () => {
  const doc = document.documentElement;
  doc.style.setProperty("--app-height", `${window.innerHeight}px`);
};
window.addEventListener("resize", appHeight);

const init = function () {
  appHeight();
};

init();
