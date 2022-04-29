/// <reference types="cypress" />

import { mount } from "@cypress/react"
import IndexPage from "../../src/pages/index"
import App from "../../src/pages/_app"
import { RouterContext } from "next/dist/shared/lib/router-context"

it("Renders the index page", () => {
  cy.mockNext()

  mount(
    <RouterContext.Provider>
      <App Component={IndexPage} pageProps={{}} />
    </RouterContext.Provider>
  )

  cy.get("h1").should("contain.text", "Guild")
})
