import { useState } from "react";
import { Footer } from "./components/Footer";
import { products } from "./components/Products/productData";
import { Link } from "react-router-dom";
import { useShoppingCart } from "./contexts/ShoppingCartContext";

export function Checkout() {
  const { productCounts, incrementProduct, decrementProduct } =
    useShoppingCart();
  const [buttonPressed, setButtonPressed] = useState(null);
  const items = Object.entries(productCounts).filter(([_, count]) => count > 0);
  const totalCartValue = items.reduce((sum, [name, count]) => {
    const product = products.find((p) => p.name === name);
    return sum + (product ? product.price * count : 0);
  }, 0);

  return (
    <div className="bg-gray-100 min-h-screen pt-[116px]">
      <div className="flex flex-col gap-3 max-w-2xl mx-auto px-6 mb-[128px]">
        <h1 className="text-3xl font-bold mb-2">Ostoskori</h1>
        {items.length === 0 ? (
          <p>Ostoskorisi on tyhjä.</p>
        ) : (
          <ul className="divide-y border-b border-gray-300 divide-gray-200 mb-2">
            {items.map(([name, count]) => {
              const product = products.find((p) => p.name === name);
              return (
                <li key={name} className="py-4 flex items-start gap-4">
                  <img
                    src={product.image}
                    alt={name}
                    className="w-[104px] h-[88px] object-cover rounded"
                  />
                  <div className="flex-1">
                    <div className="font-normal text-base flex flex-wrap items-center gap-x-3 gap-y-0">
                      <Link
                        to={`/product/${product.name}`}
                        className="hover:text-[#D92344]"
                      >
                        {product.name}
                      </Link>
                      <p>
                        <span className="font-extrabold text-base">
                          &euro; {product.price.toFixed(2)}{" "}
                        </span>
                        <span className="text-[16px] font-normal text-[#191919]">
                          {" "}
                          / kpl
                        </span>
                      </p>
                    </div>
                    <div className="flex flex-wrap items-end justify-between gap-3 mt-3 font-extrabold text-base">
                      <div
                        className={`flex items-center justify-between w-[184px] mt-auto rounded-full px-4 py-2 ${
                          buttonPressed === "increment"
                            ? "bg-[#CAFC98]"
                            : buttonPressed === "decrement"
                            ? "bg-[#E4F5D6]"
                            : count > 0
                            ? "bg-[#DBF3C6]"
                            : "bg-white"
                        }`}
                      >
                        <button
                          onClick={() => {
                            setButtonPressed("decrement");
                            setTimeout(() => setButtonPressed(null), 150);
                            decrementProduct(product.name);
                          }}
                          className="text-xl text-gray-700] hover:text-[#3BA837]"
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
                        <span
                          className={`text-gray-700 ${
                            count > 0 ? "font-extrabold" : "font-normal"
                          }`}
                        >
                          {count} kpl
                        </span>
                        <button
                          onClick={() => {
                            setButtonPressed("increment");
                            setTimeout(() => setButtonPressed(null), 150);
                            incrementProduct(product.name);
                          }}
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
                      <span className="font-extrabold text-xl ml-auto">
                        &euro; {(count * product.price).toFixed(2)}
                      </span>
                    </div>
                  </div>
                </li>
              );
            })}
          </ul>
        )}
        <div className="flex flex-wrap items-end justify-between ml-auto gap-3 mb-10">
          <p className="mb-1">Yhteensä:</p>
          <div className="text-right text-3xl font-extrabold ">
            {" "}
            &euro; {totalCartValue.toFixed(2)}
          </div>
        </div>
        <div className="flex flex-col">
          <form>
            <div className="space-y-4 bg-white rounded-2xl border border-[#D7D7D7] p-7">
              <h2 className="text-2xl font-bold mt-1 mb-6">Yhteystiedot</h2>
              <div>
                <label
                  htmlFor="name"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Nimi <span className="text-[#D92344]">*</span>
                </label>
                <input
                  id="name"
                  type="text"
                  required
                  className="w-full border border-[#D7D7D7] px-4 py-[9px] rounded focus:outline-none focus:ring-1 focus:ring-[#DBF3C6] focus:border-[#0F730A] hover:border-[#3BA837]"
                />
              </div>
              <div>
                <label
                  htmlFor="address"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Lähiosoite <span className="text-[#D92344]">*</span>
                </label>
                <input
                  id="address"
                  type="text"
                  required
                  className="w-full border border-[#D7D7D7] px-4 py-[9px] rounded focus:outline-none focus:ring-1 focus:ring-[#DBF3C6] focus:border-[#0F730A] hover:border-[#3BA837]"
                />
              </div>
              <div>
                <label
                  htmlFor="postal"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Postinumero <span className="text-[#D92344]">*</span>
                </label>
                <input
                  id="postal"
                  type="text"
                  required
                  className="w-full border border-[#D7D7D7] px-4 py-[9px] rounded focus:outline-none focus:ring-1 focus:ring-[#DBF3C6] focus:border-[#0F730A] hover:border-[#3BA837]"
                />
              </div>
              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Sähköposti <span className="text-[#D92344]">*</span>
                </label>
                <input
                  id="email"
                  type="email"
                  required
                  className="w-full border border-[#D7D7D7] px-4 py-[9px] rounded focus:outline-none focus:ring-1 focus:ring-[#DBF3C6] focus:border-[#0F730A] hover:border-[#3BA837]"
                />
              </div>
              <div>
                <label
                  htmlFor="phone"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Puhelinnumero <span className="text-[#D92344]">*</span>
                </label>
                <input
                  id="phone"
                  type="tel"
                  required
                  className="w-full border border-[#D7D7D7] px-4 py-[9px] rounded focus:outline-none focus:ring-1 focus:ring-[#DBF3C6] focus:border-[#0F730A] hover:border-[#3BA837]"
                />
              </div>
              <div>
                <label
                  htmlFor="message"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Lisätiedot
                </label>
                <textarea
                  id="message"
                  className="w-full border border-[#D7D7D7] px-4 py-[9px] rounded focus:outline-none focus:ring-1 focus:ring-[#DBF3C6] focus:border-[#0F730A] hover:border-[#3BA837]"
                  rows="4"
                ></textarea>
              </div>
            </div>
            <div className="mt-8 flex justify-end">
              <Link
                to="/kiitos"
                onClick={() => {
                  setItemCounts({});
                }}
                className="w-full sm:w-[240px] bg-[#0F730A] text-white text-lg py-2.5 px-6 rounded-full hover:bg-[#D92344] transition-colors font-extrabold text-center"
              >
                Tilaa
              </Link>
            </div>
          </form>
        </div>
      </div>
      <Footer />
    </div>
  );
}
