import { render } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { ShoppingCartProvider } from "../src/contexts/ShoppingCartContext";

export function renderWithProviders(ui) {
  return render(
    <MemoryRouter>
      <ShoppingCartProvider>{ui}</ShoppingCartProvider>
    </MemoryRouter>
  );
}
