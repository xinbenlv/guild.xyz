import { fireEvent, render, screen, waitFor } from "@testing-library/react"
import React from "react"
import EditGuildButton from "../src/components/[guild]/EditGuildButton/EditGuildButton"
import { onSubmitSpy } from "./spies/useEditGuild.spy"
import ProvidersWrapper from "./utils/ProvidersWrapper"

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

/**
 * Mocks like these are hoisted to run before any import statements. This means, we
 * can't separate this logic to a utility function. I'll try to find an alternative,
 * but for now it does the job.
 */

vi.mock("../src/components/[guild]/EditGuildButton/components/Admins", () => ({
  default: () => null,
}))

vi.mock(
  "../src/components/[guild]/EditGuildButton/components/BackgroundImageUploader",
  () => ({ default: () => null })
)

vi.mock(
  "../src/components/[guild]/EditGuildButton/components/ColorModePicker",
  () => ({ default: () => null })
)

vi.mock("../src/components/[guild]/EditGuildButton/components/ColorPicker", () => ({
  default: () => null,
}))

vi.mock(
  "../src/components/[guild]/EditGuildButton/components/MembersToggle",
  () => ({ default: () => null })
)

vi.mock(
  "../src/components/[guild]/EditGuildButton/components/HideFromExplorerToggle",
  () => ({ default: () => null })
)

vi.mock("../src/components/[guild]/EditGuildButton/components/Guard", () => ({
  default: () => null,
}))

vi.mock("../src/components/create-guild/IconSelector/IconSelector", () => ({
  default: () => null,
}))

vi.mock(
  "../src/components/[guild]/EditGuildButton/components/DeleteGuildButton/DeleteGuildButton",
  () => ({ default: () => null })
)
