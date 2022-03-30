import View from "./View.js";

class resultsView extends View {
  _parentElement = document.querySelector(".results__content");
  _errorMessage = "No recipes found for your query. Please try again!";

  _generateMarkup() {
    const resultsMarkup = this._data.map(this._generateMarkupResult).join("");
    const markup = `<ul class="results__list">
            ${resultsMarkup}
          </ul>`;
    return markup;
  }

  _generateMarkupResult(result) {
    const id = window.location.hash.slice(1);

    return `<li class="result ${result.id === id ? "result--active" : ""}">
            <a class="result__link" href="#${result.id}">
              <figure class="result__fig">
                <img src="${result.image}" alt="${result.title}" />
              </figure>
              <div class="result__data">
                <h4 class="result__title">${result.title}</h4>

                <p class="result__publisher">${result.publisher}</p>
              </div>
              <span class="result__user-generated ${
                result.key ? "" : "hidden"
              }">
                <i class="fa-solid fa-user"></i>
              </span>
            </a>
          </li>
    `;
  }
}

export default new resultsView();
