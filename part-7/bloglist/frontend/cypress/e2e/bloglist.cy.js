describe('Bloglist', function () {
  beforeEach(function () {
    cy.request('POST', `${Cypress.env('apiUrl')}/e2e/reset`);
    const user = { name: 'Mr. Root Boi', username: 'root', password: 'sekret' };
    cy.request('POST', `${Cypress.env('apiUrl')}/users`, user);
    cy.visit('');
  });

  it('Login form is shown', function () {
    cy.contains('Login to application');
  });

  describe('Login', function () {
    it('succeeds with correct credentials', function () {
      cy.get('input[name="username"]').type('root');
      cy.get('input[name="password"]').type('sekret');
      cy.get('input[type="submit"]').click();
      cy.contains('Login').click();
      cy.contains('Logged in as Mr. Root Boi');
    });

    it('fails with invalid credentials', function () {
      cy.get('input[name="username"]').type('root');
      cy.get('input[name="password"]').type('wrong-password');
      cy.get('input[type="submit"]').click();
      cy.contains('Login').click();
      cy.contains('Invalid username or password.');
      cy.get('html').should('not.contain', 'Logged in as Mr. Root Boi');
    });
  });

  describe('When logged in', function () {
    beforeEach(function () {
      cy.login({ username: 'root', password: 'sekret' });
    });

    it('A blog can be created', function () {
      cy.contains('New blog').click();
      cy.get('input[name="title"]').type('How to kill enemies');
      cy.get('input[name="author"]').type('John Rambo');
      cy.get('input[name="url"]').type('https://john-rambo.com');
      cy.get('input[type="submit"]').click();
      cy.contains('A new blog "How to kill enemies" added!');
      cy.contains('- How to kill enemies');
    });

    it('A blog can be liked', function () {
      cy.createBlog({
        title: 'How to kill enemies',
        author: 'John Rambo',
        url: 'https://john-rambo.com',
      });
      cy.contains('- How to kill enemies').parent().find('button').click();
      cy.contains('Likes: 0');
      cy.contains('Like').click();
      cy.contains('Likes: 1');
    });

    it('A blog can be deleted by the owner', function () {
      cy.createBlog({
        title: 'How to kill enemies',
        author: 'John Rambo',
        url: 'https://john-rambo.com',
      });
      cy.contains('- How to kill enemies').parent().find('button').click();
      cy.contains('Delete').click();
      cy.wait(1000);
      cy.get('html').should('not.contain', '- How to kill enemies');
    });

    it('A blog delete action cannot be seen by the other user', function () {
      cy.createBlog({
        title: 'How to kill enemies',
        author: 'John Rambo',
        url: 'https://john-rambo.com',
      });
      const user = {
        name: 'Random User',
        username: 'random',
        password: 'sekret',
      };
      cy.request('POST', `${Cypress.env('apiUrl')}/users`, user);
      cy.login({ username: 'random', password: 'sekret' });
      cy.contains('Logged in as Random User');
      cy.contains('- How to kill enemies').parent().find('button').click();
      cy.contains('- How to kill enemies')
        .parent()
        .next()
        .should('not.contain', 'Delete');
    });

    it('A blog with most likes should be rendered on top', function () {
      cy.createBlog({
        title: 'A blog with 7 likes',
        author: 'John Rambo',
        url: 'https://john-rambo.com',
        likes: 7,
      });
      cy.createBlog({
        title: 'A blog with 10 likes',
        author: 'John Rambo',
        url: 'https://john-rambo.com',
        likes: 10,
      });
      cy.createBlog({
        title: 'A blog with 8 likes',
        author: 'John Rambo',
        url: 'https://john-rambo.com',
        likes: 8,
      });
      cy.get('.blog').eq(0).should('contain', 'A blog with 10 likes');
      cy.get('.blog').eq(1).should('contain', 'A blog with 8 likes');
      cy.get('.blog').eq(2).should('contain', 'A blog with 7 likes');
      cy.get('.blog').eq(1).find('button').click();
      cy.get('.blog').eq(2).get('ul > li').eq(2).find('button').click();
      cy.wait(1000);
      cy.get('.blog').eq(2).get('ul > li').eq(2).find('button').click();
      cy.wait(1000);
      cy.get('.blog').eq(2).get('ul > li').eq(2).find('button').click();
      cy.wait(1000);
      cy.get('.blog').eq(0).should('contain', 'A blog with 8 likes');
      cy.get('.blog').eq(1).should('contain', 'A blog with 10 likes');
      cy.get('.blog').eq(2).should('contain', 'A blog with 7 likes');
    });
  });
});
