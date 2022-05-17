import { fireEvent, render, screen, waitFor } from "@testing-library/react"
import React from "react"
import * as discardAlert from "../src/components/common/DiscardAlert"
import * as onboardingMarker from "../src/components/common/OnboardingMarker"
import DeleteGuildButton from "../src/components/[guild]/EditGuildButton/components/DeleteGuildButton/DeleteGuildButton"
import * as useGuildPermission from "../src/components/[guild]/hooks/useGuildPermission"
import * as useWarnIfUnsavedChanges from "../src/hooks/useWarnIfUnsavedChanges"
import { onSubmitSpy } from "./spies/useDeleteGuild.spy"
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
  render(<ProvidersWrapper Component={DeleteGuildButton} />)
})

it("should delete guild", async () => {
  fireEvent.click(screen.getByRole("button"))

  fireEvent.click(screen.getByText("Delete"))

  await waitFor(() => {
    expect(onSubmitSpy).toHaveBeenCalled()
  })
})
