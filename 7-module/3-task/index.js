import createElement from '../../assets/lib/create-element.js';

export default class StepSlider {
  #steps = 0;
  #value;
  elem = null;

  constructor({ steps, value = 0 }) {
    this.#steps = steps;
    this.#value = value;
    this.#render();
    const first_step = this.elem.querySelector('.slider__steps span');
    first_step.classList.add('slider__step-active');
    this.elem.addEventListener('click', this.#onClick.bind(this)); 
  }

  #render() {
    this.elem = createElement(this.#template());
  }

  #template() {
    let html = `
      <div class="slider">
        <div class="slider__thumb" style="left: 0%;">
          <span class="slider__value">${this.#value}</span>
        </div>
        <div class="slider__progress" style="width: 0%;"></div>
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
}