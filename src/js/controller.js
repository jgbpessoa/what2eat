import "babel-polyfill";
import * as model from "./model.js";
import recipeView from "./views/recipeView.js";
import * as welcomeView from "./views/welcomeView.js";

const controlRecipes = async function () {
  const id = window.location.hash.slice(1);
  if (!id) return;

  recipeView.renderSpinner();
  try {
    // Loading Recipe
    await model.loadRecipe(id);

    // Rendenring recipe
    recipeView.render(model.state.recipe);
  } catch (err) {
    console.error(err);
    recipeView.renderError();
  }
};

// Fixing mobile browsers 100vh issue
const appHeight = () => {
  const doc = document.documentElement;
  doc.style.setProperty("--app-height", `${window.innerHeight}px`);
};
window.addEventListener("resize", appHeight);

const init = function () {
  appHeight();
  recipeView.addHandlerRender(controlRecipes);
  welcomeView.startBtn();
};

init();
