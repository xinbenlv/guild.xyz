import { readdir } from "fs/promises"
import path from "path"

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

  const spiesDir = path.resolve(path.join(__dirname, "..", "spies"))

  readdir(spiesDir).then((files) =>
    Promise.all(files.map((file) => import(path.join(spiesDir, file))))
  )

  globalThis.defined = true
}

export {}
