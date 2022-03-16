import "babel-polyfill";
import * as model from "./model.js";
import recipeView from "./views/recipeView.js";
import * as welcomeView from "./views/welcomeView.js";
import searchView from "./views/searchView.js";
import resultsView from "./views/resultsView.js";
import paginationView from "./views/paginationView.js";

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
    console.log(err);
    recipeView.renderError();
  }
};

const controlSearchResults = async function () {
  paginationView.clearPagination();
  resultsView.renderSpinner();

  // Get search query
  const query = searchView.getQuery();
  if (!query) return;
  try {
    // Loading Search Results
    await model.loadSearchResults(query);

    // Rendering Search Results
    resultsView.render(model.getSearchResultsPage());

    // Rendering Pagination Buttons
    paginationView.render(model.state.search);
  } catch (err) {
    console.error(err);
  }
};

const controlPagination = function (goToPage) {
  // Rendering new Search Results
  resultsView.render(model.getSearchResultsPage(goToPage));

  // Rendering new Pagination Buttons
  paginationView.render(model.state.search);
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
  searchView.addHandlerSearch(controlSearchResults);
  paginationView.addHandlerClick(controlPagination);
};

init();
