import { fireEvent, render, screen, waitFor } from "@testing-library/react"
import getRandomInt from "utils/getRandomInt"
import * as errorAlert from "../src/components/common/ErrorAlert"
import * as errorAnimation from "../src/components/common/ErrorAnimation"
import * as layout from "../src/components/common/Layout"
import * as balancyCounter from "../src/components/create-guild/Requirements/components/BalancyCounter"
import CreatePage from "../src/pages/create-guild/telegram"
import expectedSubmitData from "./fixtures/telegramCreationExpectedSubmitData.json"
import { onSubmitSpy } from "./spies/useCreateGuild.spy"
import useIsTGBotInSpy from "./spies/useIsTGBotIn.spy"
import ProvidersWrapper from "./utils/ProvidersWrapper"

const setValueSpy = vi.fn()

// This only spies on setValue, so we can check if the callback ran
vi.mock("react-hook-form", async () => {
  const reactHookForm = await vi.importActual("react-hook-form")

  return {
    ...(reactHookForm as any),
    useForm: () => {
      const actual = (reactHookForm as any).useForm({
        mode: "all",
        defaultValues: {
          name: "My guild",
          imageUrl: `/guildLogos/${getRandomInt(286)}.svg`,
          platform: "TELEGRAM",
        },
      })

      return {
        ...(actual as any),
        setValue: (key, value) => {
          setValueSpy(key, value)
          return actual.setValue(key, value)
        },
      }
    },
  }
})

// Mocking these for render speed, as these are irrelevant for the tests
// Also helps to debug, as the DOM won't be spammed
beforeEach(() => {
  vi.spyOn(layout, "default").mockImplementation(({ children }) => <>{children}</>)
  vi.spyOn(errorAnimation, "default").mockImplementation(({ children }) => (
    <>{children}</>
  ))
  vi.spyOn(errorAlert, "default").mockImplementation(() => null)
  vi.spyOn(balancyCounter, "default").mockImplementation(() => null)
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
    })

    fireEvent.click(screen.getByText(/free entry/i))

    await waitFor(() => {
      expect(setValueSpy).toHaveBeenCalledWith("name", "Vitest Gang")
    })

    await waitFor(() => {
      expect(setValueSpy).toHaveBeenCalledWith(
        "imageUrl",
        "https://guild-xyz.mypinata.cloud/ipfs/QmYimSys3TNXJ3RRpABUou6Gc48BnsdYBqR4e5E3fmS5xy"
      )
    })

    fireEvent.click(screen.getByText(/summon/i))

    await waitFor(() => {
      expect(onSubmitSpy).toHaveBeenCalledWith(expectedSubmitData)
    })
  })
})
