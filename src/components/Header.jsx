import { Link } from "react-router-dom";
import { ShoppingCartButton } from "./ShoppingCart/ShoppingCartButton";

export function Header() {
  return (
    <header className="bg-white shadow py-4 px-6 fixed top-0 left-0 w-full z-50 flex items-center justify-between gap-6">
      <Link to="/">
        <img
          src="https://i.imgur.com/QBnNo0v.png"
          alt="Logo"
          style={{ width: "240px", height: "auto" }}
        />
      </Link>

      <ShoppingCartButton />
    </header>
  );
}
