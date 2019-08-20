describe('BlogList ', function() {
  beforeEach(function() {
    cy.request('POST', 'http://localhost:3001/api/testing/reset')

    const user = {
      name: 'Ponchito Alvarez',
      username: 'poncho',
      password: 'blueturtle15'
    }

    cy.request('POST', 'http://localhost:3001/api/users/', user)
    cy.visit('http://localhost:3000')
  })

  describe('when logged in', function() {
    beforeEach(function() {
      cy.get('#username').type('poncho')
      cy.get('#password').type('blueturtle15')
      cy.contains('Sign In').click()
    })

    it('name of user is shown', function() {
      cy.contains('Ponchito Alvarez is logged in')
    })

    it('user get display on users page', function(){
      cy.get('[href="/users"]').click()
      cy.contains('Ponchito Alvarez')
    })

    describe('when a blog entry is created', function() {
      beforeEach(function() {
        cy.contains('new blog').click()
        cy.contains('create new')
        cy.get('#title').type('Blog de prueba')
        cy.get('#author').type('poncho el escritor')
        cy.get('#url').type('http://escritor.com')
        cy.get('form > .MuiButtonBase-root > .MuiButton-label').click()
      })

      it('the created blog appears on the blog list', function() {
        cy.contains('Blog de prueba poncho el escritor')
      })

      it('likes counter gets incremented', function() {
        cy.contains('Blog de prueba poncho el escritor').click()
        cy.contains('0 likes')
        cy.get('[aria-label="like"]').click()
        cy.contains('1 likes')
      })

      it('comments get posted', function() {
        cy.contains('Blog de prueba poncho el escritor').click()
        cy.get('#message').type('this is a new comment, what a great book!!')
        cy.contains('add comment').click()

        cy.contains('this is a new comment, what a great book!!')
      })

      it('blog get listed on users blogs', function() {
        cy.get('[href="/users"]').click()
        cy.get('.MuiTableRow-root > :nth-child(1) > .MuiTypography-root').click()
        cy.contains('Blog de prueba')

      })
    })
  })
})
