
import React, { useEffect, useState } from "react";
import FilterDrawer from "../Filter/FilterDrawer";
import HomeSectionCard from "../HomeCarousel/HomeSectionCardl";
import SortBy from "../Sort/SortBy";
import PromoBar from "../PromoBar/PromoBar";

import black from "../../assets/Shoes/MenSneak/black.png";
import blue from "../../assets/Shoes/MenSneak/blue.png";
import green from "../../assets/Shoes/MenSneak/green.png";
import maroon from "../../assets/Shoes/MenSneak/maroon.png";

import blackk from "../../assets/Shoes/MenRun/blackk.png";
import bluee from "../../assets/Shoes/MenRun/bluee.png";
import redd from "../../assets/Shoes/MenRun/redd.png";
import whitee from "../../assets/Shoes/MenRun/whitee.png";  
const MenPage = () => {
  const [products, setProducts] = useState([]);

  const sneakerImages = {
    4: black,
    5: blue,
    6: green,
    7: maroon,
    
  };

  const runningImages = {
    18: blackk,
    19: bluee,
    20: redd,
    21: whitee,
  };

  useEffect(() => {
    fetch("http://localhost:8081/products/category/MEN")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to fetch men's products");
        }
        return response.json();
      })
      .then((data) => setProducts(data))
      .catch((error) =>
        console.error("Error fetching men's products:", error)
      );
  }, []);

  const sneakers = products.filter((product) =>
    [4, 5, 6, 7].includes(Number(product.id))
  );

  const runningShoes = products.filter((product) =>
    [18, 19, 20, 21].includes(Number(product.id))
  );

  return (
    <div>
      <div className="pt-4 pl-4 text-2xl text-center">
        <h1>MEN FOOTWEAR</h1>
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

      <section className="py-4">
        <h2 className="text-2xl text-center font-semibold">
          Men Sneakers
        </h2>

        <div className="grid grid-cols-3 gap-6 p-8">
          {sneakers.map((product) => (
            <HomeSectionCard
              key={product.id}
              product={{
                ...product,
                image:
                  sneakerImages[Number(product.id)] ||
                  product.imageUrl ||
                  undefined,
              }}
            />
          ))}
        </div>
      </section>

      <section className="py-4">
        <h2 className="text-2xl text-center font-semibold">
          Men Running Shoes
        </h2>

        <div className="grid grid-cols-3 gap-6 p-8">
          {runningShoes.map((product) => (
            <HomeSectionCard
              key={product.id}
              product={{
                ...product,
                image:
                  runningImages[Number(product.id)] ||
                  product.imageUrl ||
                  undefined,
              }}
            />
          ))}
        </div>
      </section>
    </div>
  );
};

export default MenPage;
