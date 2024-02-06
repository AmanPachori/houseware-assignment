import React from "react";
import { render, fireEvent, screen } from "@testing-library/react";
import { Main } from "../main";
import { MemoryRouter } from "react-router-dom";
import { TOGGLE_ALL } from "../../constants";
import "@testing-library/jest-dom";

describe("Main component", () => {
  const mockDispatch = jest.fn();
  const todos = [
    { id: 1, title: "Todo 1", completed: false },
    { id: 2, title: "Todo 2", completed: true },
  ];

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should renders todos based on the current route", () => {
    render(
      <MemoryRouter>
        <Main todos={todos} dispatch={mockDispatch} />
      </MemoryRouter>
    );

    expect(screen.getByTestId("todo-list")).toBeInTheDocument();
    expect(screen.getByTestId("toggle-all")).toBeInTheDocument();
    expect(screen.getByText("Toggle All Input")).toBeInTheDocument();

    expect(screen.getAllByTestId("todo-item")).toHaveLength(2);
  });

  it('should toggles all todos when "Toggle All" checkbox is clicked', () => {
    render(
      <MemoryRouter>
        <Main todos={todos} dispatch={mockDispatch} />
      </MemoryRouter>
    );

    fireEvent.click(screen.getByTestId("toggle-all"));

    expect(mockDispatch).toHaveBeenCalledWith({
      type: TOGGLE_ALL,
      payload: { completed: true },
    });
  });

  it('does not render "Toggle All" checkbox if no todos are visible', () => {
    render(
      <MemoryRouter>
        <Main todos={[]} dispatch={mockDispatch} />
      </MemoryRouter>
    );

    expect(screen.queryByTestId("toggle-all")).not.toBeInTheDocument();
  });
});
