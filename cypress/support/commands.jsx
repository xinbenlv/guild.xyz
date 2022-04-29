// ***********************************************
// This example commands.js shows you how to
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

import * as nextRouter from "next/router"
import * as nextLink from "next/link"
import * as nextDistLink from "next/dist/client/link"

import * as web3React from "@web3-react/core"
import { getDefaultProvider } from "@ethersproject/providers"
import { Wallet } from "@ethersproject/wallet"

const provider = getDefaultProvider("goerli")
const wallet = Wallet.fromMnemonic(Cypress.env("MNEMONIC").replace(/,/g, ""))

/**
 * Should maybe be global, so we don't have to call it in every spec. We don't really
 * need the cases without wallet anyway.
 */

Cypress.Commands.add("connectWallet", () => {
  cy.get("body").then(($body) => {
    if ($body.find(".chakra-modal__content").length <= 0) {
      cy.findByText("Connect to a wallet").click()
    }
  })
  cy.findByText("MetaMask").click()
  cy.task("acceptMetamaskAccess")
})

Cypress.Commands.add("mockWallet", () => {
  cy.stub(web3React, "useWeb3React").returns({
    address: Cypress.env("address"),
    active: true,
    library: {
      lookupAddress: provider.lookupAddress,
      getSigner: () => wallet,
    },
    chainId: Cypress.env("chainId"),
  })
  cy.stub(web3React, "Web3ReactProvider").callsFake((props) => <div {...props} />)
})

Cypress.Commands.add("mockNext", (props) => {
  const router = {
    query: {},
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
    asPath: props?.path ?? "",
    pathname: props?.path ?? "",
    route: props?.path ?? "",
    ...props,
  }
  // cy.stub(nextRouter, "useRouter").returns(router)
  cy.stub(nextLink, "default").callsFake((props) => <div {...props} />)
  // cy.stub(nextDistLink, "default").callsFake((props) => <div {...props} />)
})
