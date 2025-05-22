import { useState } from "react";
import { useParams } from "react-router-dom";
import { products } from "./productData";
import { Footer } from "../Footer";
import { useShoppingCart } from "../../contexts/ShoppingCartContext";

export function ProductDetail() {
  const { productCounts, incrementProduct, decrementProduct, setProductCount } =
    useShoppingCart();

  const { name } = useParams();
  const product = products.find((p) => p.name === name);
  const [editing, setEditing] = useState(false);
  const [buttonPressed, setButtonPressed] = useState(null);

  const count = productCounts[product?.name] || 0;

  const increment = () => {
    setButtonPressed("increment");
    setTimeout(() => setButtonPressed(null), 150);
    incrementProduct(product.name);
  };

  const decrement = () => {
    setButtonPressed("decrement");
    setTimeout(() => setButtonPressed(null), 150);
    decrementProduct(product.name);
  };

  if (!product)
    return <div className="p-6 pt-[108px]">Tuotetta ei löytynyt.</div>;

  return (
    <div className="bg-gray-100 min-h-screen pt-[108px]">
      <div className="max-w-xl mx-auto px-6">
        <div className="mb-6">
          <button
            onClick={() => window.history.back()}
            className="text-[#0F730A] hover:text-[#D92344]"
          >
            ← Takaisin
          </button>
        </div>
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-auto object-cover rounded-lg mb-8"
          style={{ border: "1px solid #D7D7D7" }}
        />
        <h1 className="text-2xl font-normal mb-0 text-[#191919] font-inter">
          {product.name}
        </h1>
        <p className="text-[32px] font-extrabold mb-4 text-[#191919] font-inter">
          &euro; {product.price.toFixed(2)}
          <span className="text-[16px] font-normal text-[#191919]"> / kpl</span>
        </p>

        <div
          className={`flex items-center justify-between w-[270px] mt-auto rounded-full px-4 py-2 mt-6 mb-8 ${
            buttonPressed === "increment"
              ? "bg-[#CAFC98]"
              : buttonPressed === "decrement"
              ? "bg-[#FAFBFB]"
              : count > 0
              ? "bg-[#DBF3C6]"
              : "bg-white"
          }`}
        >
          <button
            onClick={decrement}
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
              style={{
                MozAppearance: "textfield",
                WebkitAppearance: "none",
                appearance: "none",
                padding: 0,
                margin: 0,
                border: "none",
                outline: "none",
                boxShadow: "none",
              }}
              autoFocus
            />
          )}
          <button
            onClick={increment}
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

        <p className="text-gray-600 font-inter mb-[128px]">
          {product.description}
        </p>
      </div>
      <Footer />
    </div>
  );
}
