import View from "./View.js";
import Fraction from "fraction.js";

class RecipeView extends View {
  _parentElement = document.querySelector(".recipe");
  _ingList = document.querySelector(".recipe__ingredients");
  _errorMessage = "We could not find that recipe. Please try another one!";
  _successMessage = "";

  addHandlerRender(handler) {
    ["hashchange", "load"].forEach((ev) =>
      window.addEventListener(ev, function () {
        if (!window.location.hash) return;

        document.querySelector(".results").classList.remove("show-scale-grid");
        document.querySelector(".recipe").classList.add("show");
        document.querySelector(".title").classList.add("title--mobile");
        document.querySelector(".welcome").classList.add("hidden");
        document
          .querySelector(".header__search")
          .classList.add("show-scale-flex");
        document.querySelector(".nav").classList.add("show");
        document.querySelector(".recipe").classList.remove("out");
        if (window.innerWidth < 768)
          document.querySelector(".container").classList.add("padding-mobile");

        handler();
      })
    );
  }

  addHandlerBackBtn() {
    this._parentElement.addEventListener("click", function (e) {
      const btn = e.target.closest(".btn--back");

      if (!btn) return;
      console.log("click btn--back");
      document.querySelector(".recipe").classList.add("out");
      document.querySelector(".results").classList.add("show-scale-grid");
    });
  }

  addHandlerUpdateServings(handler) {
    this._parentElement.addEventListener("click", function (e) {
      const btn = e.target.closest(".btn--tiny-servings");

      if (!btn) return;
      const { updateTo } = btn.dataset;

      if (+updateTo > 0) handler(+updateTo);
    });
  }

  addHandlerAddBookmark(handler) {
    this._parentElement.addEventListener("click", function (e) {
      const btn = e.target.closest(".btn--bookmark");

      if (!btn) return;
      handler();
    });
  }

  addHandlerShoppingList(handler) {
    this._parentElement.addEventListener("click", function (e) {
      const btn = e.target.closest(".btn--tiny-cart");
      if (!btn) return;
      const item = e.path
        .find((el) => el.classList.contains("recipe__ingredient"))
        .innerText.replace("\n", " ");
      handler(item);
    });
  }

  _generateMarkup() {
    return `<figure class="recipe__fig">
            <img
              src="${this._data.image}"
              alt="${this._data.title}"
              class="recipe__img"
            />
            <button class="btn--bookmark">
              <span class="">
                <i class="fa-${
                  this._data.bookmarked ? "solid" : "regular"
                } fa-bookmark"></i>
              </span>
            </button>
            <button class="btn--back">
              <span class="">
                <i class="fa-solid fa-arrow-left"></i>
              </span>
            </button>
            <h1 class="recipe__title">
              <span class="text">${this._data.title}</span>
              <span class="recipe__user-generated ${
                this._data.key ? "" : "hidden"
              }">
                <i class="fa-solid fa-user"></i>
              </span>
            </h1>
          </figure>

          <div class="recipe__details">
            <div class="recipe__info">
              <span class="recipe__info-icon">
                <i class="fa-solid fa-clock"></i>
              </span>
              <span class="recipe__info-data recipe__info-data--minutes"
                >${this._data.cookingTime}</span
              >
              <span class="recipe__info-text">minutes</span>
            </div>
            <div class="recipe__info">
              <span class="recipe__info-icon">
                <i class="fa-solid fa-users"></i>
              </span>
              <span class="recipe__info-data recipe__info-data--people">${
                this._data.servings
              }</span>
              <span class="recipe__info-text">servings</span>

              <div class="recipe__info-buttons">
                <button data-update-to="${
                  this._data.servings - 1
                }" class="btn--tiny btn--tiny-servings">
                  <span class="btn--tiny-icon">
                    <i class="fa-solid fa-circle-minus"></i>
                  </span>
                </button>
                <button data-update-to="${
                  this._data.servings + 1
                }" class="btn--tiny btn--tiny-servings">
                  <span class="btn--tiny-icon">
                    <i class="fa-solid fa-circle-plus"></i>
                  </span>
                </button>
              </div>
            </div>
          </div>

          <div class="recipe__ingredients">
            <h2 class="heading--2">Recipe ingredients</h2>
            <ul class="recipe__ingredient-list">
            ${this._data.ingredients
              .map(this._generateMarkupIngredient)
              .join("")}  
            
            </ul>
          </div>

          <div class="recipe__directions">
            <h2 class="heading--2">How to cook it</h2>
            <p class="recipe__directions-text">
              This recipe was carefully designed and tested by
              <span class="recipe__publisher">${
                this._data.publisher
              }</span>. Please
              check out directions at their website.
            </p>
            <a
              class="btn--recipe"
              href="${this._data.sourceUrl}"
              target="_blank"
            >
              <span>Directions</span>
              <span class="search__icon">
                <i class="fa-solid fa-arrow-right"></i>
              </span>
            </a>
          </div>`;
  }

  _generateMarkupIngredient(ing) {
    if (ing.quantity === 0.33) ing.quantity = new Fraction(1 / 3);
    if (ing.quantity) ing.quantity = new Fraction(ing.quantity);
    return `<li class="recipe__ingredient">
                <span class="recipe__icon">
                  <i class="fa-solid fa-check"></i>
                </span>
                <span class="recipe__quantity">${
                  (ing.quantity && ing.quantity.toFraction(true)) || " "
                }</span>
                <span class="recipe__description">
                  <span class="recipe__unit">${ing.unit}</span>
                  ${ing.description}
                </span>
                <button class="btn--tiny btn--tiny-cart">
                  <span class="recipe__icon">
                    <i class="fa-solid fa-cart-plus"></i>
                  </span>
                </button>
              </li>`;
  }
}

export default new RecipeView();
