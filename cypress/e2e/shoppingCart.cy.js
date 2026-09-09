import HomePage from '../pages/HomePage';
import ProductDetailPage from '../pages/ProductDetailPage';
import NavBar from '../pages/NavBar';
import CartPage from '../pages/CartPage';
import { interceptByCat, interceptViewDetail } from '../support/network';

describe('Shopping cart test', () => {
  it('Adds a phone and a laptop to the cart and verifies the total', () => {

    let phoneName;
    let phonePrice;
    let laptopName;
    let laptopPrice;

    HomePage.visit();
    interceptByCat();
    HomePage.selectCategory('Phones');
    cy.wait('@byCat');

    HomePage.product(0).invoke('text').then((text) => {
      phoneName = text.trim();
    });
    HomePage.productPrice(0).invoke('text').then((text) => {
      phonePrice = text.replace('$', '');
    });

    HomePage.openProduct(0);
    ProductDetailPage.name().should(($el) => {
      expect($el.text().trim()).to.eq(phoneName);
    });
    ProductDetailPage.price().should(($el) => {
      expect($el.text()).to.contain(phonePrice);
    });

    cy.stubAlert();
    ProductDetailPage.addToCart();
    cy.expectAlert('Product added');

    interceptViewDetail();
    NavBar.goToCart();
    cy.wait('@viewDetail').then(() => {
      CartPage.rowPrice(phoneName).should('contain.text', phonePrice);
    });

    NavBar.goHome();
    HomePage.selectCategory('Laptops');
    cy.wait('@byCat');

    HomePage.product(1).invoke('text').then((text) => {
      laptopName = text.trim();
    });
    HomePage.productPrice(1).invoke('text').then((text) => {
      laptopPrice = text.replace('$', '');
    });

    HomePage.openProduct(1);
    cy.wait('@viewDetail');
    ProductDetailPage.name().should(($el) => {
      expect($el.text().trim()).to.eq(laptopName);
    });
    ProductDetailPage.price().should(($el) => {
      expect($el.text()).to.contain(laptopPrice);
    });

    cy.stubAlert();
    ProductDetailPage.addToCart();
    cy.expectAlert('Product added');

    NavBar.goToCart();
    cy.wait(['@viewDetail', '@viewDetail']).then(() => {
      CartPage.rowPrice(phoneName).should('contain.text', phonePrice);
      CartPage.rowPrice(laptopName).should('contain.text', laptopPrice);
      CartPage.total().should(($el) => {
        const expectedTotal = parseFloat(phonePrice) + parseFloat(laptopPrice);
        expect(Number($el.text())).to.eq(expectedTotal);
      });
    });
  });
});
