// Cypress support file

Cypress.Commands.add('humanPause', (ms = 1500) => {
  cy.wait(ms);
});

// Extremely slow scroll of the element into view.
Cypress.Commands.add('glacialScrollTo', { prevSubject: true }, (subject, duration = 8000) => {
  cy.wrap(subject)
    .scrollIntoView({ duration, easing: 'swing', offset: { top: -150, left: 0 } })
    .should('be.visible')
    .wait(1500);
});

Cypress.Commands.add('slowClick', { prevSubject: true }, (subject) => {
  cy.wrap(subject)
    .should('be.visible')
    .trigger('mouseover', { force: true })
    .trigger('mousemove', { force: true })
    .wait(1500)
    .click({ force: true })
    .wait(800);
});