# Shopping Cart E2E Test — demoblaze.com

Cypress end-to-end test covering the shopping cart flow on [demoblaze.com](https://www.demoblaze.com/): add a phone from the Phones category, add a laptop from the Laptops category, and verify both appear in the cart with the correct total.

---

## Quick Start

### Prerequisites

- Node.js 22.x, 24.x, or ≥26.x ([Cypress 16 requirement](https://docs.cypress.io/app/get-started/install-cypress))

### Setup

```bash
git clone https://github.com/WildChocobo/stay-qa-test.git
cd stay-qa-test
npm install
```

### Run the test

```bash
npx cypress run    # headless
npx cypress open   # interactive Test Runner
```

> **Note:** Cypress's bundled Electron browser is [deprecated as of Cypress 16](https://www.cypress.io/blog/the-electron-browser-is-being-deprecated-in-cypress) and will eventually be removed. `npx cypress run` still works fine with it today — it's kept as the default here because it ships with Cypress and doesn't require a separately installed browser. To run against Chrome instead: `npx cypress run --browser chrome`.

---

## Project Structure

```
stay-qa-test/
├── cypress/
│   ├── e2e/
│   │   └── shoppingCart.cy.js      # The test
│   ├── pages/
│   │   ├── HomePage.js             # Category selection + product listing (index.html)
│   │   ├── ProductDetailPage.js    # Product detail view (prod.html)
│   │   ├── CartPage.js             # Cart view (cart.html)
│   │   └── NavBar.js               # Shared nav (cart link, Home link)
│   └── support/
│       ├── commands.js             # Custom commands (alert stubbing)
│       ├── network.js              # cy.intercept() declarations
│       └── e2e.js                  # Cypress support file (loads commands.js)
├── cypress.config.js                # baseUrl + Cypress config
├── eslint.config.mjs
└── package.json
```

---

## Scripts

| Command            | Description                       |
| ------------------ | ---------------------------------- |
| `npm test`         | Run the test headless (alias for `cypress run`) |
| `npx cypress run`  | Run the test headless              |
| `npx cypress open` | Run the test in the Test Runner    |
| `npm run lint`      | Run ESLint against `cypress/`      |

---

## Design Notes

**Single `it()` block.** Cypress clears cookies and localStorage between `it()` blocks (test isolation). Since the flow depends on the cart carrying state from the phone step into the laptop step, splitting it into multiple `it()`s would reset that state mid-flow.

**Network-driven waits, not fixed timeouts.** Every step that depends on a network response (`cy.intercept()` + `cy.wait('@alias')`) waits for that specific response instead of an arbitrary delay. `bycat` is intercepted for both category switches; `view` is intercepted for both the product detail page load and the cart row rendering, since demoblaze's own `prod.js` and `cart.js` both call that same endpoint. `cy.wait()` calls are kept in the spec itself, not inside Page Object methods, so each step stays explicit about which network call it depends on.

**Page Objects as classes with private fields.** Cypress has no `page` handle to pass around (`cy` is already global), so there's no constructor argument to inject — each Page Object is exported as a single, already-instantiated singleton (`export default new HomePage()`). Selectors are declared as private class fields (`#productTitle = '.card-title a'`) rather than inline inside each method, so a selector used by more than one method is only written once, and the file's fields double as a quick reference for what elements that page exposes.

**`NavBar` is separate from `HomePage`.** The cart link and "Home" link are part of the site's persistent navigation, present on every page — not content specific to the home page — so they live in their own object rather than being folded into `HomePage`.

**Alert stubbing as a custom command.** `window.alert` fires from more than one action on the site (not just "add to cart"), so `cy.stubAlert()` / `cy.expectAlert(message)` are registered as Cypress custom commands in `support/commands.js` rather than being methods on any single Page Object.

**`baseUrl` in `cypress.config.js`.** `cy.visit()` calls use relative paths; the domain is configured once instead of being hardcoded in every Page Object that navigates.
