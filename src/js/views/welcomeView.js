class WelcomeView {
  _btnStart = document.querySelector(".btn--start");
  _headerTitle = document.querySelector(".title");
  _headerSearch = document.querySelector(".header__search");
  _results = document.querySelector(".results");
  _container = document.querySelector(".container");
  _navbar = document.querySelector(".nav");
  _welcome = document.querySelector(".welcome");

  constructor() {
    this._start();
  }

  _mobileStart() {
    this._headerTitle.classList.add("title--mobile");
    this._headerSearch.classList.add("show-scale-flex");
    this._welcome.classList.add("out");
    this._container.classList.add("padding-mobile");
    this._results.classList.add("show-scale-grid");
    this._navbar.classList.add("show");
  }
  _start() {
    this._btnStart.addEventListener("click", this._mobileStart.bind(this));
  }
}

export default new WelcomeView();
