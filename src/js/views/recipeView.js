import fracty from "fracty";

class RecipeView {
  #parentElement = document.querySelector(".recipe");
  #errorMessage = "We could not find that recipe. Please try another one!";
  #successMessage = "";
  #data;

  render(data) {
    this.#data = data;
    const markup = this.#generateMarkup();
    this.#clear();
    this.#parentElement.insertAdjacentHTML("afterbegin", markup);
  }

  renderSpinner() {
    const markup = `
      <div class="spinner">
        <i class="fa-solid fa-spinner fa-spin"></i>
      </div>
    `;
    this.#clear();
    this.#parentElement.insertAdjacentHTML("afterbegin", markup);
  }

  renderError(message = this.#errorMessage) {
    const markup = `
        <div class="error">
          <div class="error__animation">
          <lottie-player src="https://assets5.lottiefiles.com/packages/lf20_gzlupphk.json"  background="transparent"  speed="1"  style="width: 100px; height: 100px;"    autoplay></lottie-player>
          </div>
          <p class="error__text">${this.#errorMessage}</p>
        </div>
    `;
    this.#clear();
    this.#parentElement.insertAdjacentHTML("afterbegin", markup);
  }

  renderSucess(message = this.#successMessage) {
    const markup = `
        <div class="success">
          <div class="success__animation">
          <lottie-player src="https://assets5.lottiefiles.com/packages/lf20_gzlupphk.json"  background="transparent"  speed="1"  style="width: 100px; height: 100px;"    autoplay></lottie-player>
          </div>
          <p class="success__text">${this.#successMessage}</p>
        </div>
    `;
    this.#clear();
    this.#parentElement.insertAdjacentHTML("afterbegin", markup);
  }

  addHandlerRender(handler) {
    ["hashchange", "load"].forEach((ev) =>
      window.addEventListener(ev, handler)
    );
  }

  #clear() {
    this.#parentElement.innerHTML = "";
  }

  #generateMarkup() {
    return `<figure class="recipe__fig">
            <img
              src="${this.#data.image}"
              alt="${this.#data.title}"
              class="recipe__img"
            />
            <button class="btn--bookmark">
              <span class="">
                <i class="fa-regular fa-bookmark"></i>
              </span>
            </button>
            <button class="btn--back">
              <span class="">
                <i class="fa-solid fa-arrow-left"></i>
              </span>
            </button>
            <h1 class="recipe__title">
              <span>${this.#data.title}</span>
              <span class="recipe__user-generated">
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
                >${this.#data.cookingTime}</span
              >
              <span class="recipe__info-text">minutes</span>
            </div>
            <div class="recipe__info">
              <span class="recipe__info-icon">
                <i class="fa-solid fa-users"></i>
              </span>
              <span class="recipe__info-data recipe__info-data--people">${
                this.#data.servings
              }</span>
              <span class="recipe__info-text">servings</span>

              <div class="recipe__info-buttons">
                <button class="btn--tiny btn--tiny-servings">
                  <span class="btn--tiny-icon">
                    <i class="fa-solid fa-circle-minus"></i>
                  </span>
                </button>
                <button class="btn--tiny btn--tiny-servings">
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
            ${this.#data.ingredients
              .map(this.#generateMarkupIngredient)
              .join("")}  
            
            </ul>
          </div>

          <div class="recipe__directions">
            <h2 class="heading--2">How to cook it</h2>
            <p class="recipe__directions-text">
              This recipe was carefully designed and tested by
              <span class="recipe__publisher">${
                this.#data.publisher
              }</span>. Please
              check out directions at their website.
            </p>
            <a
              class="btn--recipe"
              href="${this.#data.sourceUrl}"
              target="_blank"
            >
              <span>Directions</span>
              <span class="search__icon">
                <i class="fa-solid fa-arrow-right"></i>
              </span>
            </a>
          </div>`;
  }

  #generateMarkupIngredient(ing) {
    return `<li class="recipe__ingredient">
                <span class="recipe__icon">
                  <i class="fa-solid fa-check"></i>
                </span>
                <span class="recipe__quantity">${
                  (ing.quantity && fracty(ing.quantity)) || " "
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
