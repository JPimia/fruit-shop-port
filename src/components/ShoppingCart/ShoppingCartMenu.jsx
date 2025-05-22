import { Link } from "react-router-dom";
import { useShoppingCart } from "../../contexts/ShoppingCartContext";
import { products } from "../Products/productData";

export function ShoppingCartMenu({ menuRef }) {
  const { productCounts, incrementProduct, decrementProduct } =
    useShoppingCart();

  return (
    <div
      ref={menuRef}
      className="absolute top-full right-[16px] mt-2 w-80 max-w-[calc(100vw-32px)] bg-white border border-gray-200 rounded shadow-lg z-50 overflow-hidden flex flex-col max-h-[calc(100vh-100px)]"
    >
      <h3 className="text-lg font-bold mb-2 px-6 pt-6">Ostoskori</h3>
      {Object.entries(productCounts).filter(([_, count]) => count > 0)
        .length === 0 ? (
        <p className="text-gray-500 border-b pt-2 px-6 pb-4 mb-4">
          Ostoskori on tyhjä
        </p>
      ) : (
        <ul
          className="divide-y divide-gray-200 border-b border-gray-200 mb-4 overflow-y-auto px-6"
          style={{ maxHeight: "650px" }}
        >
          {Object.entries(productCounts)
            .filter(([_, count]) => count > 0)
            .map(([name, count]) => {
              const product = products.find((p) => p.name === name);
              return (
                <li key={name} className="py-3 flex items-center gap-4 text-sm">
                  <img
                    src={product.image}
                    alt={name}
                    className="w-[104px] h-[88px] object-cover rounded"
                  />
                  <div className="flex-1">
                    <span className="block font-normal text-[16px] mb-2">
                      {name}
                    </span>
                    <div className="flex items-center justify-between w-full mt-1 rounded-full px-3 py-1 bg-[#E3FACB]">
                      <button
                        onClick={() => decrementProduct(name)}
                        className="text-xl text-gray-500 hover:text-[#D92344]"
                      >
                        –
                      </button>
                      <span
                        className={`text-gray-700 ${
                          count > 0 ? "font-extrabold" : "font-normal"
                        }`}
                      >
                        {count} kpl
                      </span>
                      <button
                        onClick={() => incrementProduct(name)}
                        className="text-xl text-black hover:text-[#0F730A]"
                      >
                        +
                      </button>
                    </div>
                    <span className="block font-extrabold text-[16px] mt-2">
                      &euro; {(count * product.price).toFixed(2)}
                    </span>
                  </div>
                </li>
              );
            })}
        </ul>
      )}
      <div className="flex justify-between font-extrabold text-[18px] px-6 pb-4">
        <span>Yhteensä</span>
        <span>
          &euro;
          {Object.entries(productCounts)
            .reduce((acc, [name, count]) => {
              const product = products.find((p) => p.name === name);
              return acc + count * (product?.price || 0);
            }, 0)
            .toFixed(2)}
        </span>
      </div>
      {Object.entries(productCounts).some(([_, count]) => count > 0) && (
        <Link
          to="/checkout"
          onClick={() => setMenuOpen(false)}
          className="mt-0 mx-6 mb-6 w-auto bg-[#0F730A] text-white py-2 px-6 rounded-full hover:bg-[#D92344] transition-colors font-extrabold text-center block"
        >
          Kassalle
        </Link>
      )}
    </div>
  );
}
