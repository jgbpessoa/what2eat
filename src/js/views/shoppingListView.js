import View from "./View.js";

class ShoppingListView extends View {
  _parentElement = document.querySelector(".shopping__list");
  _errorMessage =
    "No items... Find a nice recipe and add some ingredients to your shopping list!";

  addHandlerRender(handler) {
    window.addEventListener("load", handler);
  }

  addHandlerDelete(handler) {
    this._parentElement.addEventListener("click", function (e) {
      const btn = e.target.closest("#ingredient");
      if (!btn) return;

      const index = +btn.name.replace(/\D/g, "") - 1;
      console.log(index);

      if (btn.checked === true) {
        setTimeout(function () {
          handler(index);
        }, 1000);
      }
    });
  }

  _generateMarkup() {
    return this._data.map(this._generateMarkupItem.bind(this)).join("");
  }

  _generateMarkupItem(item) {
    const markup = `<li class="shopping__item"><input type="checkbox" id="ingredient" name="ingredient-${
      this._data.indexOf(item) + 1
    }"><label for="ingredient-${
      this._data.indexOf(item) + 1
    }">${item}</label></li>`;
    this._counter++;
    return markup;
  }
}

export default new ShoppingListView();
