/// <reference types="cypress" />

import { mount } from "@cypress/react"
import IndexPage from "../../src/pages/index"
import App from "../../src/pages/_app"

it("Renders the index page", () => {
  cy.mockNext()

  mount(<App Component={IndexPage} pageProps={{}} />)

  cy.get("h1").should("contain.text", "Guild")
})
