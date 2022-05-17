import { fireEvent, render, screen, waitFor } from "@testing-library/react"
import React from "react"
import DeleteRoleButton from "../src/components/[guild]/RolesByPlatform/components/RoleListItem/components/EditRole/components/DeleteRoleButton/DeleteRoleButton"
import guildData from "./fixtures/guildData.json"
import useDeleteRoleSpy, { onSubmitSpy } from "./spies/useDeleteRole.spy"
import ProvidersWrapper from "./utils/ProvidersWrapper"

// TODO: Optimization: Mock the components that are unused in the given test

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
