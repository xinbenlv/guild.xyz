import { fireEvent, render, screen, waitFor } from "@testing-library/react"
import React from "react"
import EditGuildButton from "../../../src/components/[guild]/EditGuildButton/EditGuildButton"
import * as themContext from "../../../src/components/[guild]/ThemeContext"
import ProvidersWrapper from "../../ProvidersWrapper"

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

beforeEach(() => {
  render(<ProvidersWrapper Component={EditGuildButton} />)
})

describe("Guild page", () => {
  it("can open drawer", async () => {
    fireEvent.click(screen.getByRole("button"))

    await waitFor(() => {
      expect(screen.getByText(/Edit guild/i)).toBeDefined()
    })
  })

  it.todo("an edit guild")
})
