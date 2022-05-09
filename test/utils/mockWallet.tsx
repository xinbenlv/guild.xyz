import { getDefaultProvider } from "@ethersproject/providers"
import { Wallet } from "@ethersproject/wallet"
import { Chains } from "connectors"

const provider = getDefaultProvider("goerli")
const wallet = new Wallet(process.env.VITEST_PRIVATE_KEY)

const mockWallet = () => {
  vi.mock("@web3-react/core", () => ({
    useWeb3React: () => ({
      active: true,
      chainId: Chains.GOERLI,
      account: process.env.VITEST_ADDRESS,
      library: {
        lookupAddress: provider.lookupAddress,
        getSigner: () => wallet,
      },
    }),
    UnsupportedChainIdError: require("@web3-react/core").UnsupportedChainIdError,
    Web3ReactProvider: ({ children }) => <>{children}</>,
  }))
}

export default mockWallet
