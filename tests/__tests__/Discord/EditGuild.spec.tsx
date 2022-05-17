import { fireEvent, render, screen, waitFor } from "@testing-library/react"
import React from "react"
import * as discardAlert from "../../../src/components/common/DiscardAlert"
import * as onboardingMarker from "../../../src/components/common/OnboardingMarker"
import EditGuildButton from "../../../src/components/[guild]/EditGuildButton/EditGuildButton"
import * as useGuildPermission from "../../../src/components/[guild]/hooks/useGuildPermission"
import * as themContext from "../../../src/components/[guild]/ThemeContext"
import * as useWarnIfUnsavedChanges from "../../../src/hooks/useWarnIfUnsavedChanges"
import guildData from "../../fixtures/guildData.json"
import ProvidersWrapper from "../../ProvidersWrapper"
import {
  onSubmitDescriptionSpy,
  onSubmitNameSpy,
  onSubmitUrlNameSpy,
} from "../../spies/useEditGuild.spy"

// TODO: Optimization: Mock the components that are unused in the given test
// For example: Mock every input but Description for the case testing the description edit

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
  vi.spyOn(onboardingMarker, "default").mockImplementation(({ children }) => (
    <>{children}</>
  ))
  vi.spyOn(discardAlert, "default").mockImplementation(() => null)
  vi.spyOn(useWarnIfUnsavedChanges, "default").mockImplementation(() => {})
  vi.spyOn(useGuildPermission, "default").mockImplementation(() => ({
    isAdmin: true,
    isOwner: true,
  }))

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

beforeEach(async () => {
  fireEvent.click(screen.getByRole("button"))

  await waitFor(() => {
    expect(screen.getByText(/Edit guild/i)).toBeDefined()
  })
})

describe("Guild page", () => {
  it("should edit description", async () => {
    fireEvent.change(screen.getByTestId("description-textarea"), {
      target: { value: "Edited" },
    })
    fireEvent.click(screen.getByText("Save"))

    await waitFor(() => {
      expect(onSubmitDescriptionSpy).toHaveBeenCalledWith("Edited")
    })
  })

  it("should edit urlName", async () => {
    fireEvent.change(screen.getByTestId("edit-urlname-input"), {
      target: { value: "edited urlname" },
    })
    fireEvent.blur(screen.getByTestId("edit-urlname-input"))
    fireEvent.click(screen.getByText("Save"))

    await waitFor(() => {
      expect(onSubmitUrlNameSpy).toHaveBeenCalledWith("edited-urlname")
    })
  })

  it("should edit name", async () => {
    fireEvent.change(screen.getByTestId("edit-name-input"), {
      target: { value: "Edited Name" },
    })
    fireEvent.click(screen.getByText("Save"))

    await waitFor(() => {
      expect(onSubmitNameSpy).toHaveBeenCalledWith("Edited Name")
    })
  })
})
