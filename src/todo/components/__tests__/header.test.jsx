import React from "react";
import { render, screen } from "@testing-library/react";
import { Header } from "../header";
import "@testing-library/jest-dom";

describe("Header Component", () => {
  it("should renders with correct label and placeholder", () => {
    const mockDispatch = jest.fn();

    render(<Header dispatch={mockDispatch} />);
    const input = screen.getByLabelText("New Todo Input");
    const placeholder = screen.getByPlaceholderText("What needs to be done?");

    expect(input).toBeInTheDocument();
    expect(placeholder).toBeInTheDocument();
  });
});
