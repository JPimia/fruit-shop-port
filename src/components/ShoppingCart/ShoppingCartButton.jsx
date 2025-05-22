import { useEffect, useRef, useState } from "react";
import { ShoppingCartMenu } from "./ShoppingCartMenu";
import { useShoppingCart } from "../../contexts/ShoppingCartContext";

export function ShoppingCartButton() {
  const { totalCartCount } = useShoppingCart();
  const [hovered, setHovered] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef(null);
  const cartButtonRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        menuRef.current &&
        !menuRef.current.contains(event.target) &&
        cartButtonRef.current &&
        !cartButtonRef.current.contains(event.target)
      ) {
        setMenuOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const toggleMenu = () => setMenuOpen((prev) => !prev);

  return (
    <>
      <div
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        ref={cartButtonRef}
        className="flex items-center gap-2 text-white px-4 py-2 rounded-full transition-colors duration-300 relative"
        onClick={toggleMenu}
        style={{
          backgroundColor: hovered ? "#D92344" : "#0E730A",
          cursor: "pointer",
        }}
      >
        <span
          data-testid="total-cart-count-label"
          className="text-sm font-medium text-white"
        >
          {totalCartCount}
        </span>
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M5.79166 2H1V4H4.2184L6.9872 16.6776H7V17H20V16.7519L22.1932 7.09095L22.5308 6H6.6552L6.08485 3.38852L5.79166 2ZM19.9869 8H7.092L8.62081 15H18.3978L19.9869 8Z"
            fill="currentColor"
          />
          <path
            d="M10 22C11.1046 22 12 21.1046 12 20C12 18.8954 11.1046 18 10 18C8.89543 18 8 18.8954 8 20C8 21.1046 8.89543 22 10 22Z"
            fill="currentColor"
          />
          <path
            d="M19 20C19 21.1046 18.1046 22 17 22C15.8954 22 15 21.1046 15 20C15 18.8954 15.8954 18 17 18C18.1046 18 19 18.8954 19 20Z"
            fill="currentColor"
          />
        </svg>
      </div>

      {menuOpen && <ShoppingCartMenu ref={menuRef} />}
    </>
  );
}
