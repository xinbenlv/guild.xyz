import { fireEvent, render, screen, waitFor } from "@testing-library/react"
import * as errorAlert from "../../../src/components/common/ErrorAlert"
import * as errorAnimation from "../../../src/components/common/ErrorAnimation"
import * as layout from "../../../src/components/common/Layout"
import CreatePage from "../../../src/pages/create-guild/telegram"
import ProvidersWrapper from "../../ProvidersWrapper"
import useIsTGBotInSpy from "../../spies/useIsTGBotIn.spy"

// Mocking these for render speed, as these are irrelevant for the tests
beforeEach(() => {
  vi.spyOn(layout, "default").mockImplementation(({ children }) => <>{children}</>)
  vi.spyOn(errorAnimation, "default").mockImplementation(({ children }) => (
    <>{children}</>
  ))
  vi.spyOn(errorAlert, "default").mockImplementation(() => null)
})

beforeEach(() => {
  render(<ProvidersWrapper Component={CreatePage} />)
})

describe("telegram create page", () => {
  it("can create guild", async () => {
    fireEvent.change(screen.getByTestId("tg-group-id-input"), {
      target: { value: process.env.VITEST_TG_GROUP_ID },
    })

    await waitFor(() => {
      expect(useIsTGBotInSpy).toHaveBeenCalledWith(process.env.VITEST_TG_GROUP_ID)
    })

    await waitFor(() => {
      expect(screen.getByText(/guild bot added/i)).toBeDefined()
      expect(screen.getByText(/free entry/i)).toBeDefined()
      fireEvent.click(screen.getByText(/free entry/i))
      expect(
        screen
          .getByText(/free entry/i)
          .parentElement.querySelector("[data-checked='']")
      ).toBeTruthy()
    })
  })
})
