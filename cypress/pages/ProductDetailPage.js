class ProductDetailPage {
  #name = '#tbodyid .name';
  #price = '#tbodyid .price-container';
  #addToCartButton = '#tbodyid .btn';

  name() {
    return cy.get(this.#name);
  };

  price() {
    return cy.get(this.#price);
  };

  addToCart() {
    cy.get(this.#addToCartButton).click();
  };
};

export default new ProductDetailPage();
