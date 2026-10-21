import React, { useEffect, useState } from "react";
import FilterDrawer from "../Filter/FilterDrawer";
import HomeSectionCard from "../HomeCarousel/HomeSectionCardl";
import PromoBar from "../PromoBar/PromoBar";
import SortBy from "../Sort/SortBy";

import green from "../../assets/Shoes/CollabSneak/Green.png";
import red from "../../assets/Shoes/CollabSneak/Red.png";
import velvet from "../../assets/Shoes/CollabSneak/Velvet.png";

const dropImages = {
  12: green,
  13: red,
  14: velvet,
};

const DropsPage = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetch("http://localhost:8081/products/category/DROPS")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to fetch Drops products");
        }
        return response.json();
      })
      .then((data) => setProducts(data))
      .catch((error) => {
        console.error("Error fetching Drops products:", error);
      });
  }, []);

  return (
    <div>
      <div className="pt-4 pl-4 text-2xl text-center">
        <h1>DROPS</h1>
      </div>

      <PromoBar />

      <div className="flex justify-between items-center py-4 px-2">
        <SortBy />
        <FilterDrawer
          underPrice="Under 3999"
          midPrice="4000-7999"
          highPrice="Above 8000"
        />
      </div>

      <h2 className="text-center font-semibold text-2xl">
        Drop Sneakers
      </h2>

      {products.length === 0 ? (
        <p className="text-center p-8">No Drops products found.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 p-8">
         {products.map((product) => (
  <HomeSectionCard
    key={product.id}
    product={{
      ...product,
      image: dropImages[Number(product.id)],
    }}
  />
))}
        </div>
      )}
    </div>
  );
};

export default DropsPage;
