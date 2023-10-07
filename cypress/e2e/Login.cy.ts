context('Login screen', () => {
  it('should click login, and check for "JokeApp"', () => {
    cy.visit('http://localhost:3000/login');
    cy.contains('LOGIN').should('be.visible').click();
    cy.contains('JokeApp').should('be.visible');
  });

  it('should try to go back  to login', () => {
    cy.visit('http://localhost:3000/login');
    cy.contains('LOGIN').should('be.visible').click();
    cy.contains('JokeApp').should('be.visible');
  });

  it('should logout and try to go back app', () => {
    cy.visit('http://localhost:3000/login');
    cy.contains('LOGIN').should('be.visible').click();
    cy.contains('Logout').should('be.visible').click({ force: true });
    cy.contains('LOGIN').should('be.visible');
    cy.visit('http://localhost:3000/jokes');
    cy.contains(
      'Unauthorised! You need to be logged in to access this page.'
    ).should('be.visible');
  });
});
