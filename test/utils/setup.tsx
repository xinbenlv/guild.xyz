import * as mocks from "../spies"

if (!globalThis.defined) {
  globalThis.IS_REACT_ACT_ENVIRONMENT = true

  vi.mock("@web3-react/core")

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

  beforeEach(() => {
    Object.values(mocks).forEach((mock) => mock())
  })

  globalThis.defined = true
}

export {}
