import { fireEvent, render, screen, waitFor } from "@testing-library/react"
import React from "react"
import * as discardAlert from "../src/components/common/DiscardAlert"
import * as onboardingMarker from "../src/components/common/OnboardingMarker"
import * as useGuildPermission from "../src/components/[guild]/hooks/useGuildPermission"
import EditRole from "../src/components/[guild]/RolesByPlatform/components/RoleListItem/components/EditRole/EditRole"
import * as useWarnIfUnsavedChanges from "../src/hooks/useWarnIfUnsavedChanges"
import guildData from "./fixtures/guildData.json"
import { onSubmitSpy } from "./spies/useEditRole.spy"
import ProvidersWrapper from "./utils/ProvidersWrapper"

// TODO: Optimization: Mock the components that are unused in the given test

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
})

beforeEach(() => {
  const [roleData] = guildData.roles
  render(<ProvidersWrapper Component={EditRole} pageProps={{ roleData }} />)
})

beforeEach(async () => {
  fireEvent.click(screen.getByRole("button"))

  await waitFor(() => {
    expect(screen.getByRole("heading", { name: /Edit role/i })).toBeDefined()
  })
})

it("should edit role", async () => {
  fireEvent.change(screen.getByTestId("edit-name-input"), {
    target: { value: "Edited Role" },
  })

  fireEvent.change(screen.getByTestId("description-textarea"), {
    target: { value: "Edited Role description" },
  })

  fireEvent.click(screen.getByText("Save"))

  await waitFor(() => {
    expect(onSubmitSpy).toHaveBeenCalledWith({
      name: "Edited Role",
      description: "Edited Role description",
    })
  })
})
