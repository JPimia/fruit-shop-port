import React, { useState, useEffect } from "react";
import {
  HashRouter as Router,
  Routes,
  Route,
  Link,
  useLocation,
} from "react-router-dom";
import { Header } from "./components/Header";
import { Footer } from "./components/Footer";
import { ProductGrid } from "./components/Products/ProductGrid";
import { ProductDetail } from "./components/Products/ProductDetail";
import { Checkout } from "./Checkout";
//import "@fontsource/inter/400.css";
//import "@fontsource/inter/800.css";

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}

export default function ProductPage() {
  const [initialized, setInitialized] = useState(false);

  useEffect(() => {
    if (window.location.pathname === "" || window.location.pathname === "/") {
      window.history.replaceState(null, "", "/");
    }
    setInitialized(true);
  }, []);

  return (
    <>
      <style>
        {`
          input:-webkit-autofill, 
          textarea:-webkit-autofill {
            box-shadow: 0 0 0px 1000px #FAFFF5 inset !important;
            -webkit-box-shadow: 0 0 0px 1000px #FAFFF5 inset !important;
            -webkit-text-fill-color: #191919 !important;
            transition: background-color 5000s ease-in-out 0s !important;
          }
        `}
      </style>

      <Router>
        <ScrollToTop />
        <Header />
        {initialized && (
          <Routes>
            <Route path="/" element={<ProductGrid />} />
            <Route path="/product/:name" element={<ProductDetail />} />
            <Route path="/checkout" element={<Checkout />} />
            <Route
              path="/kiitos"
              element={
                <div className="bg-gray-100 min-h-screen pt-[116px]">
                  <div className="flex flex-col gap-3 max-w-2xl mx-auto px-6 mb-[128px]">
                    <img
                      src="https://i.imgur.com/2QNXf6o.jpeg"
                      alt="Kiitoskuva"
                      className="w-full h-auto object-cover mb-7 rounded-2xl border border-[#D7D7D7]"
                    />
                    <h1 className="text-3xl font-bold mb-4">
                      Kiitos tilauksestasi!
                    </h1>
                    <p className="text-lg mb-6 max-w-xl">
                      Olemme vastaanottaneet tilauksesi ja käsittelemme sen
                      pian. Saat tilausvahvistuksen sähköpostiisi.
                    </p>

                    <Link
                      to="/"
                      className="mt-2 w-[240px] bg-[#0F730A] text-white font-extrabold py-2.5 px-6 rounded-full hover:bg-[#D92344] transition-colors text-center flex items-center justify-center"
                    >
                      Palaa etusivulle
                    </Link>
                  </div>
                  <Footer />
                </div>
              }
            />
          </Routes>
        )}
      </Router>
    </>
  );
}
