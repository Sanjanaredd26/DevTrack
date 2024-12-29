import React from "react";
import { render, screen } from "@testing-library/react";
import { Provider } from "react-redux";
import configureStore from "redux-mock-store";
import TaskBoard from "../components/TaskBoard";

const mockStore = configureStore([]);

describe("TaskBoard Component", () => {
  it("renders TaskBoard correctly", () => {
    const store = mockStore({ tasks: [] });

    render(
      <Provider store={store}>
        {/* Use MemoryRouter for test purposes */}
        <TaskBoard />
      </Provider>
    );

    expect(screen.getByText(/Task Board/i)).toBeInTheDocument();
  });
});
