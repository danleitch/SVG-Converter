it('AND: should download the svg and png images', () => {
    cy.get('[data-cy="example"]').click()
    cy.get('[data-cy="example"]').should('be.visible')
    // SVG
    cy.readFile('cypress/downloads/image.svg').should('not.exist')
    cy.get('[data-cy="download-buton-svg"]').click()
    cy.readFile('cypress/downloads/image.svg').should('exist')
    // PNG
    cy.readFile('cypress/downloads/image.png').should('not.exist')
    cy.get('[data-cy="download-buton-png"]').click()
    cy.readFile('cypress/downloads/image.png').should('exist')
    // Delete download folder
    cy.task('deleteFolder', Cypress.config('downloadsFolder'))
  })