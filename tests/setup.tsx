import { readdir } from "fs/promises"
import fetch from "node-fetch"
import { join, resolve } from "path"
import { vi } from "vitest"

if (!globalThis.defined) {
  globalThis.IS_REACT_ACT_ENVIRONMENT = true
  globalThis.fetch = fetch as any

  vi.mock("@web3-react/core")
  vi.mock("next/link")
  vi.mock("next/dist/client/link")

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

  // Load global spies
  const spiesDir = resolve(join(__dirname, "spies"))
  readdir(spiesDir).then((files) =>
    Promise.all(
      files
        .filter((file) => file.includes(".spy."))
        .map((file) => import(join(spiesDir, file)))
    )
  )

  globalThis.defined = true
}

export {}
