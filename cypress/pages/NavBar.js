class NavBar {
  #cartLink = '#cartur';
  #navLink = '.nav-link';

  goToCart() {
    cy.get(this.#cartLink).click();
  };

  goHome() {
    cy.contains(this.#navLink, 'Home').click();
  };
};

export default new NavBar();
