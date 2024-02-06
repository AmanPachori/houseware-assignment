import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { Input } from "../input";
import "@testing-library/jest-dom";

describe("Input component", () => {
  it("should renders input field with provided props", () => {
    render(
      <Input placeholder="Enter todo" label="Todo Input" defaultValue="Test" />
    );

    const inputElement = screen.getByTestId("text-input");
    expect(inputElement).toBeInTheDocument();
    expect(inputElement).toHaveAttribute("placeholder", "Enter todo");
    expect(inputElement).toHaveValue("Test");

    const labelElement = screen.getByLabelText("Todo Input");
    expect(labelElement).toBeInTheDocument();
  });

  it("should submits input value on pressing Enter key with valid value", () => {
    const mockSubmit = jest.fn();

    render(<Input onSubmit={mockSubmit} />);
    const inputElement = screen.getByTestId("text-input");

    fireEvent.change(inputElement, { target: { value: "New Todo" } });
    fireEvent.keyDown(inputElement, { key: "Enter", code: "Enter" });

    expect(mockSubmit).toHaveBeenCalledWith("New Todo");
    expect(inputElement).toHaveValue("");
  });

  it("should not submit input value on pressing Enter key with invalid value", () => {
    const mockSubmit = jest.fn();

    render(<Input onSubmit={mockSubmit} />);
    const inputElement = screen.getByTestId("text-input");

    fireEvent.change(inputElement, { target: { value: "A" } });
    fireEvent.keyDown(inputElement, { key: "Enter", code: "Enter" });

    expect(mockSubmit).not.toHaveBeenCalled();
    expect(inputElement).toHaveValue("A");
  });

  it("should triggers onBlur function when input loses focus", () => {
    const mockBlur = jest.fn();

    render(<Input onBlur={mockBlur} />);
    const inputElement = screen.getByTestId("text-input");

    fireEvent.blur(inputElement);

    expect(mockBlur).toHaveBeenCalled();
  });

  it("should sanitizes input value before submitting", () => {
    const mockSubmit = jest.fn();

    render(<Input onSubmit={mockSubmit} />);
    const inputElement = screen.getByTestId("text-input");

    fireEvent.change(inputElement, {
      target: { value: '<>"hello world"</>' },
    });
    fireEvent.keyDown(inputElement, { key: "Enter", code: "Enter" });

    expect(mockSubmit).toHaveBeenCalledWith(
      "&lt;&gt;&quot;hello world&quot;&lt;&#x2F;&gt;"
    );
    expect(inputElement).toHaveValue("");
  });
});
