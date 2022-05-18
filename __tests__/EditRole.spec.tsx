import { fireEvent, render, screen, waitFor } from "@testing-library/react"
import React from "react"
import EditRole from "../src/components/[guild]/RolesByPlatform/components/RoleListItem/components/EditRole/EditRole"
import guildData from "./fixtures/guildData"
import { onSubmitSpy } from "./spies/useEditRole.spy"
import ProvidersWrapper from "./utils/ProvidersWrapper"

beforeEach(() => {
  const [roleData] = guildData.roles
  render(<ProvidersWrapper Component={EditRole} pageProps={{ roleData }} />)
})

it("should edit role", async () => {
  fireEvent.click(screen.getByRole("button"))

  await waitFor(() => {
    expect(screen.getByRole("heading", { name: /Edit role/i })).toBeDefined()
  })

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

vi.mock("../src/components/create-guild/IconSelector/IconSelector", () => ({
  default: () => null,
}))

vi.mock("../src/components/create-guild/Requirements/SetRequirements", () => ({
  default: () => null,
}))

vi.mock(
  "../src/components/[guild]/RolesByPlatform/components/RoleListItem/components/EditRole/components/ChannelsToGate/ChannelsToGate",
  () => ({ default: () => null })
)

vi.mock(
  "../src/components/[guild]/RolesByPlatform/components/RoleListItem/components/EditRole/components/DeleteRoleButton/DeleteRoleButton",
  () => ({ default: () => null })
)
