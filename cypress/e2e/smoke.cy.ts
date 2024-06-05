import { faker } from '@faker-js/faker'

Cypress.on('uncaught:exception', (err, runnable) => {
  return false
})

describe('smoke tests', () => {
  // afterEach(() => {
  //   cy.cleanupUser()
  // })

  it('should allow you to login', () => {
    const loginForm = {
      email: `${faker.internet.userName()}@example.com`,
      password: faker.internet.password(),
    }

    cy.then(() => ({ email: loginForm.email })).as('user')

    cy.visit('/skialper/login')
    cy.get('input[name="customerEmail"]').type(loginForm.email)
    cy.get('input[name="customerPassword"]').type(loginForm.password)
    // Get submit button and click it
    cy.get('#loginForm').find('button[type="submit"]').click()

    // cy.findByRole('link', { name: /sign up/i }).click()

    // cy.findByRole('textbox', { name: /email/i }).type(loginForm.email)
    // cy.findByLabelText(/password/i).type(loginForm.password)
    // cy.findByRole('button', { name: /create account/i }).click()

    // cy.findByRole('link', { name: /notes/i }).click()
    // cy.findByRole('button', { name: /logout/i }).click()
    // cy.findByRole('link', { name: /log in/i })
  })

  // it('should allow you to register', () => {
  //   const loginForm = {
  //     email: `${faker.internet.userName()}@example.com`,
  //     password: faker.internet.password(),
  //   }

  //   cy.then(() => ({ email: loginForm.email })).as('user')

  //   cy.visit('/skialper/join')
  // })

  // it('should allow you to make a note', () => {
  //   const testNote = {
  //     title: faker.lorem.words(1),
  //     body: faker.lorem.sentences(1),
  //   }
  //   cy.login()

  //   cy.visitAndCheck('/')

  //   cy.findByRole('link', { name: /notes/i }).click()
  //   cy.findByText('No notes yet')

  //   cy.findByRole('link', { name: /\+ new note/i }).click()

  //   cy.findByRole('textbox', { name: /title/i }).type(testNote.title)
  //   cy.findByRole('textbox', { name: /body/i }).type(testNote.body)
  //   cy.findByRole('button', { name: /save/i }).click()

  //   cy.findByRole('button', { name: /delete/i }).click()

  //   cy.findByText('No notes yet')
  // })
})
