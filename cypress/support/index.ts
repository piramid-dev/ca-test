// eslint-disable-next-line @typescript-eslint/no-unused-vars
declare namespace Cypress {
  interface Chainable {
    /**
     * Custom command to select DOM element by data-cy attribute.
     * @example cy.dataCy('greeting')
     */
    cleanupUser(): any
    visitAndCheck(url: string): any
    login(): any
  }
}
