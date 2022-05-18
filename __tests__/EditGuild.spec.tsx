import { fireEvent, render, screen, waitFor } from "@testing-library/react"
import React from "react"
import EditGuildButton from "../src/components/[guild]/EditGuildButton/EditGuildButton"
import { onSubmitSpy } from "./spies/useEditGuild.spy"
import ProvidersWrapper from "./utils/ProvidersWrapper"

// TODO: Optimization: Mock the components that are unused in the given test

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
