context('Jokes screen', () => {
  beforeEach(() => {
    cy.visit('http://localhost:3000/login');
    cy.contains('LOGIN').should('be.visible').click();
  });
  function assertBackgroundColorForTheme(theme: string) {
    if (theme === 'light') {
      cy.get('[data-cy="app-header"]').should(
        'have.css',
        'background-color',
        'rgb(31, 41, 55)'
      );
    } else {
      cy.get('[data-cy="app-header"]').should(
        'have.css',
        'background-color',
        'rgb(209, 213, 219)'
      );
    }
  }
  it('should toggle the theme', () => {
    cy.get('[data-cy="theme-toggle"]').as('toggleButton');
    cy.get('@toggleButton').then(($button) => {
      assertBackgroundColorForTheme($button.text());
    });

    cy.get('@toggleButton').click();
    cy.get('@toggleButton').then(($button) => {
      assertBackgroundColorForTheme($button.text());
    });
  });

  it('should change the limit', () => {
    cy.get('[data-cy="joke-title"]').should('have.length', 10);
    cy.get('[data-cy="select"]').select('5');
    cy.get('[data-cy="joke-title"]').should('have.length', 5);
  });

  it('should go to next page if it exists and then back', () => {
    cy.get('[data-cy="prev-page"]').should('have.attr', 'disabled');

    cy.get('[data-cy="next-page"]').then(($button) => {
      if (!$button.is(':disabled')) {
        cy.get('[data-cy="next-page"]').click();
        cy.get('[data-cy="prev-page"]').click();
        cy.get('[data-cy="prev-page"]').should('have.attr', 'disabled');
      }
    });
  });

  it('should update a joke', () => {
    cy.get('[data-cy="joke-title"]').first().click();
    cy.contains('Go back').should('be.visible');
    cy.contains('Delete').should('be.visible');

    cy.get('input[id="title"]').clear().type('Updated Joke');
    cy.get('input[id="author"]').clear().type('Updated@author.com');
    cy.get('input[id="createdAt"]').clear().type('2023-10-10');
    cy.get('input[id="views"]').clear().type('67');
    cy.get('button').contains('Submit').click();
    cy.contains('Joke updated successfully').should('be.visible');
  });

  it('should delete a joke', () => {
    cy.get('[data-cy="joke-title"]').first().click();
    cy.contains('Go back').should('be.visible');
    cy.contains('Delete')
      .should('be.visible')
      .should('not.have.attr', 'disabled');
    cy.get('button').contains('Delete').click();
    cy.contains('Joke deleted successfully').should('be.visible');
  });

  it('should create a joke', () => {
    cy.get('button').contains('Add new joke').click();
    cy.get('input[id="title"]').clear().type('new joke');
    cy.get('input[id="author"]').clear().type('new@author.com');
    cy.get('input[id="createdAt"]').clear().type('2023-10-10');
    cy.get('input[id="views"]').clear().type('0');
    cy.get('button').contains('Submit').click();
    cy.contains('Joke created successfully').should('be.visible');
  });
});
