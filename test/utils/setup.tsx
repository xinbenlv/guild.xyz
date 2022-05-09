const setup = () => {
  beforeAll(() => {
    globalThis.IS_REACT_ACT_ENVIRONMENT = true

    /* vi.mock("next/link", () => ({ default: ({ children }) => <>{children}</> }))
    vi.mock("next/dist/client/link", () => ({
      default: ({ children }) => <>{children}</>,
    })) */

    /* vi.mock("@web3-react/core", () => ({
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
    })) */
  })

  beforeEach(() => {
    Object.defineProperty(window, "matchMedia", {
      writable: true,
      value: vi.fn().mockImplementation((query) => ({
        matches: false,
        media: query,
        onchange: null,
        addListener: vi.fn(),
        removeListener: vi.fn(),
        addEventListener: vi.fn(),
        removeEventListener: vi.fn(),
        dispatchEvent: vi.fn(),
      })),
    })
  })
}

export default setup
