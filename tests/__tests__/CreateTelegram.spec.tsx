import { fireEvent, render, screen, waitFor } from "@testing-library/react"
import CreatePage from "../../src/pages/create-guild/telegram"
import ProvidersWrapper from "../ProvidersWrapper"
import useIsTGBotInSpy from "../spies/useIsTGBotIn.spy"

beforeEach(() => {
  render(<ProvidersWrapper Component={CreatePage} />)
})

describe("telegram create page", () => {
  it("renders", () => {
    expect(screen.getByText(/create guild on telegram/i)).toBeDefined()
    expect(screen.getByText(/0x[a-f0-9\.]+/i)).toBeDefined()
  })

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
