import { readdir } from "fs/promises"
import fetch from "node-fetch"
import { join, resolve } from "path"
import { vi } from "vitest"
import * as discardAlert from "../../src/components/common/DiscardAlert"
import * as errorAlert from "../../src/components/common/ErrorAlert"
import * as errorAnimation from "../../src/components/common/ErrorAnimation"
import * as layout from "../../src/components/common/Layout"
import * as onboardingMarker from "../../src/components/common/OnboardingMarker"
import * as balancyCounter from "../../src/components/create-guild/Requirements/components/BalancyCounter"
import * as useGuildPermission from "../../src/components/[guild]/hooks/useGuildPermission"
import * as themContext from "../../src/components/[guild]/ThemeContext"
import * as useWarnIfUnsavedChanges from "../../src/hooks/useWarnIfUnsavedChanges"

if (!globalThis.defined) {
  globalThis.IS_REACT_ACT_ENVIRONMENT = true
  globalThis.fetch = fetch as any

  globalThis.CSS = {
    supports: () => false,
  } as any

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

  beforeEach(() => {
    vi.spyOn(themContext, "useThemeContext").mockImplementation(() => ({
      localThemeColor: "",
      setLocalThemeColor: vi.fn(),
      localThemeMode: "DARK",
      setLocalThemeMode: vi.fn(),
      localBackgroundImage: "",
      setLocalBackgroundImage: vi.fn(),
      textColor: "",
    }))
  })

  // Some commonly used components / hooks that are irrelevant for the tests
  beforeEach(() => {
    vi.spyOn(onboardingMarker, "default").mockImplementation(({ children }) => (
      <>{children}</>
    ))
    vi.spyOn(discardAlert, "default").mockImplementation(() => null)
    vi.spyOn(useWarnIfUnsavedChanges, "default").mockImplementation(() => {})
    vi.spyOn(useGuildPermission, "default").mockImplementation(() => ({
      isAdmin: true,
      isOwner: true,
    }))
    vi.spyOn(layout, "default").mockImplementation(({ children }) => <>{children}</>)
    vi.spyOn(errorAnimation, "default").mockImplementation(({ children }) => (
      <>{children}</>
    ))
    vi.spyOn(errorAlert, "default").mockImplementation(() => null)
    vi.spyOn(balancyCounter, "default").mockImplementation(() => null)

    vi.spyOn(themContext, "useThemeContext").mockImplementation(() => ({
      localThemeColor: "",
      setLocalThemeColor: vi.fn(),
      localThemeMode: "DARK",
      setLocalThemeMode: vi.fn(),
      localBackgroundImage: "",
      setLocalBackgroundImage: vi.fn(),
      textColor: "",
    }))
  })

  // Load global spies
  const spiesDir = resolve(join(__dirname, "..", "spies"))
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
