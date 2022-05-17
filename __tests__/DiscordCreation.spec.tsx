import { fireEvent, render, screen, waitFor } from "@testing-library/react"
import React from "react"
import ServerSetupCard from "../src/components/guard/setup/ServerSetupCard/ServerSetupCard"
import expectedSubmitData from "./fixtures/discordCreateExpectedSubmitData.json"
import pinataUploadSpy from "./spies/pinataUpload.spy"
import { onSubmitSpy } from "./spies/useCreateGuild.spy"
import ProvidersWrapper from "./utils/ProvidersWrapper"

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

vi.mock("react-hook-form", async () => {
  const reactHookForm = await vi.importActual("react-hook-form")

  return {
    ...(reactHookForm as any),
    useFormContext: () => ({
      control: null,
      handleSubmit: (onValid) => () => onValid(formState),
      setValue: (...props) => {
        formState[props[0]] = props[1]
        setValueSpy(...props)
      },
    }),
    useWatch: () => "973501817566674984",
    useFormState: () => ({ touchedFields: {} }),
  }
})

// This is for watchedVideo
vi.mock("react", async () => {
  const react = await vi.importActual("react")
  return { ...(react as any), useState: () => [true, vi.fn()] }
})

beforeEach(() => {
  render(<ProvidersWrapper Component={ServerSetupCard} />)
})

it("should create Discord guild", async () => {
  fireEvent.click(screen.getByTestId("guild-creation-sign-button"))
  await waitFor(() => {
    expect(pinataUploadSpy).toHaveBeenCalled()
  })

  expect(setValueSpy).toHaveBeenCalledWith(
    "imageUrl",
    "https://guild-xyz.mypinata.cloud/ipfs/QmYimSys3TNXJ3RRpABUou6Gc48BnsdYBqR4e5E3fmS5xy"
  )

  await waitFor(() => {
    expect(onSubmitSpy).toHaveBeenCalledWith(expectedSubmitData)
  })
})
