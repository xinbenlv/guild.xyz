import { mount } from "@cypress/react"
import CreatePage from "../../src/pages/create-guild"
import App from "../../src/pages/_app"

it("Renders create page", () => {
  cy.mockNext()
  cy.mockWallet()

  mount(<App Component={CreatePage} pageProps={{}} />)

  cy.wait(5000)
  cy.get("h1").should("contain.text", "Create Guild")
})
