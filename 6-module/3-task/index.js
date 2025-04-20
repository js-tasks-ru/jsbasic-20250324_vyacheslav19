import createElement from '../../assets/lib/create-element.js';


export default class Carousel {
  elem = null;
  #currentSlideNumber = 0; 
  #slides = []; 

  constructor(slides) {
    this.#slides = slides || this.#slides;
    this.#render(); 
  }

  #render() {
    this.elem = createElement(this.#template());
    this.carouselInner = this.elem.querySelector('.carousel__inner');
    this.nextArrow = this.elem.querySelector('.carousel__arrow_right');
    this.previousArrow = this.elem.querySelector('.carousel__arrow_left');
    const plusButtons = this.elem.querySelectorAll('.carousel__button');
    plusButtons.forEach(button => {
      button.addEventListener('click', (event) => {
        const slideId = event.currentTarget.closest('.carousel__slide').dataset.id; 
        const customEvent = new CustomEvent('product-add', { 
          detail: slideId,
          bubbles: true 
        });
        this.elem.dispatchEvent(customEvent); 
      });
    });

    
    this.previousArrow.style.display = 'none';
    

    this.#updateArrows();
    

    this.nextArrow.addEventListener('click', () => {
      this.#currentSlideNumber += 1;
      this.#moveToSlide(this.#currentSlideNumber);
      this.#updateArrows();
    });

    this.previousArrow.addEventListener('click', () => {
      this.#currentSlideNumber -= 1;
      this.#moveToSlide(this.#currentSlideNumber);
      this.#updateArrows();
    });
  }
  
  #template() {
    let html = `
      <div class="carousel">
        <div class="carousel__arrow carousel__arrow_right">
          <img src="/assets/images/icons/angle-icon.svg" alt="icon">
        </div>
        <div class="carousel__arrow carousel__arrow_left">
          <img src="/assets/images/icons/angle-left-icon.svg" alt="icon">
        </div>
        <div class="carousel__inner">`; 

    this.#slides.forEach(slide => {
      html += `
        <div class="carousel__slide" data-id="${slide.id}">
          <img src="/assets/images/carousel/${slide.image}" class="carousel__img" alt="slide">
          <div class="carousel__caption">
            <span class="carousel__price">€${slide.price.toFixed(2)}</span>
            <div class="carousel__title">${slide.name}</div>
            <button type="button" class="carousel__button">
              <img src="/assets/images/icons/plus-icon.svg" alt="icon">
            </button>
          </div>
        </div>`;
    });

    html += `</div></div>`;
    
    return html;
  }

  #moveToSlide(slideIndex) {
    const slides = this.carouselInner.children;
    const width = slides[0].offsetWidth; 
    const translateX = -slideIndex * width; 
    this.carouselInner.style.transform = `translateX(${translateX}px)`; 
  }

  #updateArrows() {
    const slidesCount = this.#slides.length;

    if (this.#currentSlideNumber === slidesCount - 1) {
      this.nextArrow.style.display = 'none'; 
    } else {
      this.nextArrow.style.display = ''; 
    }

    if (this.#currentSlideNumber === 0) {
      this.previousArrow.style.display = 'none'; 
    } else {
      this.previousArrow.style.display = ''; 
    }
  }
}
