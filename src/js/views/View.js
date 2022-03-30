export default class View {
  _data;

  render(data) {
    if (!data || (Array.isArray(data) && data.length === 0))
      return this.renderError();

    this._data = data;
    const markup = this._generateMarkup();
    this._clear();
    this._parentElement.insertAdjacentHTML("afterbegin", markup);
  }

  update(data) {
    if (!data || (Array.isArray(data) && data.length === 0)) return;

    this._data = data;
    const newMarkup = this._generateMarkup();

    const newDOM = document.createRange().createContextualFragment(newMarkup);
    const newElements = Array.from(newDOM.querySelectorAll("*"));
    const curElements = Array.from(this._parentElement.querySelectorAll("*"));

    newElements.forEach((newEl, i) => {
      const curEl = curElements[i];

      // Update changed text
      if (
        !newEl.isEqualNode(curEl) &&
        newEl.firstChild?.nodeValue.trim() !== ""
      ) {
        curEl.textContent = newEl.textContent;
      }

      // Update changed attributes
      if (!newEl.isEqualNode(curEl)) {
        Array.from(newEl.attributes).forEach((attr) => {
          curEl.setAttribute(attr.name, attr.value);
        });
      }
    });
  }

  renderSpinner() {
    const markup = `
      <div class="spinner">
        <i class="fa-solid fa-spinner fa-spin"></i>
      </div>
    `;
    this._clear();
    this._parentElement.insertAdjacentHTML("afterbegin", markup);
  }

  renderError(message = this._errorMessage) {
    const markup = `
        <div class="error">
          <div class="error__animation">
          <lottie-player src="https://assets5.lottiefiles.com/packages/lf20_gzlupphk.json"  background="transparent"  speed="1"  style="width: 100px; height: 100px;"    autoplay></lottie-player>
          </div>
          <p class="error__text">${message}</p>
        </div>
    `;
    this._clear();
    this._parentElement.insertAdjacentHTML("afterbegin", markup);
  }

  renderSucess(message = this._successMessage) {
    const markup = `
        <div class="success">
          <div class="success__animation">
          <lottie-player src="https://assets9.lottiefiles.com/packages/lf20_rc5d0f61.json"  background="transparent"  speed="1.5"  style="width: 100px; height: 100px;"    autoplay></lottie-player>
          </div>
          <p class="success__text">${this._successMessage}</p>
        </div>
    `;
    this._clear();
    this._parentElement.insertAdjacentHTML("afterbegin", markup);
  }

  _clear() {
    this._parentElement.innerHTML = "";
  }
}
