import createElement from '../../assets/lib/create-element.js';

export default class StepSlider {
  #steps = 0;
  #value = 0;
  elem = null;

  constructor({ steps, value = 0 }) {
    this.#steps = steps;
    this.#value = value;
    this.#render();
    

    const thumb = this.elem.querySelector('.slider__thumb');

 
    thumb.ondragstart = () => false;

    thumb.addEventListener('pointerdown', (event) => {
      event.preventDefault(); 
      this.elem.classList.add('slider_dragging');

      const onPointerMove = (event) => {
        event.preventDefault(); 
        this.moveSlider(event);
      };

      const onPointerUp = () => {
        this.elem.classList.remove('slider_dragging');
        document.removeEventListener('pointermove', onPointerMove);
        document.removeEventListener('pointerup', onPointerUp);
        
       
        const customEvent = new CustomEvent('slider-change', {
          detail: this.#value,
          bubbles: true,
        });
        this.elem.dispatchEvent(customEvent);
      };

      document.addEventListener('pointermove', onPointerMove);
      document.addEventListener('pointerup', onPointerUp);
    });

    
    this.elem.addEventListener('click', (event) => {
      this.#onClick(event);
      
     
      const customEvent = new CustomEvent('slider-change', {
        detail: this.#value,
        bubbles: true,
      });
      this.elem.dispatchEvent(customEvent);
    });
  }

  #render() {
    this.elem = createElement(this.#template());
    
    const stepsElements = this.elem.querySelectorAll('.slider__steps span');
    stepsElements[0].classList.add('slider__step-active');
  }

  #template() {
    let html = `
      <div class="slider">
        <div class="slider__thumb" style="left: ${this.#value / (this.#steps - 1) * 100}%;">
          <span class="slider__value">${this.#value}</span>
        </div>
        <div class="slider__progress" style="width: ${this.#value / (this.#steps - 1) * 100}%;"></div>
        <div class="slider__steps">`;
    
    for (let i = 0; i < this.#steps; i++) {
      html += `<span></span>`;
    }
    
    html += `
        </div>
      </div>
    `;
    return html;
  }
  #onClick(event) {
    const left = event.clientX - this.elem.getBoundingClientRect().left;
    const leftRelative = left / this.elem.offsetWidth;
    const segments = this.#steps - 1;
    const approximateValue = leftRelative * segments;
    this.#value = Math.round(approximateValue);
    const thumb = this.elem.querySelector('.slider__thumb');
    const progress = this.elem.querySelector('.slider__progress');
    const stepsElements = this.elem.querySelectorAll('.slider__steps span');
    const valuePercents = (this.#value / segments) * 100;
    thumb.style.left = `${valuePercents}%`;
    progress.style.width = `${valuePercents}%`;
    this.#value = Math.round(approximateValue);

    thumb.querySelector('.slider__value').textContent = this.#value;
    stepsElements.forEach((step, index) => {
      step.classList.toggle('slider__step-active', index === this.#value);
      step.classList.remove('slider__step-active');
      if (index === this.#value) {
        step.classList.add('slider__step-active');
      }
    });
    
    const customEvent = new CustomEvent('slider-change', {
      detail: this.#value,
      bubbles: true,
    });

    this.elem.dispatchEvent(customEvent);
  }
  moveSlider(event) {
    const left = event.clientX - this.elem.getBoundingClientRect().left;
    let leftRelative = left / this.elem.offsetWidth;

    if (leftRelative < 0) leftRelative = 0;
    if (leftRelative > 1) leftRelative = 1;

    const leftPercents = leftRelative * 100;
    
    const thumb = this.elem.querySelector('.slider__thumb');
    const progress = this.elem.querySelector('.slider__progress');
    
    thumb.style.left = `${leftPercents}%`;
    progress.style.width = `${leftPercents}%`;

    const segments = this.#steps - 1;
    
    const approximateValue = leftRelative * segments;
    
    this.#value = Math.round(approximateValue);

    thumb.querySelector('.slider__value').textContent = this.#value;

    const stepsElements = this.elem.querySelectorAll('.slider__steps span');
    
    stepsElements.forEach((step, index) => {
      step.classList.toggle('slider__step-active', index === this.#value);
    });
  }
}