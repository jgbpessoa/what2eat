import "babel-polyfill";

// Variables
const btnStart = document.querySelector(".btn--start");
const headerTitle = document.querySelector(".title");
const headerSearch = document.querySelector(".header__search");
const results = document.querySelector(".results");
const container = document.querySelector(".container");
const navbar = document.querySelector(".nav");
const welcome = document.querySelector(".welcome");

btnStart.addEventListener("click", function () {
  console.log("btn clicked");
  headerTitle.classList.add("title--mobile");
  headerSearch.classList.add("header__search--mobile");
  welcome.classList.add("hidden");
  container.classList.add("padding-mobile");
  results.classList.add("show-scale");
  navbar.classList.add("show");
});

const showRecipe = async function () {
  try {
    // Loading Recipe
    const res = await fetch(
      "https://forkify-api.herokuapp.com/api/v2/recipes/5ed6604591c37cdc054bc886"
    );

    const data = await res.json();
    if (!res.ok) throw new Error(`${data.message} (${res.status})`);

    let { recipe } = data.data;

    recipe = {
      id: recipe.id,
      title: recipe.title,
      publisher: recipe.publisher,
      sourceUrl: recipe.source_url,
      image: recipe.image_url,
      servings: recipe.servings,
      cookingTime: recipe.cooking_time,
      ingredients: recipe.ingredients,
    };

    console.log(recipe);

    // Rendenring recipe
    const markup = ``;
  } catch (err) {
    alert(err);
  }
};

showRecipe();
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
