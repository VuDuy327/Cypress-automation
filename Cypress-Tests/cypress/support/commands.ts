/// <reference types="cypress" />
// ***********************************************
// This example commands.ts shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })
//
// declare global {
//   namespace Cypress {
//     interface Chainable {
//       login(email: string, password: string): Chainable<void>
//       drag(subject: string, options?: Partial<TypeOptions>): Chainable<Element>
//       dismiss(subject: string, options?: Partial<TypeOptions>): Chainable<Element>
//       visit(originalFn: CommandOriginalFn, url: string, options: Partial<VisitOptions>): Chainable<Element>
//     }
//   }
// }
declare namespace Cypress {
  interface Chainable<Subject = any> {
    slowDownCommand(time: number): Cypress.Chainable<Subject>;
  }
}

//Nice to have for debugging, slowing down speed of commands
Cypress.Commands.add("slowDownCommand", (time: number) => {
  for (const commandName of [
    "click",
    "trigger",
    "type",
    "clear",
    "request",
  ] as const) {
    // we add 1s delays for a few commands
    const commandWithDelay = ((
      command: (...args: unknown[]) => unknown,
      ...args: unknown[]
    ) =>
      new Promise((resolve) => {
        setTimeout(() => resolve(command(...args)), time);
      })) as any as Cypress.CommandFnWithOriginalFn<typeof commandName>;

    Cypress.Commands.overwrite(commandName, commandWithDelay);
  }
});
