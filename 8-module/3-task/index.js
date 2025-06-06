export default class Cart {
  cartItems = []; // (1) [product: {...}, count: N]

  constructor(cartIcon) { 
    this.cartIcon = cartIcon;
  }

  onProductUpdate(cartItem) { 
    this.cartIcon.update(this);
  }

  addProduct(product) {
    if (!product) return;

    const existingCartItem = this.cartItems.find(item => item.product.id === product.id);

    if (existingCartItem) {
      existingCartItem.count += 1;
      this.onProductUpdate(existingCartItem);
    } else {
      const newCartItem = { product, count: 1 };
      this.cartItems.push(newCartItem);
      this.onProductUpdate(newCartItem);
    }
  }

  updateProductCount(productId, amount) {
    const cartItem = this.cartItems.find(item => item.product.id === productId);

    if (cartItem) {
      cartItem.count += amount;
      if (cartItem.count <= 0) {
        this.cartItems = this.cartItems.filter(item => item.product.id !== productId);
      }

      this.onProductUpdate(cartItem);
    }
  }

  isEmpty() {
    return this.cartItems.length === 0;
  }

  getTotalCount() {
    return this.cartItems.reduce((total, item) => total + item.count, 0);
  }

  getTotalPrice() {
    return this.cartItems.reduce((total, item) => total + item.product.price * item.count, 0);
  }
}