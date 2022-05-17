import { fireEvent, render, screen, waitFor } from "@testing-library/react"
import React from "react"
import EditGuildButton from "../src/components/[guild]/EditGuildButton/EditGuildButton"
import * as themContext from "../src/components/[guild]/ThemeContext"
import guildData from "./fixtures/guildData.json"
import { onSubmitSpy } from "./spies/useEditGuild.spy"
import ProvidersWrapper from "./utils/ProvidersWrapper"

// TODO: Optimization: Mock the components that are unused in the given test
// TODO: Implement with describe.concurrent()

const setValueSpy = vi.fn()

// This only spies on setValue, so we can check if the callback ran
vi.mock("react-hook-form", async () => {
  const reactHookForm = await vi.importActual("react-hook-form")

  return {
    ...(reactHookForm as any),
    useForm: () => {
      const {
        name,
        imageUrl,
        description,
        theme,
        showMembers,
        admins,
        urlName,
        hideFromExplorer,
        platforms,
      } = guildData

      const defaultValues = {
        name,
        imageUrl,
        description,
        theme: theme ?? {},
        showMembers,
        admins:
          admins?.flatMap((admin) => (admin.isOwner ? [] : admin.address)) ?? [],
        urlName,
        isGuarded: platforms?.[0]?.isGuarded,
        hideFromExplorer,
      }

      const actual = (reactHookForm as any).useForm({
        mode: "all",
        defaultValues,
      })

      return {
        ...(actual as any),
        setValue: (key, value) => {
          // console.log([key, value])
          setValueSpy(key, value)
          return actual.setValue(key, value)
        },
      }
    },
  }
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

beforeEach(() => {
  render(<ProvidersWrapper Component={EditGuildButton} />)
})

it("should edit guild", async () => {
  fireEvent.click(screen.getByRole("button"))

  await waitFor(() => {
    expect(screen.getByText(/Edit guild/i)).toBeDefined()
  })

  fireEvent.change(screen.getByTestId("description-textarea"), {
    target: { value: "Edited" },
  })

  fireEvent.change(screen.getByTestId("edit-urlname-input"), {
    target: { value: "edited urlname" },
  })
  fireEvent.blur(screen.getByTestId("edit-urlname-input"))

  fireEvent.change(screen.getByTestId("edit-name-input"), {
    target: { value: "Edited Name" },
  })

  fireEvent.click(screen.getByText("Save"))

  await waitFor(() => {
    expect(onSubmitSpy).toHaveBeenCalledWith({
      description: "Edited",
      urlName: "edited-urlname",
      name: "Edited Name",
    })
  })
})
