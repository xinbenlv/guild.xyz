import { mount } from "@cypress/react"
import CreatePage from "../../src/pages/create-guild"
import App from "../../src/pages/_app"
import { RouterContext } from "next/dist/shared/lib/router-context"

it("Renders create page", () => {
  cy.mockNext()
  cy.mockWallet({
    path: "/create-guild",
  })

  const router = {
    pathname: "/testPath",
    route: "/testPath",
    query: {},
    asPath: "/testPath",
    components: {},
    isFallback: false,
    basePath: "",
    events: { emit: cy.spy(), off: cy.spy(), on: cy.spy() },
    push: cy.spy(),
    replace: cy.spy(),
    reload: cy.spy(),
    back: cy.spy(),
    prefetch: cy.spy(),
    beforePopState: cy.spy(),
  }

  mount(
    <RouterContext.Provider value={router}>
      <App Component={CreatePage} pageProps={{}} />
    </RouterContext.Provider>
  )

  cy.wait(5000)
  cy.get("h1").should("contain.text", "Create Guild")
})
