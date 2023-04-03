describe('Noteapp', function () {
  it('front page can be opened', function () {
    cy.visit('http://localhost:3000');
    cy.contains('Notes');
    cy.contains('Note app, Department of Computer Science, University of Helsinki 2022');
  });

  it('login form can be opened', function () {
    cy.visit('http://localhost:3000');
    cy.contains('login').click();
  });

  it('user can login', function () {
    cy.visit('http://localhost:3000');
    cy.contains('login').click();
    cy.get('input[name="username"]').type('root');
    cy.get('input[name="password"]').type('sekret');
    cy.get('input[type="submit"]').click();
    cy.contains('Mr. Root Boi logged in');
  });

  describe('when logged in', function () {
    beforeEach(function() {
      cy.visit('http://localhost:3000');
      cy.contains('login').click();
      cy.get('input[name="username"]').type('root');
      cy.get('input[name="password"]').type('sekret');
      cy.get('input[type="submit"]').click();
    });

    it('a new note can be created', function () {
      const timeNow = Date.now();
      cy.contains('New note').click();
      cy.get('input[type="text"]').type(`A note created by cypress (${timeNow})`);
      cy.contains('Save').click();
      cy.contains(`A note created by cypress (${timeNow})`);
    });
  });
});
