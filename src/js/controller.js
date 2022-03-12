import "babel-polyfill";
import * as model from "./model.js";
import recipeView from "./views/recipeView.js";

// Variables
const btnStart = document.querySelector(".btn--start");
const headerTitle = document.querySelector(".title");
const headerSearch = document.querySelector(".header__search");
const results = document.querySelector(".results");
const container = document.querySelector(".container");
const recipeContainer = document.querySelector(".recipe");
const navbar = document.querySelector(".nav");
const welcome = document.querySelector(".welcome");

btnStart.addEventListener("click", function () {
  console.log("btn clicked");
  headerTitle.classList.add("title--mobile");
  headerSearch.classList.add("show-scale");
  welcome.classList.add("hidden");
  container.classList.add("padding-mobile");
  // results.classList.add("show-scale");
  recipeContainer.classList.add("show-scale");
  navbar.classList.add("show");
});

const controlRecipes = async function () {
  recipeView.renderSpinner();
  try {
    const id = window.location.hash.slice(1);

    if (!id) return;

    // Loading Recipe
    await model.loadRecipe(id);

    // Rendenring recipe
    recipeView.render(model.state.recipe);
  } catch (err) {
    alert(err);
  }
};

// Fixing mobile browsers 100vh issue
const appHeight = () => {
  const doc = document.documentElement;
  doc.style.setProperty("--app-height", `${window.innerHeight}px`);
};
window.addEventListener("resize", appHeight);

["hashchange", "load"].forEach((ev) =>
  window.addEventListener(ev, controlRecipes)
);

const init = function () {
  appHeight();
};

init();
