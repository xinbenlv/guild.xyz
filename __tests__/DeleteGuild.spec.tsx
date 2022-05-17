import { fireEvent, render, screen, waitFor } from "@testing-library/react"
import React from "react"
import DeleteGuildButton from "../src/components/[guild]/EditGuildButton/components/DeleteGuildButton/DeleteGuildButton"
import { onSubmitSpy } from "./spies/useDeleteGuild.spy"
import ProvidersWrapper from "./utils/ProvidersWrapper"

// TODO: Optimization: Mock the components that are unused in the given test

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
