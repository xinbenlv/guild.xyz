import { fireEvent, render, waitFor } from "@testing-library/react"
import CreatePage from "../src/pages/create-guild/telegram"
import useIsTGBotInSpy from "./spies/useIsTGBotIn.spy"
import ProvidersWrapper from "./utils/ProvidersWrapper"

beforeAll(() => {})

describe("telegram create page", () => {
  const { getByText, getByTestId, debug } = render(
    <ProvidersWrapper Component={CreatePage} />
  )

  it("renders", () => {
    expect(getByText(/create guild on telegram/i)).toBeDefined()
    expect(getByText(/0x[a-f0-9\.]+/i)).toBeDefined()
  })

  it("can create guild", async () => {
    const input = getByTestId("tg-group-id-input") as HTMLInputElement

    fireEvent.change(input, {
      target: { value: process.env.VITEST_TG_GROUP_ID },
    })
    fireEvent.blur(input)
    expect(input.value).toBe(process.env.VITEST_TG_GROUP_ID)

    await waitFor(() => {
      expect(useIsTGBotInSpy).toHaveBeenCalledWith(process.env.VITEST_TG_GROUP_ID)
    })

    debug(document, Number.MAX_SAFE_INTEGER)
    await waitFor(() => {
      expect(getByText(/guild bot added/i)).toBeDefined()
    })
  })
})
