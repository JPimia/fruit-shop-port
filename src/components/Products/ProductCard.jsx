import { useState } from "react";
import { Link } from "react-router-dom";
import { useShoppingCart } from "../../contexts/ShoppingCartContext";

export function ProductCard({ product }) {
  const { productCounts, incrementProduct, decrementProduct, setProductCount } =
    useShoppingCart();
  const count = productCounts[product.name];

  const [editing, setEditing] = useState(false);
  const [buttonPressed, setButtonPressed] = useState(null);

  return (
    <div className="bg-white rounded-2xl border border-[#D7D7D7] p-0 flex flex-col overflow-hidden w-[312px] font-inter text-[#191919]">
      <Link to={`/product/${product.name}`} className="group">
        <div>
          <img
            src={product.image}
            alt={product.name}
            className="w-[312px] h-[264px] object-cover cursor-pointer group-hover:brightness-90 transition duration-200"
          />
          <h2 className="text-[16px] font-normal text-[#191919] cursor-pointer group-hover:text-[#D92344] transition-colors duration-200 text-left pl-4 mt-4">
            {product.name}
          </h2>
        </div>
      </Link>
      <div className="px-4 pt-0 pb-2 mb-2">
        <p className="text-[20px] font-extrabold text-[#191919]">
          <span className="text-[20px] font-extrabold text-[#191919]">
            &euro; {product.price.toFixed(2)}
          </span>
          <span className="text-[16px] font-normal text-[#191919]"> / kpl</span>
        </p>
      </div>
      <div
        className={`flex items-center justify-between mt-auto rounded-full px-4 py-2 ml-4 mr-4 mt-4 mb-4 ${
          buttonPressed === "increment"
            ? "bg-[#CAFC98]"
            : buttonPressed === "decrement"
            ? "bg-[#F7F7F9]"
            : count > 0
            ? "bg-[#E3FACB]"
            : "bg-gray-100"
        }`}
      >
        <button
          data-testid="decrement-button"
          onClick={() => decrementProduct(product.name)}
          onMouseDown={() => setButtonPressed("decrement")}
          onMouseUp={() => setButtonPressed(null)}
          className="text-xl text-gray-500 hover:text-[#3BA837]"
        >
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M4 12C4 11.4477 4.44772 11 5 11H19C19.5523 11 20 11.4477 20 12C20 12.5523 19.5523 13 19 13H5C4.44772 13 4 12.5523 4 12Z"
              fill="currentColor"
            />
          </svg>
        </button>
        {!editing ? (
          <span
            className={`text-gray-700 ${
              count > 0 ? "font-extrabold" : "font-normal"
            } cursor-pointer`}
            onClick={() => setEditing(true)}
          >
            {count} kpl
          </span>
        ) : (
          <input
            type="text"
            inputMode="numeric"
            pattern="[0-9]*"
            style={{
              appearance: "textfield",
              MozAppearance: "textfield",
              WebkitAppearance: "none",
              border: "none",
              outline: "none",
              boxShadow: "none",
              padding: 0,
              margin: 0,
            }}
            value={count}
            onChange={(e) => {
              const val = Math.max(0, parseInt(e.target.value) || 0);
              setProductCount(product.name, val);
            }}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                setEditing(false);
              }
            }}
            onBlur={() => setEditing(false)}
            className={`w-16 text-center bg-transparent text-gray-700 ${
              count > 0 ? "font-extrabold" : "font-normal"
            } appearance-none outline-none border-none`}
            autoFocus
          />
        )}
        <button
          data-testid="increment-button"
          onClick={() => incrementProduct(product.name)}
          onMouseDown={() => setButtonPressed("increment")}
          onMouseUp={() => setButtonPressed(null)}
          className="text-xl text-black hover:text-[#3BA837]"
        >
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M12 4C11.4477 4 11 4.44772 11 5V11H5C4.44772 11 4 11.4477 4 12C4 12.5523 4.44772 13 5 13H11V19C11 19.5523 11.4477 20 12 20C12.5523 20 13 19.5523 13 19V13H19C19.5523 13 20 12.5523 20 12C20 11.4477 19.5523 11 19 11H13V5C13 4.44772 12.5523 4 12 4Z"
              fill="currentColor"
            />
          </svg>
        </button>
      </div>
    </div>
  );
}
