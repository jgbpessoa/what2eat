import "babel-polyfill";
import * as model from "./model.js";
import { MODAL_CLOSE_SEC } from "./config.js";
import recipeView from "./views/recipeView.js";
import welcomeView from "./views/welcomeView.js";
import searchView from "./views/searchView.js";
import resultsView from "./views/resultsView.js";
import paginationView from "./views/paginationView.js";
import bookmarksView from "./views/bookmarksView.js";
import addRecipeView from "./views/addRecipeView.js";
import shoppingListView from "./views/shoppingListView.js";

const controlRecipes = async function () {
  const id = window.location.hash.slice(1);
  if (!id) return;

  recipeView.renderSpinner();
  try {
    // Update results view to mark selected search result
    resultsView.update(model.getSearchResultsPage());

    // Update bookmarks
    bookmarksView.update(model.state.bookmarks);

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

const controlServings = function (newServings) {
  // Update the recipe servings (in state)
  model.updateServings(newServings);

  // Update the recipe view
  // recipeView.render(model.state.recipe);
  recipeView.update(model.state.recipe);
};

const controlAddBookmark = function () {
  // Add/remove bookmark
  if (!model.state.recipe.bookmarked) model.addBookmark(model.state.recipe);
  else model.deleteBookmark(model.state.recipe.id);

  // Update recipe view
  recipeView.update(model.state.recipe);

  // Render bookmarks
  bookmarksView.render(model.state.bookmarks);
};

const controlBookmarks = function () {
  bookmarksView.render(model.state.bookmarks);
};

const controlAddRecipe = async function (newRecipe) {
  try {
    // Load spinner
    addRecipeView.renderSpinner();

    // Upload the new recipe data
    await model.uploadRecipe(newRecipe);

    // Render new recipe
    recipeView.render(model.state.recipe);

    // Sucess message
    addRecipeView.renderSucess();

    // Change ID in the URL
    window.history.pushState(null, "", `#${model.state.recipe.id}`);

    // Render bookmark view
    bookmarksView.render(model.state.bookmarks);

    // Close form window
    setTimeout(function () {
      addRecipeView.toggleWindow();
    }, MODAL_CLOSE_SEC * 1000);
  } catch (err) {
    console.error(err);
    addRecipeView.renderError(err.message);
  }
};

const controlAddShoppingList = function (item) {
  if (model.state.shoppingList.includes(item)) return;
  model.addShoppingList(item);
  shoppingListView.render(model.state.shoppingList);
};

const controlDeleteShoppingList = function (index) {
  // Delete from Shopping List Array
  model.deleteShoppingList(index);

  // Render new Shopping list
  shoppingListView.render(model.state.shoppingList);
};

const controlShoppingList = function () {
  shoppingListView.render(model.state.shoppingList);
};

// Fixing mobile browsers 100vh issue
const appHeight = () => {
  const doc = document.documentElement;
  doc.style.setProperty("--app-height", `${window.innerHeight}px`);
};
window.addEventListener("resize", appHeight);

const init = function () {
  appHeight();
  bookmarksView.addHandlerRender(controlBookmarks);
  shoppingListView.addHandlerRender(controlShoppingList);
  shoppingListView.addHandlerDelete(controlDeleteShoppingList);
  recipeView.addHandlerRender(controlRecipes);
  recipeView.addHandlerBackBtn();
  recipeView.addHandlerUpdateServings(controlServings);
  recipeView.addHandlerAddBookmark(controlAddBookmark);
  recipeView.addHandlerShoppingList(controlAddShoppingList);
  searchView.addHandlerSearch(controlSearchResults);
  paginationView.addHandlerClick(controlPagination);
  addRecipeView.addHandlerUpload(controlAddRecipe);
};

init();
