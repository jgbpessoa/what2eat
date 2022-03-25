import View from "./View.js";

class BookmarksView extends View {
  _parentElement = document.querySelector(".bookmarks__list");
  _errorMessage = "No bookmarks yet. Find a nice recipe and bookmark it!";

  addHandlerRender(handler) {
    window.addEventListener("load", handler);
  }

  _generateMarkup() {
    return this._data.map(this._generateMarkupResult).join("");
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
                <div class="result__user-generated">
                </div>
              </div>
            </a>
          </li>
    `;
  }
}

export default new BookmarksView();
