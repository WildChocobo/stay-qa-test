export function goToCart() {
  cy.get('#cartur').click();
}

export function goHome() {
  cy.contains('.nav-link', 'Home').click();
}
