describe('TAU — Cypress Learning Path', () => {
  const CYPRESS_PATH =
    '#app > div.theme-container.no-sidebar > div.page > div.content__default > div > div > div > div:nth-child(2) > div:nth-child(2) > div:nth-child(3) > div > div > a > h3';

  const COURSE = 'Introduction to Cypress';

  it('slowly scroll to footer, back to top, stay at top, click Cypress Path', () => {
    // 1. Homepage
    cy.visit('/', { failOnStatusCode: false });
    cy.wait(2000);

    // 2. Go to Learning Paths
    cy.contains('a', 'Learning Paths', { timeout: 20000 })
      .should('be.visible')
      .trigger('mouseover', { force: true })
      .wait(1000)
      .click({ force: true });

    cy.wait(2000);
    cy.url().should('include', 'learningpaths');

    // 3. Scroll down to footer — extra slow, human
    cy.scrollTo('bottom', { duration: 20000, easing: 'swing' });
    cy.wait(3000);

    // 4. Scroll back up to the top — extra slow, human
    cy.scrollTo('top', { duration: 20000, easing: 'swing' });
    cy.wait(3000);

    // 5. STAY at the top. Never scroll down again.
    cy.get(CYPRESS_PATH, { timeout: 20000 })
      .should('exist')
      .trigger('mouseover', { force: true })
      .trigger('mousemove', { force: true });

    cy.wait(2500);

    // 6. Click the Cypress Path selector — force = no auto-scroll
    cy.get(CYPRESS_PATH).click({ force: true });

    cy.wait(3000);

    // 7. Hover the course item with a long pause
    cy.contains('span', COURSE, { timeout: 20000 })
      .should('exist')
      .trigger('mouseover', { force: true })
      .trigger('mousemove', { force: true });

    cy.wait(2500);

    // 8. Click the course — force = no auto-scroll
    cy.contains('span', COURSE).click({ force: true });

    cy.wait(3500);
  });
});