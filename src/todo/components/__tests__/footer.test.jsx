import React from "react";
import { render, fireEvent, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { Footer } from "../footer";
import { REMOVE_COMPLETED_ITEMS } from "../../constants";
import "@testing-library/jest-dom";

describe("Footer component", () => {
  const mockDispatch = jest.fn();

  it("should renders correctly with active todos", () => {
    const todos = [
      { id: 1, text: "Todo 1", completed: false },
      { id: 2, text: "Todo 2", completed: false },
    ];

    render(
      <MemoryRouter>
        <Footer todos={todos} dispatch={mockDispatch} />
      </MemoryRouter>
    );

    const todoCount = screen.getByText("2 items left!");
    expect(todoCount).toBeInTheDocument();

    const allFilter = screen.getByText("All");
    const activeFilter = screen.getByText("Active");
    const completedFilter = screen.getByText("Completed");

    expect(allFilter).toBeInTheDocument();
    expect(activeFilter).toBeInTheDocument();
    expect(completedFilter).toBeInTheDocument();

    expect(allFilter).toHaveClass("selected");
    expect(activeFilter).not.toHaveClass("selected");
    expect(completedFilter).not.toHaveClass("selected");

    const clearCompletedButton = screen.getByRole("button", {
      name: "Clear completed",
    });
    expect(clearCompletedButton).toBeInTheDocument();
  });

  it("should renders correctly with no todos", () => {
    const todos = [];

    render(
      <MemoryRouter>
        <Footer todos={todos} dispatch={mockDispatch} />
      </MemoryRouter>
    );
    expect(screen.queryByTestId("footer")).not.toBeInTheDocument();
  });

  it("clicking on Clear completed button dispatches removeCompleted action", () => {
    const todos = [
      { id: 1, text: "Todo 1", completed: true },
      { id: 2, text: "Todo 2", completed: false },
    ];

    render(
      <MemoryRouter>
        <Footer todos={todos} dispatch={mockDispatch} />
      </MemoryRouter>
    );

    const clearCompletedButton = screen.getByRole("button", {
      name: "Clear completed",
    });

    fireEvent.click(clearCompletedButton);
    expect(mockDispatch).toHaveBeenCalledWith({ type: REMOVE_COMPLETED_ITEMS });
  });
});
