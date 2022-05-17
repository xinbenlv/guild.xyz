import { fireEvent, render, screen, waitFor } from "@testing-library/react"
import React from "react"
import EditRole from "../src/components/[guild]/RolesByPlatform/components/RoleListItem/components/EditRole/EditRole"
import guildData from "./fixtures/guildData.json"
import { onSubmitSpy } from "./spies/useEditRole.spy"
import ProvidersWrapper from "./utils/ProvidersWrapper"

// TODO: Optimization: Mock the components that are unused in the given test

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
