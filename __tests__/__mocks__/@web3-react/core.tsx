import { getDefaultProvider } from "@ethersproject/providers"
import { Wallet } from "@ethersproject/wallet"
import { Chains } from "connectors"

const provider = getDefaultProvider("goerli")
const wallet = new Wallet(process.env.VITEST_PRIVATE_KEY)

const useWeb3React = () => ({
  active: true,
  chainId: Chains.GOERLI,
  account: process.env.VITEST_ADDRESS,
  library: {
    lookupAddress: provider.lookupAddress,
    getSigner: () => wallet,
  },
})

const UnsupportedChainIdError = require("@web3-react/core").UnsupportedChainIdError
const Web3ReactProvider = ({ children }) => <>{children}</>

export { useWeb3React, UnsupportedChainIdError, Web3ReactProvider }
