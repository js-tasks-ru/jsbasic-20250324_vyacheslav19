import createElement from '../../assets/lib/create-element.js';

export default class Modal {
  elem = null;

  constructor() {
    this.elem = createElement(this.#template());
  }

  open() {
    document.body.appendChild(this.elem);
    document.body.classList.add('is-modal-open');
    this.closeButton = this.elem.querySelector('.modal__close');
    this.closeButton.addEventListener('click', () => this.close());
    document.addEventListener('keydown', (event) => {
      if (event.code === 'Escape') {
        this.close();
      }});
  }

  close() {
    if (this.elem) {
      this.elem.remove();
      document.body.classList.remove('is-modal-open');
      document.removeEventListener('keydown', this.handleKeyDown);
    }
  }

  setTitle(title) {
    const titleElement = this.elem.querySelector('.modal__title');
    titleElement.textContent = title;
  }

  setBody(node) {
    const bodyElement = this.elem.querySelector('.modal__body');
    bodyElement.innerHTML = '';
    bodyElement.appendChild(node); 
  }

  #template() {
    return `
      <div class="modal">
        <div class="modal__overlay"></div>
        <div class="modal__inner">
          <div class="modal__header">
            <button type="button" class="modal__close">
              <img src="/assets/images/icons/cross-icon.svg" alt="close-icon" />
            </button>
            <h3 class="modal__title"></h3>
          </div>
          <div class="modal__body"></div>
        </div>
      </div>`;
  }
}