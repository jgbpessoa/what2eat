import View from "./View.js";

class ShoppingListView extends View {
  _parentElement = document.querySelector(".shopping__list");
  _slidingModal = document.querySelector(".shopping");
  _btnOpen = document.querySelector(".open-list");
  _btnClose = document.querySelector(".close-list");
  _errorMessage =
    "No items... Find a nice recipe and add some ingredients to your shopping list!";

  constructor() {
    super();
    this._showShoppingList();
  }

  _toggleShoppingList() {
    this._slidingModal.classList.toggle("visible");
  }

  _showShoppingList() {
    this._btnOpen.addEventListener(
      "click",
      this._toggleShoppingList.bind(this)
    );
    this._btnClose.addEventListener(
      "click",
      this._toggleShoppingList.bind(this)
    );
  }

  addHandlerRender(handler) {
    window.addEventListener("load", handler);
  }

  addHandlerDelete(handler) {
    this._parentElement.addEventListener("click", function (e) {
      const btn = e.target.classList.contains("checkmark")
        ? e.target.previousSibling
        : e.target.closest(".item");

      if (!btn) return;
      btn.checked = true;

      const index = +btn.id.replace(/\D/g, "") - 1;

      if (btn.checked === true) {
        const item = btn.parentNode;
        item.classList.add("deleted");
        item.querySelector(".label").classList.add("stroked");
        setTimeout(function () {
          handler(index);
        }, 500);
      }
    });
  }

  _generateMarkup() {
    return this._data.map(this._generateMarkupItem.bind(this)).join("");
  }

  _generateMarkupItem(item) {
    const markup = `<li class="shopping__item"><input class="item" type="checkbox" id="ingredient-${
      this._data.indexOf(item) + 1
    }" name="ingredient"><span class="checkmark"></span> <label for="ingredient-${
      this._data.indexOf(item) + 1
    }" class="label">${item}</label></li>`;
    this._counter++;
    return markup;
  }
}

export default new ShoppingListView();
