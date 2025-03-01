import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import App from "./App";
import { Provider } from "react-redux";
import { store } from "./store";
import { MemoryRouter } from "react-router";

const renderWithProviders = (ui: React.ReactNode) => {
  return render(
    <Provider store={store}>
      <MemoryRouter>{ui}</MemoryRouter>
    </Provider>
  );
};

describe("App Component", () => {
  it("renders the app container", () => {
    renderWithProviders(<App />);
    expect(screen.getByTestId("app-cotainer")).toBeInTheDocument();
  });
});
