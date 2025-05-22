import { useEffect, useState } from "react";
import { ProductCard } from "./ProductCard";
import { Footer } from "../Footer";
import { products } from "./productData";

export function ProductGrid() {
  const [containerWidth, setContainerWidth] = useState("360px");

  useEffect(() => {
    const updateWidth = () => {
      const width = window.innerWidth;
      if (width >= 1384) setContainerWidth("1352px");
      else if (width >= 1048) setContainerWidth("1016px");
      else if (width >= 712) setContainerWidth("680px");
      else setContainerWidth("322px");
    };
    updateWidth();
    window.addEventListener("resize", updateWidth);
    return () => window.removeEventListener("resize", updateWidth);
  }, []);

  return (
    <div className="bg-gray-100 min-h-screen pt-[76px]">
      <div
        style={{
          padding: "40px 16px 128px",
          display: "flex",
          flexWrap: "wrap",
          alignItems: "flex-start",
          alignContent: "flex-start",
          gap: "24px",
          marginLeft: "auto",
          marginRight: "auto",
          width: containerWidth,
        }}
      >
        {products.map((product, index) => (
          <ProductCard key={index} product={product} />
        ))}
      </div>
      <div className="w-full">
        <Footer />
      </div>
    </div>
  );
}
