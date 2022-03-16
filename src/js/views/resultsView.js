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
    return `<li class="result">
            <a class="result__link result__link--active" href="#${result.id}">
              <figure class="result__fig">
                <img src="${result.image}" alt="${result.title}" />
              </figure>
              <div class="result__data">
                <h4 class="result__title">${result.title}</h4>
                <p class="result__publisher">${result.publisher}</p>
                <div class="result__user-generated">
                </div>
              </div>
            </a>
          </li>
    `;
  }
}

export default new resultsView();
