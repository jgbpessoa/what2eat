import View from "./View.js";

class PaginationView extends View {
  _parentElement = document.querySelector(".results__pagination");

  clearPagination() {
    this._clear();
  }

  addHandlerClick(handler) {
    this._parentElement.addEventListener("click", function (e) {
      const btn = e.target.closest(".btn--pagination");

      if (!btn) return;

      const goToPage = +btn.dataset.goto;
      document.querySelector(".results").scrollTop = 0;
      handler(goToPage);
    });
  }

  _generateMarkup() {
    let btnMarkup = "";
    const numPages = Math.ceil(
      this._data.results.length / this._data.resultsPerPage
    );

    if (!numPages) return "";

    // First page and there are no other pages

    if (this._data.page === 1 && numPages === 1) return;

    // First page and there are other pages

    if (this._data.page === 1 && numPages > 1)
      return `
      <span class="page">${this._data.page}</span>
      <button data-goto="${
        this._data.page + 1
      }" class="btn--pagination btn--pagination-next">
            <span><i class="fa-solid fa-arrow-right"></i></span>
          </button>`;

    // Between pages

    if (this._data.page !== 1 && this._data.page < numPages)
      return `<button data-goto="${
        this._data.page - 1
      }" class="btn--pagination btn--pagination-prev">
            <span><i class="fa-solid fa-arrow-left"></i></span>
          </button>
          <span class="page">${this._data.page}</span>
          <button
          data-goto="${
            this._data.page + 1
          }" class="btn--pagination btn--pagination-next">
            <span><i class="fa-solid fa-arrow-right"></i></span>
          </button>`;

    // Last Page

    if (this._data.page === numPages)
      return `<button data-goto="${
        this._data.page - 1
      }" class="btn--pagination btn--pagination-prev">
            <span><i class="fa-solid fa-arrow-left"></i></span>
          </button>
          <span class="page">${this._data.page}</span>
          `;
  }
}

export default new PaginationView();
