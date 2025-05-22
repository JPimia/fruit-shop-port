import { products } from "../src/components/Products/productData";
import { ProductCard } from "../src/components/Products/ProductCard";
import { fireEvent, screen } from "@testing-library/react";
import { ShoppingCartMenu } from "../src/components/ShoppingCart/ShoppingCartMenu";
import { renderWithProviders } from "./utils";
import { ShoppingCartButton } from "../src/components/ShoppingCart/ShoppingCartButton";

describe("Shopping cart persistence", () => {
  renderWithProviders(
    <>
      <ProductCard product={products[0]} />
      <ShoppingCartMenu />
      <ShoppingCartButton />
    </>
  );

  test("Products are added to cart", () => {
    const incrButton = screen.getByTestId("increment-button");

    for (let i = 0; i < 2; i++) {
      fireEvent.click(incrButton);
    }

    const totalItemsLabel = screen.getByTestId("total-cart-count-label");

    expect(parseInt(totalItemsLabel.textContent)).toBe(2);
  });
});
