import View from "./View.js";

class AddRecipeView extends View {
  _parentElement = document.querySelector(".upload");
  _successMessage = "Recipe was sucessfully uploaded!";

  _window = document.querySelector(".recipe-upload");
  _overlay = document.querySelector(".overlay");
  _btnOpen = document.querySelector(".nav__btn--upload");
  _btnClose = document.querySelector(".close-modal");

  constructor() {
    super();
    this._addHandlerShowWindow();
    this._addHandlerHideWindow();
  }

  toggleWindow() {
    this._overlay.classList.toggle("show");
    this._window.classList.toggle("show");
  }

  _addHandlerShowWindow() {
    this._btnOpen.addEventListener("click", this.toggleWindow.bind(this));
  }

  _addHandlerHideWindow() {
    this._btnClose.addEventListener("click", this.toggleWindow.bind(this));
    this._overlay.addEventListener("click", this.toggleWindow.bind(this));
  }

  addHandlerUpload(handler) {
    this._parentElement.addEventListener("submit", function (e) {
      e.preventDefault();
      const dataArr = [...new FormData(this)];
      const data = Object.fromEntries(dataArr);
      handler(data);
    });
  }

  _generateMarkup() {}
}

export default new AddRecipeView();
