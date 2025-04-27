import createElement from '../../assets/lib/create-element.js';

export default class CartIcon {
  constructor() {
    this.render();

    this.addEventListeners();
  }

  render() {
    this.elem = createElement('<div class="cart-icon"></div>');
  }

  update(cart) {
    if (!cart.isEmpty()) {
      this.elem.classList.add('cart-icon_visible');

      this.elem.innerHTML = `
        <div class="cart-icon__inner">
          <span class="cart-icon__count">${cart.getTotalCount()}</span>
          <span class="cart-icon__price">€${cart.getTotalPrice().toFixed(2)}</span>
        </div>`;

      this.updatePosition();

      this.elem.classList.add('shake');
      this.elem.addEventListener('transitionend', () => {
        this.elem.classList.remove('shake');
      }, {once: true});

    } else {
      this.elem.classList.remove('cart-icon_visible');
    }
  }

  addEventListeners() {
    document.addEventListener('scroll', () => this.updatePosition());
    window.addEventListener('resize', () => this.updatePosition());
  }

  updatePosition() {
    // Проверяем, есть ли товары в корзине
    if (!this.elem.classList.contains('cart-icon_visible')) {
      return; // Если корзина не видима, ничего не делаем
    }
  
    // Проверяем ширину окна
    if (document.documentElement.clientWidth <= 767) {
      // Если ширина экрана меньше или равна 767px, сбрасываем стили
      Object.assign(this.elem.style, {
        position: '',
        top: '',
        left: '',
        zIndex: ''
      });
      return;
    }
  
    // Получаем начальную координату верхней границы иконки
    const initialTopCoord = this.elem.getBoundingClientRect().top;
  
    // Проверяем текущую прокрутку страницы
    const isScrolledPastInitial = window.pageYOffset > initialTopCoord;
  
    if (isScrolledPastInitial) {
      // Позиционируем иконку как фиксированную
      const containerRightEdge = document.querySelector('.container').getBoundingClientRect().right;
      
      // Вычисляем отступ слева
      const leftIndent = Math.min(
        containerRightEdge + 20,
        document.documentElement.clientWidth - this.elem.offsetWidth - 10
      );
  
      Object.assign(this.elem.style, {
        position: 'fixed',
        top: '50px', // Устанавливаем фиксированную позицию сверху
        zIndex: '1000',
        left: `${leftIndent}px` // Устанавливаем смещение на основе вычисленного значения
      });
      
    } else {
      // Возвращаем иконку к исходному состоянию только если она была фиксированной
      Object.assign(this.elem.style, {
        position: '',
        top: '',
        left: '',
        zIndex: ''
      });
    }
  }
}
