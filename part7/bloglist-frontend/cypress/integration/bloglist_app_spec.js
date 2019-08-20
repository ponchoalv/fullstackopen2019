describe('BlogList ', function() {
  beforeEach(function() {
    cy.visit('http://localhost:3000')
  })

  it('Login page can be opened', function() {
    cy.visit('http://localhost:3000')
    cy.contains('Sign in')
  })

  it('user can login', function() {
    cy.get('#username').type('poncho')
    cy.get('#password').type('blueturtle15')
    cy.contains('Sign In').click()
    cy.contains('Ponchito Alvarez is logged in')
  })

  it('can create a blog entry', function() {
    cy.get('#username').type('poncho')
    cy.get('#password').type('blueturtle15')
    cy.contains('Sign In').click()
    cy.contains('Ponchito Alvarez is logged in')
    cy.contains('new blog').click()
    cy.contains('create new')
    cy.get('#title').type('Blog de prueba')
    cy.get('#author').type('poncho el escritor')
    cy.get('#url').type('http://escritor.com')
    cy.get('form > .MuiButtonBase-root > .MuiButton-label').click()

    cy.contains('Blog de prueba poncho el escritor')
  })
})
