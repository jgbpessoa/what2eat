class SearchView {
  _parentElement = document.querySelector(".header__search");

  getQuery() {
    const query = this._parentElement.querySelector(".search__field").value;
    this._clearInput();
    this._parentElement.querySelector(".search__field").blur();
    return query;
  }

  _clearInput() {
    this._parentElement.querySelector(".search__field").value = "";
  }

  addHandlerSearch(handler) {
    this._parentElement.addEventListener("submit", function (e) {
      e.preventDefault();
      if (window.innerWidth < 768) {
        document.querySelector(".results").classList.add("show-scale-grid");
        document.querySelector(".recipe").classList.remove("show");
      }
      handler();
    });
  }
}

export default new SearchView();
