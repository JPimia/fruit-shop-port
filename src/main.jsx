import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import ProductPage from "./ProductPage.jsx";
import { ShoppingCartProvider } from "./contexts/ShoppingCartContext.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <ShoppingCartProvider>
      <ProductPage />
    </ShoppingCartProvider>
  </StrictMode>
);
