import { fireEvent, render, screen, waitFor } from "@testing-library/react"
import ServerSetupCard from "../../src/components/guard/setup/ServerSetupCard/ServerSetupCard"
import pinataUploadSpy from "../spies/pinataUpload.spy"
import { onSubmitSpy } from "../spies/useCreateGuild.spy"
import ProvidersWrapper from "../utils/ProvidersWrapper"

const setValueSpy = vi.fn()

const formState = {
  imageUrl: "/guildLogos/0.svg",
  platform: "DISCORD",
  DISCORD: {
    platformId: "973501817566674984",
  },
  requirements: [
    {
      type: "FREE",
    },
  ],
}

vi.mock("react-hook-form", () => ({
  ...require("react-hook-form"),
  useFormContext: () => ({
    control: null,
    handleSubmit: (onValid) => onValid(formState),
    setValue: (...props) => {
      formState[props[0]] = props[1]
      setValueSpy(...props)
    },
  }),
  useWatch: () => "973501817566674984",
  useFormState: () => ({ touchedFields: {} }),
}))

beforeEach(() => {
  render(<ProvidersWrapper Component={ServerSetupCard} />)
})

describe("ServerSetupCard", () => {
  it("renders", () => {
    expect(screen.getByText(/wallet connected/i)).toBeDefined()
    expect(screen.getByTestId("guild-creation-sign-button")).toBeDefined()
  })

  it("handles sign click", async () => {
    fireEvent.click(screen.getByTestId("guild-creation-sign-button"))
    await waitFor(() => {
      expect(pinataUploadSpy).toHaveBeenCalled()
    })

    expect(setValueSpy).toHaveBeenCalledWith(
      "imageUrl",
      "https://guild-xyz.mypinata.cloud/ipfs/QmYimSys3TNXJ3RRpABUou6Gc48BnsdYBqR4e5E3fmS5xy"
    )

    await waitFor(() => {
      expect(onSubmitSpy).toHaveBeenCalledWith({
        imageUrl:
          "https://guild-xyz.mypinata.cloud/ipfs/QmYimSys3TNXJ3RRpABUou6Gc48BnsdYBqR4e5E3fmS5xy",
        platform: "DISCORD",
        DISCORD: { platformId: "973501817566674984" },
        requirements: [{ type: "FREE" }],
        name: "Vitest Gang",
      })
    })
  })
})
