class HomePage{
  #categoryLink = '.list-group-item';
  #productTitle = '.card-title a';
  #productPrice = '.card-block h5';
  
  visit() {
    cy.visit('/index.html');
  };
  selectCategory(categoryName) {
    cy.contains(this.#categoryLink, categoryName).click();
  };
  
  product(index) {
    return cy.get(this.#productTitle).eq(index);
  };

  productPrice(index) {
    return cy.get(this.#productPrice).eq(index);
  };

  openProduct(index) {
    cy.get(this.#productTitle).eq(index).click();
  };
};

export default new HomePage();
