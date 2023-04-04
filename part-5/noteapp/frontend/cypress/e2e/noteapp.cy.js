describe('Noteapp', function () {
  beforeEach(function () {
    cy.request('POST', `${Cypress.env('apiUrl')}/e2e/reset`);
    const user = {
      name: 'Mr. Root Boi',
      username: 'root',
      password: 'sekret'
    };
    cy.request('POST', `${Cypress.env('apiUrl')}/users`, user);
    cy.visit(''); // Visits the `baseUrl` defined in `cypress.config.js`
  });

  it('front page can be opened', function () {
    cy.contains('Notes');
    cy.contains('Note app, Department of Computer Science, University of Helsinki 2022');
  });

  it('login form can be opened', function () {
    cy.contains('login').click();
  });

  it('user can login', function () {
    cy.contains('login').click();
    cy.get('input[name="username"]').type('root');
    cy.get('input[name="password"]').type('sekret');
    cy.get('input[type="submit"]').click();
    cy.contains('Mr. Root Boi logged in');
  });

  it('login fails with wrong password', function () {
    cy.contains('login').click();
    cy.get('input[name="username"]').type('root');
    cy.get('input[name="password"]').type('wrong-password');
    cy.get('input[type="submit"]').click();
    // Alternative: cy.get('.error').should('contain, 'Failed to login');
    cy.get('.error').contains('Failed to login');
    // Alternative: cy.contains('Mr. Root Boi logged in').should('not.exist');
    cy.get('html').should('not.contain', 'Mr. Root Boi logged in');
  });

  describe('when logged in', function () {
    beforeEach(function() {
      cy.login({ username: 'root', password: 'sekret' });
    });

    it('a new note can be created', function () {
      cy.contains('New note').click();
      const timeNow = Date.now();
      cy.get('input[type="text"]').type(`Some note created by cypress (${timeNow})`);
      cy.contains('Save').click();
      cy.contains(`Some note created by cypress (${timeNow})`);
    });

    describe('and several notes exist', function () {
      beforeEach(function() {
        cy.createNote({ content: 'First note', important: false });
        cy.createNote({ content: 'Second note', important: false });
        cy.createNote({ content: 'Third note', important: false });
      });

      it('one of those can be made important', function () {
        cy.contains('Second note').contains('make important').click();
        cy.contains('Second note').contains('make not important');
        // Just an example on how to find elements in a different way
        // cy.contains('second note').parent().find('button').as('theButton');
        // cy.get('@theButton').click();
        // cy.get('@theButton').should('contain', 'make not important');
      });
    });
  });
});
