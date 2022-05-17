import { fireEvent, render, screen, waitFor } from "@testing-library/react"
import React from "react"
import * as discardAlert from "../src/components/common/DiscardAlert"
import * as onboardingMarker from "../src/components/common/OnboardingMarker"
import * as useGuildPermission from "../src/components/[guild]/hooks/useGuildPermission"
import DeleteRoleButton from "../src/components/[guild]/RolesByPlatform/components/RoleListItem/components/EditRole/components/DeleteRoleButton/DeleteRoleButton"
import * as useWarnIfUnsavedChanges from "../src/hooks/useWarnIfUnsavedChanges"
import guildData from "./fixtures/guildData.json"
import useDeleteRoleSpy, { onSubmitSpy } from "./spies/useDeleteRole.spy"
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
  const [{ id }] = guildData.roles
  render(
    <ProvidersWrapper Component={DeleteRoleButton} pageProps={{ roleId: id }} />
  )
})

it("should delete role", async () => {
  await waitFor(() => {
    expect(useDeleteRoleSpy).toHaveBeenCalledWith(guildData.roles[0].id)
  })

  fireEvent.click(screen.getByRole("button"))

  fireEvent.click(screen.getByText("Delete"))

  await waitFor(() => {
    expect(onSubmitSpy).toHaveBeenCalled()
  })
})
