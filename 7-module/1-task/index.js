import createElement from '../../assets/lib/create-element.js';

export default class RibbonMenu {
  elem = null;
  constructor(categories) {
    this.categories = categories;
    this.#render(); 
  }
  #render() {
    let activeItem = null;
    this.elem = createElement(this.#template());
    const buttonNext = this.elem.querySelector('.ribbon__arrow_right');
    const buttonPrevious = this.elem.querySelector('.ribbon__arrow_left');
    const ribbonInner = this.elem.querySelector('.ribbon__inner');
    buttonPrevious.classList.remove('ribbon__arrow_visible');
    buttonNext.classList.add('ribbon__arrow_visible');
    this.categories.forEach(category => {
      const categoryElement = this.elem.querySelector(`.ribbon__item[data-id="${category.id}"]`);
      categoryElement.addEventListener('click', (event) => {
        event.preventDefault();
        if (activeItem) {
          activeItem.classList.remove('ribbon__item_active');
        }
        categoryElement.classList.add('ribbon__item_active');
        activeItem = categoryElement; 

        const customEvent = new CustomEvent('ribbon-select', { 
          detail: category.id,
          bubbles: true 
        });
        this.elem.dispatchEvent(customEvent); 
      });
    });
    ribbonInner.addEventListener('scroll', () => {
      let scrollLeft = ribbonInner.scrollLeft;
      let clientWidth = ribbonInner.clientWidth;
      let scrollWidth = ribbonInner.scrollWidth;
      let scrollRight = scrollWidth - scrollLeft - clientWidth; 
      if (scrollLeft == 0){
        buttonPrevious.classList.remove('ribbon__arrow_visible');
      }
      else{
        buttonPrevious.classList.add('ribbon__arrow_visible');
      }
      if (scrollRight == 0){
        buttonNext.classList.remove('ribbon__arrow_visible');
      }
      else{
        buttonNext.classList.add('ribbon__arrow_visible');
      }
    })
    buttonNext.addEventListener('click', () => {
      ribbonInner.scrollBy(350, 0);
    })
    buttonPrevious.addEventListener('click', () => {
      ribbonInner.scrollBy(-350, 0);
    })

      };

  #template() {
        let html = `
          <<div class="ribbon">
          <button class="ribbon__arrow ribbon__arrow_left ribbon__arrow_visible">
          <img src="/assets/images/icons/angle-icon.svg" alt="icon">
          </button>
          <nav class="ribbon__inner">`; 
    
        this.categories.forEach(category => {
          html += `<a href="#" class="ribbon__item" data-id=${category.id}>${category.name}</a>`;
        });
    
        html += `</nav>
    <button class="ribbon__arrow ribbon__arrow_right">
      <img src="/assets/images/icons/angle-icon.svg" alt="icon">
    </button>
  </div>`;
        return html;
      }
}
