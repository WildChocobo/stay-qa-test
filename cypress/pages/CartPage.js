class CartPage {
  #row = '#tbodyid tr';
  #cell = 'td';
  #priceColumnIndex = 2;
  #totalAmount = '#totalp';

  rowPrice(productName) {
    return cy.contains(this.#row, productName).find(this.#cell).eq(this.#priceColumnIndex);
  };

  total() {
    return cy.get(this.#totalAmount);
  };
};

export default new CartPage();
