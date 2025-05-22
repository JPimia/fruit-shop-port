import { createContext, useContext, useEffect, useState } from "react";

const PRODUCT_COUNTS_KEY = "productCounts";

const ShoppingCartContext = createContext(null);

export const ShoppingCartProvider = ({ children }) => {
  /*
  Format 

  productCounts: {
    <string productName>: <int count>
  }
  
  for each product
  */
  const [productCounts, setProductCounts] = useState({});
  const [totalCartCount, setTotalCartCount] = useState(0);

  useEffect(() => {
    const savedCountsJSON = window.localStorage.getItem(PRODUCT_COUNTS_KEY);
    if (savedCountsJSON) {
      setProductCounts(JSON.parse(savedCountsJSON));
    }
  }, []);

  // Update total count when product counts is modified
  useEffect(() => {
    const totalCount = Object.values(productCounts).reduce(
      (curr, acc) => curr + acc,
      0
    );

    setTotalCartCount(totalCount);
  }, [productCounts]);

  const incrementProduct = (productName) => {
    const prevCount = productCounts[productName] || 0;
    const newCounts = { ...productCounts, [productName]: prevCount + 1 };

    setProductCounts(newCounts);
    window.localStorage.setItem(PRODUCT_COUNTS_KEY, JSON.stringify(newCounts));
  };

  const decrementProduct = (productName) => {
    const prevCount = productCounts[productName] || 0;
    const newCounts = {
      ...productCounts,
      [productName]: Math.max(prevCount - 1, 0),
    };

    setProductCounts(newCounts);
    window.localStorage.setItem(PRODUCT_COUNTS_KEY, JSON.stringify(newCounts));
  };

  const setProductCount = (productName, count) => {
    const newCounts = {
      ...productCounts,
      [productName]: count,
    };

    setProductCounts(newCounts);
    window.localStorage.setItem(PRODUCT_COUNTS_KEY, JSON.stringify(newCounts));
  };

  return (
    <ShoppingCartContext.Provider
      value={{
        productCounts,
        totalCartCount,
        incrementProduct,
        decrementProduct,
        setProductCount,
      }}
    >
      {children}
    </ShoppingCartContext.Provider>
  );
};

export const useShoppingCart = () => useContext(ShoppingCartContext);
