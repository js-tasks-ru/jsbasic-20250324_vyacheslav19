import createElement from '../../assets/lib/create-element.js';
import ProductCard from '../../6-module/2-task/index.js';

export default class ProductGrid {
  elem = null;
  constructor(products) {
    this.products = products;
    this.filters = {};
    this.#render();
  }

  #render() {
    this.elem = createElement(this.#template());
    this.productContainer = this.elem.querySelector('.products-grid__inner');
    this.#updateProductDisplay(); 
  }

  #template() {
    return `
      <div class="products-grid">
        <div class="products-grid__inner"></div>
      </div>
    `;
  }

  updateFilter(newFilters) {
    Object.assign(this.filters, newFilters);
    this.#updateProductDisplay();
  }

  #updateProductDisplay() {
    this.productContainer.innerHTML = '';
    const filteredProducts = this.products.filter(product => {
      if (this.filters.noNuts && product.nuts) return false;
      if (this.filters.vegeterianOnly && !product.vegeterian) return false;
      if (this.filters.maxSpiciness !== undefined && product.spiciness > this.filters.maxSpiciness) return false;
      if (this.filters.category && product.category !== this.filters.category) return false;

      return true; 
    });


    filteredProducts.forEach(product => {
      const productCard = new ProductCard(product);
      this.productContainer.append(productCard.elem);
    });
  }
}