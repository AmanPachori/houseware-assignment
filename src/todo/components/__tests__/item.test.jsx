import React from "react";
import { render, fireEvent, screen } from "@testing-library/react";
import { Item } from "../item";
import { TOGGLE_ITEM, REMOVE_ITEM } from "../../constants";
import "@testing-library/jest-dom";

describe("Item component", () => {
  const mockDispatch = jest.fn();
  const todo = { id: 1, title: "Test Todo", completed: false };

  beforeEach(() => {
    jest.clearAllMocks();
  });
  it("renders todo item correctly", () => {
    render(<Item todo={todo} dispatch={mockDispatch} index={0} />);

    const labelElement = screen.getByTestId("todo-item-label");
    expect(labelElement).toBeInTheDocument();
    expect(labelElement).toHaveTextContent("Test Todo");

    const toggleCheckbox = screen.getByTestId("todo-item-toggle");
    expect(toggleCheckbox).toBeInTheDocument();
    expect(toggleCheckbox).not.toBeChecked();

    const deleteButton = screen.getByTestId("todo-item-button");
    expect(deleteButton).toBeInTheDocument();
  });

  it("toggles completion status when checkbox is clicked", () => {
    render(<Item todo={todo} dispatch={mockDispatch} index={0} />);

    const toggleCheckbox = screen.getByTestId("todo-item-toggle");
    fireEvent.click(toggleCheckbox);

    expect(mockDispatch).toHaveBeenCalledWith({
      type: TOGGLE_ITEM,
      payload: { id: 1 },
    });
  });

  it("removes todo item when delete button is clicked", () => {
    render(<Item todo={todo} dispatch={mockDispatch} index={0} />);

    const deleteButton = screen.getByTestId("todo-item-button");
    fireEvent.click(deleteButton);

    expect(mockDispatch).toHaveBeenCalledWith({
      type: REMOVE_ITEM,
      payload: { id: 1 },
    });
  });

  it("allows editing when double-clicking on todo label", () => {
    render(<Item todo={todo} dispatch={mockDispatch} index={0} />);

    const labelElement = screen.getByTestId("todo-item-label");
    fireEvent.doubleClick(labelElement);

    const inputElement = screen.getByLabelText("Edit Todo Input");

    expect(inputElement).toBeInTheDocument();
    expect(inputElement).toHaveValue("Test Todo");
  });
});
